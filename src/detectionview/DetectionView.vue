<template>
  <div class="detectionView">
    <spinner :loading="loading" />
    <transition-group name="list" tag="p">
      <account-group-container
        v-for="group in accountGroups"
        :key="group.id"
        :group="group"
        @moveAccount="moveAccount"
      />
    </transition-group>
  </div>
</template>

<script>
import { isTransient, generateTransientId } from '@/utils/idTool';
import { fetchAccountGroups } from '@/api';
import Spinner from '@/components/Spinner';

import AccountGroupContainer from './AccountGroupContainer';

const hasAccounts = group => group.accounts.length > 0;
const hasNoAccounts = group => !hasAccounts(group);

export default {
  name: 'DetectionView',

  components: {
    AccountGroupContainer,
    Spinner,
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
  },
};
</script>

<style>

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}
</style>
