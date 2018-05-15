import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home');
const meetingApply = r => require.ensure([], () => r(require('@/pages/meetingApply')), 'meetingApply');
const meetingApproval = r => require.ensure([], () => r(require('@/pages/meetingApproval')), 'meetingApproval');
const meetingInfo = r => require.ensure([], () => r(require('@/pages/meetingInfo')), 'meetingInfo');
const meetingManager = r => require.ensure([], () => r(require('@/pages/meetingManager')), 'meetingManager');
const meetingProcess = r => require.ensure([], () => r(require('@/pages/meetingProcess')), 'meetingProcess');
const meetingRoomManager = r => require.ensure([], () => r(require('@/pages/meetingRoomManager')), 'meetingRoomManager');
const meetingSearch = r => require.ensure([], () => r(require('@/pages/meetingSearch')), 'meetingSearch');
const myMeetingManager = r => require.ensure([], () => r(require('@/pages/myMeetingManager')), 'myMeetingManager');
const routes = [

  {path: '/', redirect: 'home/meetingApply'},
  {
    path: '/home',
    component: home,
    name: '',
    children: [
      {
        path: 'meetingApply',
        name: "meetingApply",
        component: meetingApply,
        meta: [],
      },
      {
        path: 'meetingApproval',
        name: "meetingApproval",
        component: meetingApproval,
        meta: [],
      },
      {
        path: 'meetingInfo',
        name: "meetingInfo",
        component: meetingInfo,
        meta: [],
      },
      {
        path: 'meetingManager',
        name: "meetingManager",
        component: meetingManager,
        meta: [],
      },
      {
        path: 'meetingProcess',
        name: "meetingProcess",
        component: meetingProcess,
        meta: [],
      },
      {
        path: 'meetingRoomManager',
        name: "meetingRoomManager",
        component: meetingRoomManager,
        meta: [],
      },
      {
        path: 'meetingSearch',
        name: "meetingSearch",
        component: meetingSearch,
        meta: [],
      },
      {
        path: 'myMeetingManager',
        name: "myMeetingManager",
        component: myMeetingManager,
        meta: [],
      },

    ]
  }
]
export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
})
