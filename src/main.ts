import { createApp } from 'vue';
import Vue3TouchEvents from 'vue3-touch-events';
import { VueCookieNext } from 'vue-cookie-next';
import App from './App.vue';
import './registerServiceWorker';

createApp(App)
  .use(VueCookieNext)
  .use(Vue3TouchEvents)
  .mount('#app');
VueCookieNext.config({ expire: '30d' });
