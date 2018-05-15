<template>
  <div class="index">
    <div class="right">
      <router-view>
        <!--在这里显示每个加载的页面-->
      </router-view>
    </div>
  </div>
</template>
<style>
  body, html {
    height: 100%;
  }
  body {
    margin: 0px;
    padding: 0px;
    background-color: #fff;
    font-family: Microsoft YaHei, Arial, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  .index {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  .index .right {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .content{
    width: 100%;
    height: 100%;
    /*min-width: 1200px;*/
    /*overflow: scroll;*/
  }

  .show-set {
    margin-top: 9px;
    float: right;
    cursor: pointer;
    display: block;
    width: 20px;
    height: 20px;
  }

  .show-set span {
    font-size: 20px;
    display: none;
  }

  .show-set:hover span {
    font-size: 20px;
    display: block;
  }
  .el-dialog__body{
    height: -webkit-calc(100% - 40px);
    height: -moz-calc(100% - 40px);
    height: calc(100% - 40px);
  }
</style>

<script>
  export default {
    name: 'hh',
    data() {
      return {};
    },
    methods:{},
    mounted(){}
  }

</script>
