<template>
  <section style="height: 100%;float: left;margin-right: 40px;margin-top: 20px;">
    <el-card class="box-card" v-if="!dialog">
      <slot></slot>
      <el-button
        type="text"
        icon="el-icon-rank" @click="openFull" style="position:absolute;top:0;right:26px;top:22px">全屏</el-button><!--点击全屏按钮-->
    </el-card>
    <el-dialog title="全屏" :visible.sync="dialogFullVisible" :fullscreen="true" style="height: 100%" v-if="dialog" :before-close="closeDia">
      <slot></slot>
    </el-dialog>
  </section>
</template>
<script>
  import language from "../../language/language";
  export default {
    name: 'mrc-full-screen',
    data() {
      return {
        dialogFullVisible:true,
        dialog:false
      };
    },
    props: [],
    methods: {
      openFull(){
        this.dialogFullVisible=true;
        this.dialog=true;
      },
      closeDia(){
        this.dialog=false;
      }
    },
    mounted: function () {},
  };
</script>
