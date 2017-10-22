<template>
  <section class="container">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'Container',
};
</script>

<style scoped lang="scss">
.container {
  padding: 0 4rem;
  margin: 0 auto;
}
</style>
