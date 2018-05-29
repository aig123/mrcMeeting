<template>
  <!--<div class="sys_con" :class="{sys_close:close}">-->
  <div class="sys_con" :class="sysClose">
    <div class="sys_route">
      <div class="sys_header">
        <h4><span class="sys_logo"><img src="./assets/cap.png"></span>{{title}}<br /><span id="English">COLLABORATION APPLICATION PLATFORM</span></h4><!--修改图片src-20180326-->
        <h5 class="sys_df" style="margin-top: 20px;" v-if="!$store.getters.phone">
          <!--<el-radio-group v-model="languageValue" @change="languageChange">-->
            <!--<el-radio  label="cn">中文</el-radio>-->
            <!--<el-radio  label="en">英文</el-radio>-->
          <!--</el-radio-group>-->
        </h5><!--搜索按钮图片-->
        <div class="sys_head el-dropdown-link" v-if="!$store.getters.phone">
          <div class="imgBox">
            <img src="./assets/1.png" alt="" width="50" height="50">
          </div>
          <div style="float: left;margin-top: 5px">
            {{user}}<br />
            <span>{{department}}</span>
          </div>
        </div>
        <div style="position: absolute;cursor:pointer;right:44px;top:30px">
          <img src="./assets/logout.png" alt=""  width="26" height="26">
        </div>
        <hr />
      </div>
      <div class="sys_route_out">
        <transition name="router-fade" mode="out-in">
          <!--<keep-alive>-->
          <div style="height: 100%;">
            <router-view v-if="routerType=='normal'"></router-view>
            <!--</keep-alive>-->
            <mrc-iframe-tab  v-if="routerType=='iframe'"> </mrc-iframe-tab>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import language  from "../../language/language";
  export default {
    name: "hh-index-tab",
    data(){
      return {
        close:false,
        sysClose:"",
        currRoute: null,
        crumbs:[],
        cUrl: null,
        title:language.platformName,
        user:language.user,
        department:language.department,
        languageValue:"cn",
        // iframe tab 设置
        routerType:"normal",
        editableTabsValue: '1',
        editableTabs: [],
        tabIndex: 1
      }
    },
    methods:{
      languageChange(val){
        localStorage.setItem('ELEMENT_LANGUAGE',val)
        window.location.reload();
      },
      addTab(targetName,src) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: targetName,
          name: newTabName,
          src:src
        });
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabs;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    computed:{
      closeMenuState(){
        return this.$store.getters.mentState;
      }
    },
    watch:{
      closeMenuState(value) {
        if (value==true) {
          this.close = true
          this.sysClose = 'sys_close';
        }
        else if(value=='phone'){
          this.close = false;
          this.sysClose = "sys_close_phone";
        }
        else {
          this.close = false;
          this.sysClose = "";
        }
      },
      $route(data) {
        if (data.meta[0] &&data.meta[0].type && data.meta[0].type == 'iframe') {
          this.routerType = "iframe";
        }else {
          this.routerType = "normal";
        }
      }
    },
    mounted() {
      if (this.$route.meta[0] &&this.$route.meta[0].type && this.$route.meta[0].type == 'iframe') {
        this.routerType = "iframe";
      }else {
        this.routerType = "normal";
      }
      this.languageValue = localStorage.getItem('ELEMENT_LANGUAGE')
    }
  }
</script>
<style lang="scss">

  .sys_con{
    background-color: #fff;
    box-sizing:border-box;
    width:100%;
    height: 100%;
    padding-left: 220px;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -ms-transition: all .5s;
    transition: all .5s;
    &.sys_close{
      padding-left: 64px;
    }
    &.sys_close_phone{
      padding-left: 0px;
    }
    .sys_route{
      position: relative;
      box-sizing:border-box;
      padding: 0px 10px 10px 5px;
      height: 100%;
      width:100%;
    }
    .sys_route_out{
      position: relative;
      width: 100%;
      height: -webkit-calc(100% - 90px);
      height: -moz-calc(100% - 90px);
      height: calc(100% - 90px);
      /*overflow-y: auto;*/
    }
    .sys_route_out> div{
      overflow-y: auto;
      background: rgba(239, 238, 238, 0.49);
    }

  }
  .sys_route_out > div{
    height: 100%;}
  .sys_head{
    position: absolute;
    top:18px;
    right:100px;}
.imgBox{float: left;width: 50px;height: 50px;border-radius: 50%;overflow: hidden;background: #000;margin-right: 6px;}
  .personBox{margin-top: 5px;cursor:pointer;position: relative;z-index: 1}/*兼容IE点击事件*/

</style>
<style src="./css/my.css" scoped></style>
