import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import Vuex from 'vuex'
import store from './vuex/store'
import App from './App'
import VueRouter from 'vue-router'
import elementUi from 'element-ui'
// import vueMrc from 'vue-mrc'
// Vue.use(vueMrc)
import mrcTable from './components/mrcTable';
import mrcTableDrag from './components/mrcTableDrag';
import mrcTableSimple from './components/mrcTableSimple';
import mrcForm from './components/mrcForm';
import mrcSearchForm from './components/mrcSearchForm';
import mrcDialog from './components/mrcDialog';
import mrcFullScreen from './components/mrcFullScreen';
import mrcIframeTab from './components/mrcIframeTab';
import mrcMultipleSelect from './components/mrcMultipleSelect';
import hhIndexApp from "./components/indexApp4"
import hhIndexTab from "./components/indexTab4"
Vue.component('mrc-table', mrcTable)
Vue.component('mrc-table-drag', mrcTableDrag)
Vue.component('mrc-table-simple', mrcTableSimple)
Vue.component('mrc-form', mrcForm)
Vue.component('mrc-search-form', mrcSearchForm)
Vue.component('mrc-dialog', mrcDialog)
Vue.component('mrc-full-screen', mrcFullScreen)
Vue.component('mrc-iframe-tab', mrcIframeTab)
Vue.component('mrc-multiple-select', mrcMultipleSelect);
Vue.component('hh-index-app', hhIndexApp);
Vue.component('hh-index-tab', hhIndexTab);
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

import routerMap from "../src/router/routerMap"
import mock from "./mock/mock"
//mock.bootstrap()
let _App = new Vue({
  router: routerMap,
  store: store,
  render: h => h(App)
}).$mount('#app');
