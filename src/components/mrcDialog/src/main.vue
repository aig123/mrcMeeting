<template>
  <el-dialog
     v-draggable="draggableValue"
    :title="dialogData.title"
    :visible.sync="dialogData.show"
    :width="dialogData.width"
    :close-on-click-modal="dialogData.closeOnClickModal?dialogData.closeOnClickModal:false"
    :before-close="beforeClose"
    :fullscreen="dialogData.fullscreen"
    class="diaFull"
  >
    <slot></slot>
    <div slot="title"   style="cursor: move" :ref="handleId">{{dialogData.title}}</div>
    <!--<slot name="CPU">这儿插你的CPU</slot>-->
    <!--<slot name="GPU">这儿插你的显卡</slot>-->
    <!--<slot name="Memory">这儿插你的内存</slot>-->
    <!--<slot name="Hard-drive">这儿插你的硬盘</slot>-->

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogData.show = false">{{dialogData.cancelButtonText}}</el-button>
    <el-button type="primary" @click="save"> {{dialogData.confirmButtonText}}</el-button>
  </span>
  </el-dialog>
</template>
<script>
  import { Draggable } from 'draggable-vue-directive'
  export default {
    name: 'mrc-dialog',
    template:'<div><input type="text" type="text" v-model="dialogData"/></div>',
    directives: {
      Draggable,
    },
    data() {
      return {
        rules: {},
        handleId: "handle-id",
        draggableValue: {
          resetInitialPos:true,
        }
      };
    },
    props: ['columns','value'],
    methods:{
      beforeClose(){
        if(this.dialogData.beforeCloseFn){
          try{
            this.$parent[this.dialogData.beforeCloseFn]();
          }catch(err){
            this.$emit(this.dialogData.beforeCloseFn);
          }
        }else {
          this.dialogData.show=false
        }
      },
      save(){
        try {
          this.$parent[this.dialogData.saveFn]();
        }catch(err){
          this.$emit(this.dialogData.saveFn);
        }
      }
    },
    mounted: function () {
      this.draggableValue.handle = this.$refs[this.handleId];
      this.dialogData = this.value;
      if(!this.dialogData.cancelButtonText||this.dialogData.cancelButtonText==""){
        if(!this.dialogData.cancelButtonText){
          this.$set(this.dialogData,"cancelButtonText","取消")
        }else {
          this.dialogData.cancelButtonText="取消"
        }
      }
      if(!this.dialogData.confirmButtonText||this.dialogData.confirmButtonText==""){
        if(!this.dialogData.confirmButtonText){
          this.$set(this.dialogData,"confirmButtonText","确定")
        }else {
          this.dialogData.confirmButtonText="确定"
        }
      }
    },
    computed: {
      dialogData: {
        // 动态计算currentValue的值
        get: function () {
          return this.value;
        },
        set: function (val) {
          this.$emit('input', val);
        }
      }
    },

  };
</script>
<style>
  /*transform  数值变换的时间 影响了返回跳动*/
  /*.el-dialog__wrapper{*/
  /*position: fixed!important;*/
  /*}*/
  .el-dialog__wrapper{
    -webkit-transition: all 0s 0s linear;
    -moz-transition:  all 0s 0s linear;
    -ms-transition:  all 0s 0s linear;
    -o-transition:  all 0s 0s linear;
    transition:  all 0s 0s linear;
  }
</style>
