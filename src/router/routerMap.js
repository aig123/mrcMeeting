import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const apply = r => require.ensure([], () => r(require('@/pages/apply')), 'apply');
const applyView = r => require.ensure([], () => r(require('@/pages/applyView')), 'applyView');
const approval = r => require.ensure([], () => r(require('@/pages/approval')), 'approval');
const appointment = r => require.ensure([], () => r(require('@/pages/appointment')), 'appointment');
const manager = r => require.ensure([], () => r(require('@/pages/manager')), 'manager');
const process = r => require.ensure([], () => r(require('@/pages/process')), 'process');
const roomManager = r => require.ensure([], () => r(require('@/pages/roomManager')), 'roomManager');
const search = r => require.ensure([], () => r(require('@/pages/search')), 'search');
const myManager = r => require.ensure([], () => r(require('@/pages/myManager')), 'myManager');
const routes = [

  {path: '/', redirect: 'meet/apply'},
  {
    path: '/meet',
    component: home,
    name: '',
    children: [
      {
        path: 'applyView',
        name: "applyViewdd",
        component: applyView,
        meta: [],
      },
      {
        path: 'apply',
        name: "apply",
        component: apply,
        meta: [],
      },
      {
        path: 'approval',
        name: "approval",
        component: approval,
        meta: [],
      },
      {
        path: 'appointment',
        name: "appointment",
        component: appointment,
        meta: [],
      },
      {
        path: 'manager',
        name: "manager",
        component: manager,
        meta: [],
      },
      {
        path: 'roomManager',
        name: "roomManager",
        component: roomManager,
        meta: [],
      },
      {
        path: 'process',
        name: "process",
        component: process,
        meta: [],
      },
      {
        path: 'search',
        name: "search",
        component: search,
        meta: [],
      },
      {
        path: 'myManager',
        name: "myManager",
        component: myManager,
        meta: [],
      },

    ]
  }
]
export default new Router({
  routes
})
