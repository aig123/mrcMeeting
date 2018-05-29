<template>
  <div class="sys_con" :class="{sys_close:close}">
    <div class="sys_header">
      <h4 style="margin-left: 67px;line-height: 20px"><span class="sys_logo"><img src="../../indexApp3/src/assets/logo.png" id="logo1" style="margin-top: -14px"></span>{{title}}<br /><span id="English">COLLABORATION APPLICATION PLATFORM</span></h4>
      <h5 class="sys_df" style="margin-top: 20px;position: absolute;z-index: 2" v-if="!$store.getters.phone">
        <el-radio-group v-model="languageValue" @change="languageChange">
          <el-radio  label="cn">中文</el-radio>
          <el-radio  label="en">英文</el-radio>
        </el-radio-group>
      </h5>
      <div class="sys_head" v-if="!$store.getters.phone">
        <el-dropdown @command="" class="personBox" trigger="click">
            <span class="el-dropdown-link">
              {{user}}<i class="el-icon-arrow-down el-icon--right"></i><br />
            <span>{{department}}</span>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="imgBox">
          <img src="./assets/1.png" alt="" width="50" height="50">
        </div>
      </div>
      <hr />
    </div>
    <div class="sys_route">
      <div class="sys_route_out">
        <transition name="router-fade" mode="out-in">
          <!--<keep-alive>-->
          <router-view v-if="routerType=='normal'"></router-view>
          <mrc-iframe-tab  v-if="routerType=='iframe'"> </mrc-iframe-tab>
          <!--</keep-alive>-->
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import language  from "../../language/language";
  export default {
    name: "hh-index-tab3",
    data(){
      return {
        close:false,
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
    methods: {
      languageChange(val) {
        localStorage.setItem('ELEMENT_LANGUAGE', val)
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
      computed: {
        closeMenuState() {
          return this.$store.getters.mentState;
        },

      },
      watch: {
        closeMenuState(value) {
          if (value)
            this.close = true;
          else
            this.close = false;
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
  }
  .sys_route_out > div{
    height: 100%;}
  .sys_head{
    position: absolute;
    top:18px;
    right:80px;}
  .imgBox{float: left;width: 50px;height: 50px;border-radius: 50%;overflow: hidden;background: #000;margin-right: 6px;}
  .personBox{margin-top: 5px;cursor:pointer;position: relative;z-index: 1}/*兼容IE点击事件*/
  .searchForm .el-input__inner{border-radius:3px;}/*添加圆角*/
  .menu_right{top:0}
  .sys_con .sys_route{left:2px;position: relative;box-sizing:border-box;padding: 0px 10px 10px 5px;height: 100%;width:100%;}
  .sys_con .sys_route_out{top:100px;position: relative;width: 100%;height: -webkit-calc(100% - 90px);height: -moz-calc(100% - 90px);height: calc(100% - 90px);overflow-y: auto;}
  .sys_home .sys_header{height:100px; }
  .searchForm{margin-left:2px;margin-right:2px;border-radius:2px;}
  #logname{font-size: 14px}
  #department{position: absolute;top:26px;white-space: nowrap;}
  .sys_home .sys_header h4{line-height: 18px;margin-top:25px;font-size: 20px;font-weight: 500;letter-spacing: 2px;}
  .sys_home .sys_header h4 .sys_logo{top:22px;}
  .sys_home .sys_header h5.sys_user .sys_userPhoto{top:15px}
  .sys_home .sys_header h5.sys_user{padding-top:8px}
  .sys_home .sys_header h5{top:6px !important;}
  .searchForm .searchForm--item:first-child{margin-left:10px;}
  #English{font-size: 8px;letter-spacing: -1px}
  hr{margin-top:16px;border:solid 0.5px #e7ecf1}
</style>
