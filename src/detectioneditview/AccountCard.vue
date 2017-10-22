<template>
  <li
    :class="classObject"
    draggable
    @dragstart="onDragStart"
    @dragend="onDragEnd">
    <img class="profileImage" :src="profileImageUrl" draggable="false" />
    <div class="details">
      <div class="name">{{account.name}}</div>
      <div class="email">{{account.email}}</div>
    </div>
    <div class="status" :class="account.status">
      {{capitalizedStatus}}
    </div>
  </li>
</template>

<script>

import profileIcon from '../assets/profileIcon.svg';

export default {
  name: 'AccountCard',
  props: ['account'],

  data() {
    return {
      dragged: false,
    };
  },

  computed: {
    classObject() {
      return {
        accountCard: true,
        dragging: this.dragged,
      };
    },
    capitalizedStatus() {
      const { status } = this.account;
      return status.substring(0, 1).toUpperCase() + status.substring(1);
    },
    profileImageUrl() {
      const { profileImageUrl } = this.account;
      return profileImageUrl || profileIcon;
    },
  },

  methods: {
    onDragStart(e) {
      this.dragged = true;
      // Could pass some index/key to a global store in favour of serializing
      // the whole thing, but in this case I prefer encapsulation.
      e.dataTransfer.setData('account', JSON.stringify(this.account));
    },
    onDragEnd() {
      this.dragged = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../theme/variables';
@import '../theme/blocks';

.accountCard {
  width: 28rem;
  height: 5.6rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.8rem;
  margin-right: 1.6rem;
  margin-bottom: 1.6rem;

  white-space: nowrap;
  user-select: none;
  cursor: move;

  font-size: $font-size-smaller;
  background: $color-white-normal;
  border-radius: 2.5px;

  @extend %cardShadow;
}

.dragging {
  opacity: 0.2;
}

.profileImage {
  width: 3.2rem;
  height: 3.2rem;
  vertical-align: middle;
  border-radius: 50%;
  margin-right: 0.8rem;
}

.details {
  flex-grow: 1;
}

.email {
  color: $color-text-subtle;
  font-size: $font-size-smaller;
  font-weight: 600;
}
.status {
  width: 6rem;
  height: 2rem;

  border: 1px solid $color-active;
  border-radius: 1.5px;
  color: $color-active;

  font-weight: 600;
  text-align: center;
  line-height: 1.8rem;

  &.banned {
    color: $color-white-normal;
    border-color: $color-banned;
    background-color: $color-banned;
  }
}
</style>
