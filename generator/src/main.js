import { createApp } from 'vue';
import VueHighlightJS from 'vue3-highlightjs';
import Toast from 'vue-toastification';

import 'vue-toastification/dist/index.css';
import 'highlight.js/styles/night-owl.css';
import 'bannery/dist/style.css';

import App from './App.vue';
import './index.css';

const app = createApp(App);

app.use(VueHighlightJS);
app.use(Toast, {});

app.mount('#app');
