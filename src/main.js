import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import Vuex from 'vuex'
import store from './vuex/store'
import App from './App'
import VueRouter from 'vue-router'
import elementUi from 'element-ui'
import vueMrc from 'vue-mrc'
import VueDND from 'awe-dnd'   //拖拽
//语言切换
import locale from 'element-ui/lib/locale/lang/en'
if (localStorage.getItem('ELEMENT_LANGUAGE') == "cn") {
  Vue.use(elementUi);
} else if (localStorage.getItem('ELEMENT_LANGUAGE') == "en") {
  Vue.use(elementUi,{ locale });
}else {
  Vue.use(elementUi);
}
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueDND)
Vue.use(vueMrc)
import routerMap from "../src/router/routerMap"
import mock from "./mock/mock"
mock.bootstrap()
let _App = new Vue({
  router: routerMap,
  store: store,
  render: h => h(App)
}).$mount('#app');
