<template>
  <container class="detectionView">
    <spinner :loading="loading" />
    <header v-if="!loading" class="header">
      <div class="leftSection">
        <button class="backButton" @click="goBack">
          <img class="arrow" src="../assets/leftArrow.svg" />
        </button>
        <olx-title>Found {{accountAmount}} similar accounts</olx-title>
      </div>
      <div class="rightSection">
        <div class="notification">Status message</div>
        <olx-button :onClick="save" disabled>Save Changes</olx-button>
      </div>
    </header>
    <transition-group name="list" tag="p">
      <account-group-container
        v-for="group in accountGroups"
        :key="group.id"
        :group="group"
        @moveAccount="moveAccount"
      />
    </transition-group>
  </container>
</template>

<script>
import { isTransient, generateTransientId } from '@/utils/idTool';
import { fetchAccountGroups } from '@/api';
import { Container, Spinner, OlxButton, OlxTitle } from '@/components';

import AccountGroupContainer from './AccountGroupContainer';

const hasAccounts = group => group.accounts.length > 0;
const hasNoAccounts = group => !hasAccounts(group);

export default {
  name: 'DetectionView',

  components: {
    Container,
    AccountGroupContainer,
    Spinner,
    OlxButton,
    OlxTitle,
  },

  created() {
    fetchAccountGroups().then((accountGroups) => {
      accountGroups.push(this.createEmptyGroup());
      this.accountGroups = accountGroups;
      this.loading = false;
    });
  },

  data() {
    return {
      accountGroups: [],
      loading: true,
    };
  },

  computed: {
    accountAmount() {
      return this.accountGroups.reduce((sum, group) => sum + group.accounts.length, 0);
    },
  },

  methods: {
    createEmptyGroup() {
      return {
        id: generateTransientId(),
        accounts: [],
      };
    },

    moveAccount({ account, groupId }) {
      const oldGroup = this.accountGroups.find(
        group => group.accounts.find(acc => acc.email === account.email),
      );
      oldGroup.accounts = oldGroup.accounts.filter(acc => acc.email !== account.email);

      if (isTransient(oldGroup) && hasNoAccounts(oldGroup)) {
        this.accountGroups =
          this.accountGroups.filter(group => group !== oldGroup);
      }

      const targetGroup = this.accountGroups.find(group => group.id === groupId);
      targetGroup.accounts.push(account);

      const lastGroup = this.accountGroups[this.accountGroups.length - 1];
      if (hasAccounts(lastGroup) || !isTransient(lastGroup)) {
        this.accountGroups.push(this.createEmptyGroup());
      }
    },

    save() {
      console.log('saving');
    },

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../theme/variables';

.header {
  margin-top: 4rem;
  margin-bottom: 3.2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .leftSection, .rightSection {
    display: flex;
    align-items: center;
  }
}

.backButton {
  background-color: $color-blue;
  color: inherit;
  border: none;
  border-radius: 50%;
  padding: 0.8rem;

  font: inherit;
  cursor: pointer;
  outline: inherit;

  width: 3.2rem;
  height: 3.2rem;

  .arrow {
    position: relative;
    top: 1px;
  }
}

.topic {
  margin: 0 0 0 1.6rem;
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 1.33;
  color: $color-text-header;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}
</style>
