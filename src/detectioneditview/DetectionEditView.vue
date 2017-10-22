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
        <div v-if="success" class="notification success">
          Changes saved 👍
        </div>
        <div v-if="error" class="notification warning">
          Something went wrong… please try again
        </div>
        <olx-button :onClick="save" :disabled="!dirty || saving">
          <span v-if="saving">Saving..</span>
          <span v-if="!saving">Save Changes</span>
        </olx-button>
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
import { fetchDetectionAccountGroups, createAccountGroup, moveAccount, isTransient, isTransientId, generateTransientId } from '@/api';
import { Container, Spinner, OlxButton, OlxTitle } from '@/components';

import AccountGroupContainer from './AccountGroupContainer';

const hasAccounts = group => group.accounts.length > 0;
const hasNoAccounts = group => !hasAccounts(group);

export default {
  name: 'DetectionEditView',

  components: {
    Container,
    AccountGroupContainer,
    Spinner,
    OlxButton,
    OlxTitle,
  },

  created() {
    fetchDetectionAccountGroups(this.$route.params.id).then((accountGroups) => {
      accountGroups.push(this.createEmptyGroup());
      this.accountGroups = accountGroups;
      this.loading = false;
    });
  },

  data() {
    return {
      accountGroups: [],
      saveCommandQueue: [],
      loading: true,
      saving: false,
      error: false,
      success: false,
    };
  },

  computed: {
    dirty() {
      return this.saveCommandQueue.length > 0;
    },
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
        group => group.accounts.find(acc => acc.id === account.id),
      );
      oldGroup.accounts = oldGroup.accounts.filter(acc => acc.id !== account.id);

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

      // Below we enqueue api calls needed to be made to bring the backend
      // state up to par with the frontend.
      if (isTransientId(groupId)) {
        this.saveCommandQueue.push(() => createAccountGroup(this.$route.params.id, groupId));
      }

      this.saveCommandQueue.push(() => moveAccount(account.id, groupId));
    },

    save() {
      this.saving = true;

      const updateCommand = this.saveCommandQueue.shift();

      if (!updateCommand) {
        this.saving = false;
        this.success = true;
        setTimeout(() => this.resetNotifications(), 3000);
        return;
      }

      updateCommand().then(
        () => this.save(),
        () => {
          this.error = true;
          this.saving = false;
          this.saveCommandQueue.push(updateCommand);
          setTimeout(() => this.resetNotifications(), 3000);
        },
      );
    },

    resetNotifications() {
      this.success = false;
      this.error = false;
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

.notification {
  font-size: $font-size-smaller;
  margin-right: 1.6rem;

  .warning {
    color: $color-text-warning;
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

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}
</style>
