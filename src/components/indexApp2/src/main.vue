<template>
  <div class="menu_right" :class="{closeMenu:isOpen}">
    <div class="listP" style="box-shadow: none">
      <div class="menu_head" style="background: #4777e9;box-shadow:none">
        <menuState ref="menuState" :isOpen="isOpen" @click="menuStateHandle"></menuState>
      </div>
      <div class="list" style="border-right:solid 1px #e6e6e6">
        <el-menu
          router
          :default-active="defaultActive"
          :unique-opened="true"
          class="el-menu-vertical-demo "
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :collapse-transition="true"
          active-text-color="rgb(3, 131, 247)"
        >
          <span v-for="item in menuListData" :key="item.title" class="lable-menu">
             <el-submenu v-if="item.children&&item.children.length>0" :index="item.path">
               <template slot="title">
                 <i :class="item.icon"></i>
                 <span slot="title">{{item.title}}</span>
               </template>
                 <el-menu-item :index="menuItem.path" :key="index" v-for="(menuItem,index) in item.children">
                   {{menuItem.title}}
                 </el-menu-item>
             </el-submenu>
             <el-menu-item :index="item.path" v-if="!item.children||item.children.length==0">
               <i :class="item.icon"></i>
               <span slot="title">{{item.title}}</span>
             </el-menu-item>
           </span>
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "hh-index-app2",
    data(){
      return {
        theTitle: "我的应用",
        isCollapse: false,
        isOpen: false,//菜单是否打开
        childrenListHeight:40,
        screenWidth: document.body.clientWidth,
        defaultActive:"",
        css:{
          isHidden: true
        },
        mouseenterArr:[],
        phone:false
      }
    },
    props:["menuListData"],
    //方法
    methods:{
      menuStateHandle(){
        var _this = this;
        if(_this.isCollapse){
          _this.isCollapse=false
        }else {
          _this.isCollapse=true
        }
        this.$refs["menuState"].$off("MENUSTATE", this.menuStateHandle);
        this.isOpen = this.isOpen ? false : true;
        this.$store.commit("MENUSTATE", this.isOpen);
        setTimeout(function(){
          _this.$refs["menuState"].$on("MENUSTATE", _this.menuStateHandle);
        }, 500)

      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        this.defaultActive = keyPath;
      },
      //清除所有滑过事件
      clearMouseenter(doms){
        var _this = this;
        // doms.forEach(function(element, index){
        //   element.removeEventListener("mouseenter", _this.mouseenterArr[index])
        // });
        for(let index of doms){
          debugger
          doms[index].removeEventListener("mouseenter", _this.mouseenterArr[index])
        }
      },
      changePhone(){
        let that=this;
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth;
        console.log(that.screenWidth);
        if(that.screenWidth<700){
          that.isOpen=true;
          that.phone=true
          this.isCollapse=true
        }else {
          that.isOpen=false;
          that.phone=false
          this.isCollapse=false
        }
        that.$store.commit("MENUSTATE", that.isOpen);
        that.$store.commit("phone", that.phone);
        // setTimeout(function(){
        //   that.$refs["menuState"].$on("MENUSTATE", that.menuStateHandle);
        // }, 500)
      }
    },
    components:{
      "menuState": {
        template: '<a href="javascript:void(0)" :class="{on:isOpen}"  id="logoClick"><img :src="imgUrl" id="menu_click" @click = "clickHandle"/><img :src="logoUrl" id="logo"></a>',
        data(){
          return {
            imgUrl: require("./assets/menu_click.png"),
            logoUrl:require("./assets/logo.png")/*logo图片路径-20180326*/
          }
        },
        props:["isOpen"],
        methods:{
          clickHandle(evt){
            this.$emit("MENUSTATE", evt);
          }
        }
      }
    },
    watch:{
      title(val){
        this.theTitle = val;
      },
      isOpen(val){
        var _this = this;
        if(val){
          this.mouseenterArr = [];
          for(let element of document.querySelectorAll(".listCon")){
            var _fun = (function(_this){
              return function (evt) {
                var _target = evt.target;
                var _childrenList = evt.target.querySelector(".childrenList");
                var _top = _target.getBoundingClientRect().top;
                var _currY = _target.getBoundingClientRect().y;
                var _container =  window.document.body.clientHeight;
                _this.clearCollLays();
                if (_childrenList) {
                  _childrenList.classList.add("on");
                  _childrenList.style.top = _top + "px";
                  var menuChildrenListHeight = _childrenList.querySelector(".menu_children_li").clientHeight;
                  if((_container - _currY) < menuChildrenListHeight){
                    //console.info(menuChildrenListHeight - (_container - _currY));
                    _childrenList.querySelector(".menu_children_li").style.top = (_container - _currY) - menuChildrenListHeight  + "px";
                  }else {
                    _childrenList.querySelector(".menu_children_li").style.top = 0;
                  }
                }
              }
            })(_this);
            _this.mouseenterArr.push(_fun);
            element.addEventListener("mouseenter", _fun);
            element.addEventListener("mouseleave", (function(_this){
              return function(){
                _this.clearCollLays();
              }
            })(_this));
          }

        }
        else{
          this.clearMouseenter(document.querySelectorAll(".listCon"));
        }
      },
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
            that.timer = false
          }, 400)
        }
      },
      $route(data) {
        this.handleSelect(data.name,data.path)
      }
    },
    mounted(){//this.$store.commit("LOADHOME", true);
      this.handleSelect(this.$route.name,this.$route.path)
      var that = this;
      var _listArr = [];
      this.$refs["menuState"].$on("MENUSTATE", this.menuStateHandle);
      this.changePhone();
      // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
      window.onresize = () => {
        return (() => {
          this.changePhone();
        })()
      }
    },

  }
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
  }
  .el-menu-vertical-demo2:not(.el-menu--collapse) {
    width: 100%;
  }
  .el-menu--collapse > .el-menu-item span, .el-menu--collapse > .lable-menu > .el-submenu >  .el-submenu__title span {
    height: 0;
    width: 10px;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
  .el-menu--collapse > .el-menu-item .el-submenu__icon-arrow, .el-menu--collapse > .lable-menu >.el-submenu > .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
</style>
<style lang="scss">
  /*menu max width out scroll*/
  /*$menu_width : 215px;*/
  @mixin menu_width {
    width: -webkit-calc(100% - 5px);
    width: -moz-calc(100% - 5px);
    width: 100%;
  }
  .menu_right{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -ms-transition: all .5s;
    transition: all .5s;
    position:absolute;
    z-index: 100;
    width:220px;
    height:100%;
    &.closeMenu{
      width: 64px;
      .childrenList{
        overflow: visible !important;
        display: none;
        height: auto !important;
        position:fixed;
        width: 220px;
        left: 50px;
        &.on{
          display: block;
        }
      }
    }
    &.closeMenuPhone{
      width: 0px;
    }
    *{
      box-sizing: border-box;
    }
    .listP{
      height: 100%;
      box-shadow: 2px 0px 30px #ddd;
      /*menu header*/
      .menu_head{
        position: relative;
        /*width: $menu_width;*/
        @include menu_width;
        height: 91px;
        top:0px;
        box-shadow: 0 1px 8px #f2f2f2;
        /*background-color: #24254f;*//*去掉背景颜色-20180326*/
        z-index: 1;
        &>a{
          -webkit-transition: transform .5s;
          -moz-transition: transform .5s;
          -ms-transition: transform .5s;
          transition: transform .5s;
          position: absolute;
          display: block;
          top: 14px;
          cursor: pointer;
          left: 10px;
          &.on{
            left:12px !important;/*新添加的-20180327*/
          }
        }
      }
      /*menu content*/
      .list{
        width:100%;/*重新调整宽度-20180329*/
        height:calc(100% - 91px);
        overflow-y:auto;
        overflow-x: hidden;
        /*background*/
        .list_bgcolor{
          position: absolute;
          @include menu_width;
          height: 100%;
          top:0px;
          left: 0px;
          width:100%;
          box-shadow: 2px 0px 30px #c8c8c8;/*添加右侧阴影-20180326*/
        }
        /*list li*/
      }
    }
  }
  #menu_click{/*修改菜单按钮位置样式，重新赋予id-20180328*/
    position: absolute;
    top:32px;
    left:7px;
  }
  #logo{/*修改大众logo位置样式，重新赋予id-20180328*/
    margin-left: -20px;
    position: absolute;
    left:-130px;
    top:9px;
  }
  #logoClick{/*将原来的模板内的a标签样式单独提出来，重新赋予id-20180328*/
    position:absolute;top:0;left:170px;transition: all .5s
  }
  .on #menu_click{/*新定义样式-20180328*/
    transform:rotate(90deg);
    -ms-transform:rotate(90deg);
    -moz-transform:rotate(90deg);
    webkit-transform:rotate(90deg)
  }
  #menu_click{/*为该id添加渐变CSS-20180328*/
    transition: all .5s
  }
  .sys_con .sys_route{
    left:5px;
  }

  /*滚动条样式开始*/



  ::-webkit-scrollbar-thumb{
    background-color:#c1c1c1;
    height:50px;
    outline-offset:-2px;
    outline:2px solid #fff;
    -webkit-border-radius:4px;
    border: 2px solid #fff;
  }
  /*---鼠标点击滚动条显示样式--*/
  ::-webkit-scrollbar-thumb:hover{
    background-color:#c1c1c1;
    height:50px;
    -webkit-border-radius:4px;
  }
  /*---滚动条大小--*/
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
  }
  /*---滚动框背景样式--*/
  ::-webkit-scrollbar-track-piece{
    background-color:#fff;
    -webkit-border-radius:0;
  }
</style>
<style lang="scss" src="../../scss/app.scss"></style>
