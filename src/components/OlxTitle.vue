<template>
  <h1 class="title">
    <slot></slot>
  </h1>
</template>

<script>
export default {
  name: 'OlxTitle',
};
</script>

<style scoped lang="scss">
@import '../theme/variables';

.title {
  margin: 0 0 0 1.6rem;
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 1.33;
  color: $color-text-header;
}

</style>


