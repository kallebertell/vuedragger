<template>
  <section>
    <h2 class="topic" :class="{ 'isNew': isNewGroup }">{{name}}</h2>
    <ul
      class="accountGroup"
      @dragover.prevent
      @drop="drop">
      <li v-if="group.accounts.length < 1 && isNewGroup">
        Drag accounts here...
      </li>
      <li v-if="group.accounts.length < 1 && !isNewGroup">
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
import { isTransient } from '@/utils/idTool';
import AccountCard from './AccountCard';

export default {
  name: 'AccountGroupContainer',

  components: {
    AccountCard,
  },

  props: ['group'],

  computed: {
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

<style scoped>
.accountGroup {
  background: #f0f0f0;
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: 1rem 1rem 0 1rem;
  min-height: 4rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.topic {

}

.topic.isNew {
  opacity: 0.5;
}
</style>
