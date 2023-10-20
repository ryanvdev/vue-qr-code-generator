import { createApp } from 'vue';
import './main.scss';
import App from './App.vue';
import { vuetifyPlugin } from './plugins/vuetify_plugin';
import { piniaPlugin } from './plugins/pinia_plugin';
import { routerPlugin } from './plugins/router_plugin';

const myApp = createApp(App);

myApp.use(vuetifyPlugin);
myApp.use(piniaPlugin);
myApp.use(routerPlugin);

myApp.mount('#app');
