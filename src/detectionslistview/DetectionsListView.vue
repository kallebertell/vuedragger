<template>
  <container class="detectionList">
    <spinner :loading="loading" />

    <header v-if="!loading" class="header">
      <olx-title>There are {{detections.length}} detections of possible fraudsters</olx-title>
    </header>
    <transition-group name="list" tag="ol">
      <li v-for="detection in detections" :key="detection.id">
          <router-link
            :to="{ name: 'detectionEdit', params: { id: detection.id }}"
            class="detection">
              Detection {{detection.id}}
          </router-link>
      </li>
    </transition-group>
  </container>
</template>

<script>
import { fetchDetections } from '@/api';
import { Container, Spinner, OlxTitle } from '@/components';

export default {
  name: 'DetectionsListView',

  components: {
    Container,
    Spinner,
    OlxTitle,
  },

  created() {
    fetchDetections().then((detections) => {
      this.detections = detections;
      this.loading = false;
    });
  },

  data() {
    return {
      detections: [],
      loading: true,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../theme/variables';

.header {
  margin-top: 4rem;
  margin-bottom: 3.2rem;
}

.detection {
  font-size: $font-size-medium;
}
</style>
