import { createApp } from 'vue';
import Banner from './Banner.vue';

let app;
window.Bannery = ({ url, mountSelector = '.bannery' }) => {
  if (app) app.unmount();
  app = createApp(Banner);
  app.provide('url', url);
  app.mount(mountSelector);
};
