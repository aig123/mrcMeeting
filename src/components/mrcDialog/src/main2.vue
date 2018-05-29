<template>
  <el-dialog
    id="box"
    @open="open"
    ref="dia"
    :title="dialogData.title"
    :visible.sync="dialogData.show"
    :width="dialogData.width"
    :close-on-click-modal="dialogData.closeOnClickModal?dialogData.closeOnClickModal:false"
    :before-close="beforeClose"
    :fullscreen="dialogData.fullscreen"
    class="diaFull"
  >
    <slot></slot>
    <div slot="title"   style="cursor: move" :ref="handleId" id="oBar">{{dialogData.title}}</div>
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
  export default {
    name: 'mrc-dialog',
    template:'<div><input type="text" type="text" v-model="dialogData"/></div>',
    data() {
      return {
        rules: {},
        handleId: "handle-id",
        draggableValue: {
          resetInitialPos:true,
        },
        params: {
          left: 0,
          top: 0,
          currentX: 0,
          currentY: 0,
          flag: false
        }
      }
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
      },
      getCss(o,key){
        return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
      },
      startDrag(bar, target, callback){
        let _this=this;
        if(_this.getCss(target, "left") !== "auto"){
          _this.params.left = _this.getCss(target, "left");
        }
        if(_this.getCss(target, "top") !== "auto"){
          _this.params.top = _this.getCss(target, "top");
        }
        bar.onmousedown = function(event){
          _this.params.flag = true;
          if(!event){
            event = window.event;
            bar.onselectstart = function(){
              return false;
            }
          }
          var e = event;
          _this.params.currentX = e.clientX;
          _this.params.currentY = e.clientY;
        };
        document.onmouseup = function(){
          _this.params.flag = false;
          if(_this.getCss(target, "left") !== "auto"){
            _this.params.left = _this.getCss(target, "left");
          }
          if(_this.getCss(target, "top") !== "auto"){
            _this.params.top = _this.getCss(target, "top");
          }
        };
        document.onmousemove = function(event){
          var e = event ? event: window.event;
          if(_this.params.flag){
            var nowX = e.clientX, nowY = e.clientY;
            var disX = nowX - _this.params.currentX, disY = nowY - _this.params.currentY;
            target.style.left = parseInt(_this.params.left) + disX + "px";
            target.style.top = parseInt(_this.params.top) + disY + "px";

            if (typeof callback == "function") {
              callback((parseInt(_this.params.left) || 0) + disX, (parseInt(_this.params.top) || 0) + disY);
            }

            if (event.preventDefault) {
              event.preventDefault();
            }
            return false;
          }
        }
      },
      open(){
        let _this=this;
        var oBox =_this.$refs.dia.$el.firstElementChild;
        oBox.style.left = "0px";
        oBox.style.top = "0px";
        this.params={
          left: 0,
          top: 0,
          currentX: 0,
          currentY: 0,
          flag: false
        }
        setTimeout(function () {
          var oBox =_this.$refs.dia.$el.firstElementChild;
          var oBar = document.getElementById("oBar");
          if(!oBar.onmousedown){
            _this.startDrag(oBar, oBox);
          }
        },1000)

      }
    },
    mounted: function () {


      // this.draggableValue.handle = this.$refs[this.handleId];
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
