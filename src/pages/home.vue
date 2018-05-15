<template>
  <div class="sys_home">
    <div class="sys_home_parent">
      <hh-index-app :menuListData="menu"></hh-index-app>
      <hh-index-tab  ref="mainContent"></hh-index-tab>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'home',
    data () {
      return {
        menu:[
          {
            path: "/home/use",
            title: "会议室使用",
            icon:"el-icon-news",
            children: [
              {
                path: '/home/meetingApply',
                title: "发起会议",
                icon: "el-icon-edit-outline",
              },
              {
                path: '/home/myMeetingManager',
                title: "我的会议管理",
                icon: "el-icon-edit-outline",
              },
              {
                path: '/home/meetingInfo',
                title: "会议室预约查询",
                icon: "el-icon-edit-outline",
              }
            ]
          },
          {
            path: "/home/manage",
            title: "会议室管理",
            icon:"el-icon-news",
            children: [
              {
                path: '/home/meetingApproval',
                title: "会议审批",
                icon: "el-icon-edit-outline",
              },
              {
                path: '/home/meetingRoomManager',
                title: "会议室管理",
                icon: "el-icon-edit-outline",
              }
            ]
          },
          {
            path: "/home/yiti",
            title: "会议及议题管理",
            icon:"el-icon-news",
            children: [
              {
                path: '/home/meetingManager',
                title: "会议管理",
                icon: "el-icon-edit-outline",
              },
              {
                path: '/home/meetingSearch',
                title: "会议查询",
                icon: "el-icon-edit-outline",
              }
            ]
          },
          {
            path: "/home/process",
            title: "会议进程管理",
            icon:"el-icon-news",
            children: [
              {
                path: '/home/meetingProcess',
                title: "发起进程",
                icon: "el-icon-edit-outline",
              }
            ]
          }

        ]
      }
    },
    methods: {
    },
    mounted(){
    }
  }
</script>
<style lang="scss">
  .sys_home{
    top:0px;
    left:0px;
    height:100%;
    width:100%;
    position:absolute;
    .sys_header{
      -webkit-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none;
      /*background-image:url(../assets/images/bg.jpg);*//*取消背景图片链接-20180326*/
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: -webkit-calc(100% + 5px);
      width: -moz-calc(100% + 5px);
      width: calc(100% + 5px);
      height: 50px;
      position: absolute;
      top:0px;
      left:0px;
      margin-left: -5px;
      margin-right: -5px;
      .sys_exit{
        position: absolute;
        right: 10px;
        top: 13px;
        cursor: pointer;
        border-left: 1px solid #909399;
        padding-left: 6px;
      }
      h4{
        height:50px;
        line-height: 18px;
        padding-left: 78px;/*修改文字与图标距离-20180327*/
        color: #7a7b7d;
        width:330px;
        font-weight:500;
        font-size:20px;
        font-family: "微软雅黑";
        margin-top:12px;
        letter-spacing: 2px;
        .sys_logo{
          position: absolute;
          left: 26px;/*修改头部图标距离左侧距离-20180327*/
          top:10px;
        }
      }
      h5{
        height:50px;
        line-height: 36px;
        color: #606266;
        position: absolute;
        top:0px;
        cursor:pointer;
        &.sys_df{
          right: 290px;/*调整搜索图标位置-20180327*/
        }
        &.sys_ab{
          right: 190px;/*调整菜单图标位置-20180327*/
        }
        &.sys_user{
          right: 50px;
          .sys_userPhoto{
            width: 40px;
            height: 40px;
            position: absolute;
            border-radius: 20px;
            background-color: #1b2034;
            left: -50px;
            top: 5px;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
              border-radius: 20px;
            }
          }
        }
        .sys_header_icon{
          position: absolute;
          display: block;
          width: 20px;
          left: -25px;
          top: 12px;/*调整图标和顶端距离*/
          img{
            width: 100%;
          }
        }
      }
    }
    .sys_home_parent{
      height: 100%;
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>
