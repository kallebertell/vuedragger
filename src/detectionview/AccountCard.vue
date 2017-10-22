<template>
  <li
    :class="classObject"
    draggable
    @dragstart="onDragStart"
    @dragend="onDragEnd">
    <img :src="account.img" draggable="false" />
    <span>{{account.email}}</span>
  </li>
</template>

<script>

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

<style scoped>
.accountCard {
  background: white;
  box-shadow: 1px 1px 3px #ccc;
  padding: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  user-select: none;
  cursor: move;
  width: 10rem;
  white-space: nowrap;
}

.dragging {
  opacity: 0.2;
}

img {
  width: 2rem;
  vertical-align: middle;
  border-radius: 50%;
}
</style>
