import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';

Vue.use(VueSweetalert2)
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');