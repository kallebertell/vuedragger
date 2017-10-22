<template>
  <section>
    <div class="header">
      <h2 class="topic" :class="{ 'isNew': isNewGroup }">{{name}}</h2>
      <div class="accounts" v-if="accountsCount > 0">{{accountsCount}} accounts</div>
    </div>
    <ul
      class="group"
      @dragover.prevent
      @drop="drop">
      <li v-if="accountsCount < 1 && isNewGroup" class="instruction">
        Drag accounts here...
      </li>
      <li v-if="accountsCount < 1 && !isNewGroup" class="instruction">
        No accounts for this Person. Drag accounts here to add some back.
      </li>
      <account-card
        class="list-item"
        v-for="account in group.accounts"
        :key="account.email"
        :account="account"/>
      </account-card>
    </ul>
  </section>
</template>

<script>
import { isTransient } from '@/api';
import AccountCard from './AccountCard';

export default {
  name: 'AccountGroupContainer',

  components: {
    AccountCard,
  },

  props: ['group'],

  computed: {
    accountsCount() {
      return this.group.accounts.length;
    },
    name() {
      if (this.isNewGroupWithAccounts) {
        return 'Unsaved Person';
      }

      if (this.isNewGroup) {
        return 'New Person';
      }

      return `Person ${this.group.id}`;
    },

    isNewGroup() {
      return isTransient(this.group);
    },

    isNewGroupWithAccounts() {
      return isTransient(this.group) && this.group.accounts.length > 0;
    },
  },

  methods: {
    drop(e) {
      const account = JSON.parse(e.dataTransfer.getData('account'));
      this.$emit('moveAccount', { account, groupId: this.group.id });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../theme/variables';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
}

.topic {
  font-size: $font-size-large;
  font-weight: 600;
  text-align: left;
  color: $color-text-header;
  margin: 0;

  &.isNew {
    color: $color-text-subtle;
  }
}

.accounts {
  color: $color-text-subtle;
  font-size: $font-size-small;
}

.group {
  background: $color-bg-well;
  border-radius: 4px;

  padding: 1.6rem 1.6rem 0 1.6rem;
  min-height: 8.8rem;
  margin: 0 0 4rem;

  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &.isEmpty {
    justify-content: center;
  }
}

.instruction {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  color: $color-text-subtle;
  font-size: $font-size-small;
}
</style>
