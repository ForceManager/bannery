import { createApp } from 'vue';
import '@/lib/firebase';

import Banner from './Banner.vue';

let app;
window.Bannery = ({ key, mountSelector = '.bannery' }) => {
  if (app) app.unmount();
  app = createApp(Banner);
  app.provide('key', key);
  app.mount(mountSelector);
  console.log(app);
};
