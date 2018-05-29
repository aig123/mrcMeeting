<template>
  <section>
    <div class="searchForm" style="margin-bottom: 8px" ref="searchForm">
      <div class="searchForm--item" v-if="!more" v-for="config in formData.title" :key="config.field">
        <label class="searchForm--item__label"  :style="'width:'+ labelWidth+'px'" style="text-align: right">{{config.title}}</label>
        <div class="searchForm--item__content">
          <el-input class="search-input" v-model="formData.data[config.field]" v-if="config.type=='input'" :placeholder="config.placeholder"
                    size="small"></el-input>
          <el-select class="search-input" v-model="formData.data[config.field]" v-if="config.type=='select'"
                     :placeholder="config.placeholder" @change="change(config.change)" size="small">
            <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in config.data"></el-option>
          </el-select>
          <el-date-picker class="search-input" type="date" placeholder="选择日期" v-model="formData.data[config.field]"
                          v-if="config.type=='date'" size="small"></el-date-picker>
          <el-date-picker v-model="formData.data[config.field]" v-if="config.type=='daterange'" :type="config.type" :range-separator="config.rangeseparator" :start-placeholder="config.startPlaceholder" :end-placeholder="config.endPlaceholder" style="width: 100%;margin-top:-2px" size="small"></el-date-picker>
          <el-date-picker class="search-input"  v-if="config.type=='datetime'" size="small"
                          v-model="formData.data[config.field]"
                          type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          <el-radio-group v-model="formData.data[config.field]" v-if="config.type=='radio'" style="line-height: 30px">
            <el-radio :label="item.name" :value="item.name" :key="item.id" v-for="item in config.data" style="line-height: 30px"></el-radio>
          </el-radio-group>

        </div>
      </div>

      <div class="searchForm--item" v-if="more" v-for="config in formData.moreTitle" :key="config.field">
        <label class="searchForm--item__label"  :style="'width:'+ labelWidth+'px'" style="text-align: right">{{config.title}}</label><!--ÐÞ¸Ä±êÇ©¿í¶È-->
        <div class="searchForm--item__content">
          <el-input class="search-input" v-model="formData.data[config.field]" v-if="config.type=='input'" :placeholder="config.placeholder"
                    size="small"></el-input>
          <el-select class="search-input" v-model="formData.data[config.field]" v-if="config.type=='select'"
                     :placeholder="config.placeholder" @change="change(config.change)" size="small">
            <el-option :label="item.name" :value="item.name" :key="item.id" v-for="item in config.data"></el-option>
          </el-select>
          <el-date-picker class="search-input" type="date" placeholder="选择日期" v-model="formData.data[config.field]"
                          v-if="config.type=='date'" size="small"></el-date-picker>
          <el-date-picker v-model="formData.data[config.field]" v-if="config.type=='daterange'" :type="config.type" :range-separator="config.rangeseparator" :start-placeholder="config.startPlaceholder" :end-placeholder="config.endPlaceholder" style="width: 100%;margin-top:-2px" size="small"></el-date-picker>
          <el-radio-group v-model="formData.data[config.field]" v-if="config.type=='radio'" style="line-height: 30px">
            <el-radio :label="item.name" :value="item.name" :key="item.id" v-for="item in config.data" style="line-height: 30px"></el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="searchForm--item">
        <slot></slot>
      </div>
      <div class="searchForm--button" v-if="formData.buttons&&formData.buttons.dataRight">
        <el-button type="primary" @click="search(button.click)" size="small"
                   v-for="(button,index) in formData.buttons.dataRight" :key="index">{{button.name}}
        </el-button>
      </div>
      <div class="searchForm--item" style="margin-left: 20px" v-if="formData.buttons&&formData.buttons.dataLeft">
        <el-button type="primary" @click="search(button.click,button.name)" size="small"
                   v-for="(button,index) in formData.buttons.dataLeft" :key="index">{{button.name}}
        </el-button>
      </div>
      <div class="searchForm--item" style="margin-left: 20px" v-if="formData.moreTitle&&formData.moreTitle.length>0">
        <el-button type="primary" @click="moreSearch()" size="small">{{moreName}}</el-button>
      </div>
      <div class="show-set" v-if="false">
        <span class="el-icon-setting" @click="searDialogShow"></span>
      </div>
    </div>

    <el-dialog
      title="更多设置"
      :visible.sync="searDialogVisible"
      width="30%">
      <span>
        <el-checkbox-group v-model="fields" style="margin-top: 10px">
            <el-checkbox class="mode"  v-dragging="{ item: data, list: formData.moreTitle, group: 'data'}" v-for="(data,index) in formData.moreTitle" :label="data.field" :key="data.field">{{data.title}}</el-checkbox>
        </el-checkbox-group>
      </span>
      <span slot="footer" class="dialog-footer">
           <el-button @click="searDialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>

  </section>
</template>
<script>
  import language from "../../language/language";
  export default {
    name: 'mrc-search-form',
    template: '<div><input type="text" type="text" v-model="formData"/></div>',
    data() {
      return {
        more: false,
        moreName: language.moreConditions,
        checkList: ['选中且禁用','复选框 A'],
        searDialogVisible:false,
        fields:[],
      };
    },
    props: ['columns', 'value'],
    methods: {
      search(data, name) {
        if (data) {
          try {
            this.$parent[data]();
          }catch(err){
            this.$emit(data);
          }
        }
      },
      searDialogShow(){
        this.searDialogVisible=true;
      },
      save(){
        this.searDialogVisible=false;
        console.log(this.fields);
        this.formData.title=[];
        for(let data of this.formData.moreTitle){
          for(let field of this.fields){
            if(field==data.field){
              this.formData.title.push(data);
              console.log(data)
            }
          }
        }
      },
      moreSearch() {
        if (!this.more) {
          this.more = true;
          this.moreName = language.lessConditions;
        } else {
          this.more = false;
          this.moreName = language.moreConditions;
        }

        let _this=this
        setTimeout(function () {
          _this.$store.commit("sHeight", _this.$refs.searchForm.offsetHeight+13);
          console.log(_this.$refs.searchForm.offsetHeight);
        },5)

      },
      change(data) {
        try{
          this.$parent[data]();
        }catch(err){
          this.$emit(data);
        }
      }
    },
    mounted: function () {
      this.formData = this.value;
      this.fields=[];
      for(let data of this.formData.title){
        this.fields.push(data.field);
      }
    },
    computed: {
      formData: {
        get: function () {
          return this.value;
        },
        set: function (val) {
          this.$emit('input', val);
        }
      },
      labelWidth(){
        return this.formData.labelWidth?this.formData.labelWidth:50
      }
    },

  };
</script>
<style scoped>
  .mode:first-child {
    margin-left: 30px!important;
  }
  .search-input {
    width: 190px;
    margin-bottom: 5px;}
  .searchForm--item{margin-bottom: -2px}
</style>
