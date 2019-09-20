
import { sync } from 'vuex-router-sync'

import Vue from './utils/vue'
import VCharts from 'v-charts'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import BootstrapVue from 'bootstrap-vue'
import VueI18Next from '@panter/vue-i18next';
import VeeValidate, { Validator } from 'vee-validate';
import zh from 'vee-validate/dist/locale/zh_CN'
import Logger from '@woolson/logger'

import './vendor.js'

import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'
import i18next from './i18n.js';

sync(store, router);

Vue.config.productionTip = false

const logConf = {
  logLevel: "log"
};

Vue.use(VCharts);
Vue.use(iView);
Vue.use(BootstrapVue);
Vue.use(VueI18Next);
Vue.use(VeeValidate);
Vue.use(Logger, logConf);
Vue.mixin(mixins);

Validator.localize('zh',zh);

// Vue.config.errorHandler = (err, vm, info) => {
//   console.log('err: ' + err);
//   console.log('info: ' + info);
// }

const i18n = new VueI18Next(i18next);

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
