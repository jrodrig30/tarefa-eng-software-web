import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import store from './store'
import VueToast from "vue-toast-notification";
import "./assets/styles/index.css";
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import VueTheMask from 'vue-the-mask';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import GoogleAuth from 'vue-google-oauth'

Vue.config.productionTip = false;

Vue.use(VueToast, { position: "top", duration: 5000 });
Vue.use(VueTheMask);

Vue.component('datetime', Datetime);
Vue.use(GoogleAuth, { client_id: '382734831473-m7hbiuad7ve6ihv20q8tmhqa53mrhcrp.apps.googleusercontent.com' })
Vue.googleAuth().load()

new Vue({
  i18n,
  router,
  vuetify,
  store,
  Datetime,
  render: h => h(App)
}).$mount("#app");
