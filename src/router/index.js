import Vue from 'vue';
import Router from 'vue-router';
import DetectionsListView from '@/detectionslistview';
import DetectionEditView from '@/detectioneditview';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'detectionsList',
      component: DetectionsListView,
    },
    {
      path: '/detections/:id',
      name: 'detectionEdit',
      component: DetectionEditView,
    },
  ],
});
