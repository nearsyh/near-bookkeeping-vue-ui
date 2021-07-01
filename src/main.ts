import { createApp } from 'vue';
import { VueCookieNext } from 'vue-cookie-next';
import App from './App.vue';

createApp(App).use(VueCookieNext).mount('#app');
VueCookieNext.config({ expire: '30d' });
