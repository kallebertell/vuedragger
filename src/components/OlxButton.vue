<template>
  <button class="button" @click="onClick" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
/**
 * Since I'm lower-kebab-casing all the components in markup I can't name this Button cause
 * then it'd clash with the regular 'button' element.
 */
export default {
  name: 'olx-button',
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style scoped lang="scss">
@import '../theme/variables';

.button {
  display: inline-block;
  height: 3.2rem;

  padding: .6rem 1rem;
  font-size: $font-size-smaller;
  border: none;
  border-radius: 1.5px;

  background-color: $color-active;
  color: $color-white-normal;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  cursor: pointer;

  transition: all .2s ease-in-out;

  &:disabled, .disabled {
    background-color: $color-disabled;
    cursor: default;
  }
}
</style>
