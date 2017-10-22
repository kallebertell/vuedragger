import Vue from 'vue';
import Router from 'vue-router';
import DetectionView from '@/detectionview';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'detection',
      component: DetectionView,
    },
  ],
});
