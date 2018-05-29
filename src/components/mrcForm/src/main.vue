<template>
  <section>
    <div v-if="!formData.inline" class="content">
      <el-form :model="formData.data" :label-width="labelWidth" :rules="formData.rules" :ref="formData.name" :inline="formData.inline">
        <el-form-item :label="config.title" :key="config.field" v-for="config in formData.title" :prop="config.field" class="widthFull">
          <span v-if="config.type=='span'">{{formData.data[config.field]}}</span>
          <span v-if="config.type=='input'">
        <el-input v-model="formData.data[config.field]"  :placeholder="config.placeholder" class="widthFull">
        </el-input>
        <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='select'">
        <el-select v-model="formData.data[config.field]" :placeholder="config.placeholder" class="widthFull">
          <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in config.data"></el-option>
        </el-select>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='date'">
        <el-date-picker v-model="formData.data[config.field]" @change="dateChange" :placeholder="config.placeholder" class="widthFull"></el-date-picker>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='daterange'">
        <el-date-picker v-model="formData.data[config.field]" :type="config.type" :range-separator="config.rangeseparator" :start-placeholder="config.startPlaceholder" :end-placeholder="config.endPlaceholder" class="widthFull"></el-date-picker>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='uploadFile'">
        <el-upload v-model="formData.data[config.field]"
                   :action="config.action"
                   :limit="config.limit"
                   :on-preview="uploadFn(config.onPreviewFn)"
                   :on-remove="uploadFn(config.onRemoveFn)"
                   :before-remove="uploadFn(config.onRemoveFn)"
                   :multiple="config.multiple"
                   :accept="config.accept"
                   :file-list="config.fileList.data"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='switch'">
          <el-switch v-model="formData.data[config.field]"></el-switch>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='checkbox'">
        <el-checkbox-group v-model="formData.data[config.field]">
          <el-checkbox :label="item.name" :value="item.id" :key="item.id" v-for="item in config.data"></el-checkbox>
        </el-checkbox-group>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='radio'">
           <el-radio-group v-model="formData.data[config.field]">
          <el-radio :label="item.name" :value="item.id" :key="item.id" v-for="item in config.data"></el-radio>
          </el-radio-group>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <el-input  v-model="formData.data[config.field]" v-if="config.type=='textarea'" :type="config.type"></el-input>
          <el-cascader
            v-if="config.type=='cascader'"
            :placeholder="config.placeholder"
            :show-all-levels="false"
            :options="config.data"
            filterable
          ></el-cascader>
        </el-form-item>
        <slot></slot>
        <el-form-item :model="formData.buttons" :ref="formData.name" >
          <el-button :type="config.type" @click="uploadFn(config.click)"   v-for="(config,index) in formData.buttons" :key="index">{{config.name}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="formData.inline" class="content-inline">
      <el-form :model="formData.data" :label-width="labelWidth" :rules="formData.rules" :ref="formData.name" :inline="formData.inline">
        <el-form-item :label="config.title" :key="config.field" v-for="config in formData.title" :prop="config.field">
          <span v-if="config.type=='span'">{{formData.data[config.field]}}</span>
          <span v-if="config.type=='input'">
        <el-input v-model="formData.data[config.field]"  :placeholder="config.placeholder" class="widthInline">
        </el-input>
        <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='select'">
        <el-select v-model="formData.data[config.field]" :placeholder="config.placeholder" class="widthInline">
          <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in config.data"></el-option>
        </el-select>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='date'">
        <el-date-picker v-model="formData.data[config.field]" @change="dateChange" :placeholder="config.placeholder" class="widthInline"></el-date-picker>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='daterange'">
        <el-date-picker v-model="formData.data[config.field]" :type="config.type" :range-separator="config.rangeseparator" :start-placeholder="config.startPlaceholder" :end-placeholder="config.endPlaceholder" class="widthInline"></el-date-picker>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='uploadFile'">
        <el-upload v-model="formData.data[config.field]"
                   :action="config.action"
                   :limit="config.limit"
                   :on-preview="uploadFn(config.onPreviewFn)"
                   :on-remove="uploadFn(config.onRemoveFn)"
                   :before-remove="uploadFn(config.onRemoveFn)"
                   :multiple="config.multiple"
                   :accept="config.accept"
                   :file-list="config.fileList.data"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='switch'">
        <el-switch v-model="formData.data[config.field]"></el-switch>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='checkbox'">
        <el-checkbox-group v-model="formData.data[config.field]">
          <el-checkbox :label="item.name" :value="item.id" :key="item.id" v-for="item in config.data"></el-checkbox>
        </el-checkbox-group>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <span v-if="config.type=='radio'">
        <el-radio-group v-model="formData.data[config.field]">
          <el-radio :label="item.name" :value="item.id" :key="item.id" v-for="item in config.data"></el-radio>
        </el-radio-group>
          <el-tooltip effect="dark" :content=" config.tipText" placement="right" v-if="config.showTip"><!--增加感叹号，后面还对应样式-->
          <i class="el-icon-warning"></i>
        </el-tooltip>
        </span>
          <el-input  v-model="formData.data[config.field]" v-if="config.type=='textarea'" :type="config.type"></el-input>
        </el-form-item>
        <slot></slot>
        <el-form-item :model="formData.buttons" :ref="formData.name" class="btn-group">
          <el-button :type="config.type" @click="uploadFn(config.click)"   v-for="(config,index) in formData.buttons" :key="index">{{config.name}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'mrc-form',
    template:'<div><input type="text" type="text" v-model="formData"/></div>',
    data() {
      return {
        rules: {},
      };
    },
    props: ['columns','value'],
    methods:{
      uploadFn(data){
        try{
          this.$parent[data]();
        }catch(err){
          this.$emit(data);
        }
      },
      dateChange(value){
      }
    },
    mounted: function () {
      this.formData = this.value;
    },
    computed: {
      formData: {
        // 动态计算currentValue的值
        get: function () {
          return this.value;
        },
        set: function (val) {
          this.$emit('input', val);
        }
      },
      labelWidth(){
        return  this.formData.labelWidth?this.formData.labelWidth+'px':'60px'
      },
    },
  };
</script>
<style scoped>
  .el-icon-warning{
    position: absolute;
    top: 12px;
    right: -24px;
    color: #e6a23c;
  }
  .widthFull{
    width: 100%;
  }
  .widthInline{/*行内表单元素宽度*/
    width:216px;
  }
  .content{padding: 20px;max-width: 700px}
  .content-inline{padding: 20px;max-width: 1024px}
  .btn-group{width:calc(100% - 100px);margin-left: 100px;}
</style>
