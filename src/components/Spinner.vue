<template>
  <div class="spinner" v-if="loading">Loading..</div>
</template>

<script>

export default {
  name: 'Spinner',
  props: ['loading'],
};
</script>

// Css from https://projects.lukehaas.me/css-loaders/
<style scoped lang="scss">
@import '../theme/variables';

.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation-fill-mode: both;
  animation: loading 1.8s infinite ease-in-out;
}
.spinner {
  color: $color-text-normal;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;
}
.spinner:before,
.spinner:after {
  content: '';
  position: absolute;
  top: 0;
}
.spinner:before {
  left: -3.5em;
  animation-delay: -0.32s;
}
.spinner:after {
  left: 3.5em;
}
@keyframes loading {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
