import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import {router} from '@/router';
import store from './store';
import '@/assets/styles/app.css';
import '@/shared/jwtInterceptor';
import mitt from 'mitt';

const emitter = mitt();

const app = createApp(App);

app.config.globalProperties.emitter = emitter;
app.use(store).use(router).mount('#app');
