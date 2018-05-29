﻿﻿<template>
  <section  id="outer" :style="'height:'+ '-webkit-calc(100% - '+sHeight+'px)'+';'+'height:'+ 'calc(100% - '+sHeight+'px)' ">
    <!--表格功能按钮-->
    <div id="user" v-show="!this.tableData.hideToolbar">{{tableData.description}}</div>
    <div id="floatR" v-show="!this.tableData.hideToolbar">
      <el-button type="text" icon="el-icon-rank" @click="dialogTableVisible=true" v-if="tableData.FullScreen">{{fullScreenName}}</el-button>
      <el-button
        type="text"
        :icon="data.icon" v-for="data in tableData.buttons" :key="data.name" @click="operateClick(data.click)">{{data.name}}</el-button>
      <!--小按钮开始-->
      <div class="show-set" style="margin-left:8px">
        <span class="el-icon-setting" @click="searDialogVisible=true"></span>
      </div>
      <!--小按钮结束-->
    </div>
    <el-table
      :data="tableData.data"
      :span-method="SpanMethod"
      :empty-text="tableData.emptyText"
       v-loading="tableData.loading"
      element-loading-text="拼命加载中"
      border
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      height="80%" style="width: 99%;margin: 0 auto;"
      :class="''+TableClass+''"
    >
      <el-table-column
        label="操作"
        v-if="(tableData.operate&&tableData.operate.length>0)&&(tableData.operatePositon&&tableData.operatePositon=='front')"
       >
        <template slot-scope="scope">
          <el-button @click="operateClick(data.click,scope.row)" :disabled="!scope.row[data.field]" size="mini" type="text"  v-for="data in tableData.operate" :key="data.name" v-if="data.type=='default'"> {{data.name}}</el-button>
          <el-button @click="operateClick(data.click,scope.row)"  :disabled="!scope.row[data.field]" type="text" size="mini"   v-for="data in tableData.operate" :key="data.name" v-if="data.type=='danger'">{{data.name}}</el-button>
        </template>
      </el-table-column>
      <!--v-bind:class="[(tableData.class&&tableData.class!='') ? tableData.class : 'table_Height']"-->
      <!--check多选框-->
      <el-table-column v-if="tableData.dragSort"
                       width="80" label="拖拽排序">
        <template slot-scope="scope">
          <drag :transfer-data="scope.row"   class="drag"  style="cursor: move;width: 100%;position: absolute;top: 0px;height: 40px;line-height: 40px;margin-left: -10px;">
            <i class="el-icon-menu" ></i>
            <div slot="image" class="drag-image" style="width: 100%;border-top: 1px solid #e91b24;overflow: hidden;background: #909399;height: 40px;line-height: 40px;width: 100%;opacity: 1 !important;">
              <ul>
                <li style="width: 30px;float: left"><i class="el-icon-menu" ></i></li>
                <li   v-if="data.show" :style="'float: left;list-style-type:none;width:'+ data.width+'px'" v-for="(data,index) in tableData.title" :key="index">{{scope.row[data.field]}}</li>
                <li  style="width: 50px;float: left" v-for="data in tableData.operate" :key="data.name">{{data.name}}</li>
              </ul>
            </div>
            <div style="position: absolute;width: 80px;top: 0px;">
              <drop @drop="handleDrop(scope.row, ...arguments)" class="event" style="height: 20px">

              </drop>
              <drop @drop="handleDropEnd(scope.row, ...arguments)" class="event" style="height: 20px">

              </drop>
            </div>
          </drag>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        v-if="tableData.Checkbox"
        width="60"

      >
      </el-table-column>
      <!--索引列-->
      <el-table-column
        :label="tableData.indexName"
        type="index"
        width="60"
        v-if="tableData.index"
      >
      </el-table-column>

      <el-table-column v-for="(data,index) in tableData.title"
                       :key="index"
                       :prop="data.field"
                       :label="data.name"
                       v-if="data.show"
                       :width="data.width"
                       :fixed="data.fixed"
                       :sortable="data.sortable"
                       :show-overflow-tooltip="data.showOverflowTooltip"
                       :align="data.align"
                       :headerAlign="data.headerAlign"
      >
        <el-table-column v-for="(da,index) in data.children" v-if="data.children"
                         :key="index"
                         :prop="da.field"
                         :label="da.name"
                         :width="da.width"
                         :fixed="da.fixed"
                         :sortable="da.sortable"
                         :show-overflow-tooltip="da.showOverflowTooltip"
                         :align="da.align"
                         :headerAlign="da.headerAlign"
        >
          <el-table-column v-for="(d,index) in da.children" v-if="da.children"
                           :key="index"
                           :prop="d.field"
                           :label="d.name"
                           :width="d.width"
                           :fixed="d.fixed"
                           :sortable="d.sortable"
                           :show-overflow-tooltip="d.showOverflowTooltip"
                           :align="d.align"
                           :headerAlign="d.headerAlign"
          >
          </el-table-column>
        </el-table-column>
      </el-table-column>


      <!--操作栏-->
      <el-table-column
        label="操作"
        v-if="(tableData.operate&&tableData.operate.length>0)&&(!tableData.operatePositon||tableData.operatePositon=='end')"
       >
        <template slot-scope="scope">
          <el-button @click="operateClick(data.click,scope.row)" :disabled="!scope.row[data.field]" size="mini" type="text"  v-for="data in tableData.operate" :key="data.name" v-if="data.type=='default'"> {{data.name}}</el-button>
          <el-button @click="operateClick(data.click,scope.row)"  :disabled="!scope.row[data.field]" type="text" size="mini"   v-for="data in tableData.operate" :key="data.name" v-if="data.type=='danger'">{{data.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <el-pagination
      v-if="tableData.pagination&&tableData.pagination.switch"
      background
      :page-sizes="tableData.pagination.pageSizes"
      :layout="tableData.pagination.layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="tableData.pagination.pageIndex+1" :page-size="tableData.pagination.pageSize" :total="tableData.pagination.total"
      class="tablePaging"
    >
    </el-pagination>
    <el-dialog title="全屏列表" :visible.sync="dialogTableVisible" :fullscreen="true" style="height: 100%" class="dialogTable">
      <el-table
        :data="tableData.data"
        :empty-text="tableData.emptyText"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%;overflow-y: auto"
      >
        <!--check多选框-->
        <el-table-column
          type="selection"
          v-if="tableData.Checkbox"
          width="60">
        </el-table-column>
        <!--索引列 -->
        <el-table-column
          :label="tableData.indexName"
          type="index"
          width="60"
          v-if="tableData.index"
        >
        </el-table-column>

        <el-table-column v-for="(data,index) in tableData.title"
                         :prop="data.field"
                         :key="index"
                         :label="data.name"
                         v-if="data.show"
                         :width="data.width"
                         :fixed="data.fixed"
                         :sortable="data.sortable"
                         :show-overflow-tooltip="data.showOverflowTooltip"
                         :align="data.align"
                         :headerAlign="data.headerAlign"
        >
        </el-table-column>
        <!--操作栏-->
        <el-table-column
          label="操作"
          v-if="tableData.buttons&&tableData.buttons.length>0"
          >
          <template slot-scope="scope">
            <el-button @click="operateClick(data.click,scope.row)" :disabled="!scope.row[data.field]" size="mini" type="text"  v-for="data in tableData.operate" :key="data.name" v-if="data.type=='default'"> {{data.name}}</el-button>
            <el-button @click="operateClick(data.click,scope.row)"  :disabled="!scope.row[data.field]" type="text" size="mini"   v-for="data in tableData.operate" :key="data.name" v-if="data.type=='danger'">{{data.name}}</el-button>

          </template>
        </el-table-column>
      </el-table>
      <!--分页栏-->
      <el-pagination
        v-if="tableData.pagination&&tableData.pagination.switch"
        background
        :page-sizes="tableData.pagination.pageSizes"
        :layout="tableData.pagination.layout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="tableData.pagination.pageIndex+1" :page-size="tableData.pagination.pageSize" :total="tableData.pagination.total"
        class="dialogPaging"
      >
      </el-pagination>
    </el-dialog>
    <el-dialog
      title="设置表格"
      :visible.sync="searDialogVisible"
      width="30%">
      <span>
        <el-checkbox-group v-model="fields" style="margin-top: 10px">
          <el-checkbox class="mode"  v-dragging="{ item: data, list: tableData.title, group: 'data'}" v-for="(data,index) in tableData.title" :label="data.field" :key="data.field">{{data.name}}</el-checkbox>
        </el-checkbox-group>
      </span>
      <span slot="footer" class="dialog-footer">
           <el-button @click="searDialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<style>
  #outer{
    border:solid 1px #dce0e1;
    border-radius:4px;
    padding:12px 20px;
    height:calc(100% - 73px);
    margin: 0 2px;
  }
  #floatR{
    float: right;margin-right: -14px;margin-top:-5px
  }
  #user{
    float: left;font-size: 18px;margin-bottom:16px;color:#a4aeb2;margin-left: 8px;
  }
  .tablePaging,.dialogPaging{text-align: right;margin-top: 10px}/*分页右对齐和上边界*/
  .mrcTable1{height: calc(100% - 80px) !important;}/*含有ToolBar和分页表格高度*/
  .mrcTable2{height: calc(100% - 38px) !important;}/*不含有ToolBar表格高度*/
  .mrcTable3{height: calc(100% - 1px) !important;}/*不含有分页表格高度*/
  .dialogTable .el-dialog__body,.dialogTable .el-table{height: calc(100% - 43px) !important}/*调整dialog内部分页位置*/
  .diaFull .el-dialog__body{height: calc(100% - 92px);}/*调整dialog高度*/
</style>
<style scoped>
  .mode:first-child {/*调整弹窗内部复选框对齐*/
    margin-left: 30px!important;
  }
</style>
<script>
  import language  from "../../language/language";
  export default {
    name: 'mrc-table',
    template:'<div><input type="text" type="text" v-model="tableData"/></div>',
    data() {
      return {
        dialogTableVisible:false,
        fullScreenName:language.fullScreen,
        searDialogVisible:false,//默认表格排序隐藏
        fields:[],//为checkbox绑定数据

      };
    },
    props: ['value'],
//    props: {
//      value:Array,
//    },
    methods:{
      handleDrop(toList, data) {
        let index=0;
        for (let i in this.tableData.data){
          if(this.tableData.data[i].sortId==data.sortId){
            index=i
          }
        }
        let _toList=Object.assign({}, toList);
        let _data=Object.assign({}, data);
        this.tableData.data.splice(index,1);
        let indexTo=this.tableData.data.indexOf(toList);
        //this.tableData.data.insert(indexTo,_data);
        this.tableData.data.splice(indexTo,0,_data);

      },
      handleDropEnd(toList, data){
        let index=0;
        for (let i in this.tableData.data){
          if(this.tableData.data[i].sortId==data.sortId){
            index=i
          }
        }

        let _toList=Object.assign({}, toList);
        let _data=Object.assign({}, data);
        this.tableData.data.splice(index,1);
        let indexTo=this.tableData.data.indexOf(toList);
        //this.tableData.data.insert(indexTo,_data);
        this.tableData.data.splice(indexTo+1,0,_data);
      },
      //Select框变化触发方法
      handleSelectionChange(val) {
        // this.multipleSelection = val;
        if(this.tableData.selectionChangeFn&&this.tableData.selectionChangeFn!=""){
          try{
            this.$parent[this.tableData.selectionChangeFn](val);
          }catch(err){
            this.$emit(this.tableData.selectionChangeFn,val);
          }
        }
      },
      sortChange(data){
        if(data){
          this.tableData.sortProp=data.prop;
          if(data.order=='ascending'){
            this.tableData.sortasc='asc'
          }else {
            this.tableData.sortasc='desc'
          }
        }
        try{
          this.$parent[this.tableData.sortChange]();
        }catch(err){
          this.$emit(this.tableData.sortChange);
        }
      },
      //当前页变化触发方法
      handleCurrentChange(val) {
        this.tableData.pagination.pageIndex = val-1;
        if (this.tableData.pagination.CurrentChangeFn && this.tableData.pagination.CurrentChangeFn != "") {
          try{
            this.$parent[this.tableData.pagination.CurrentChangeFn](val);
          }catch(err){
            this.$emit(this.tableData.pagination.CurrentChangeFn,val);
          }
        }
      },
      //当前页显示条数变化 触发方法
      handleSizeChange(val) {
        this.tableData.pagination.pageSize = val;
        if (this.tableData.pagination.CurrentChangeFn && this.tableData.pagination.CurrentChangeFn != "") {
          try {
            this.$parent[this.tableData.pagination.CurrentChangeFn](val);
          }catch(err){
            this.$emit(this.tableData.pagination.CurrentChangeFn,val);
          }
        }
      },
      //操作按钮触发方法
      operateClick(fn,data,){
        try {
          this.$parent[fn](data);
        }catch(err){
          this.$emit(this[fn],data);
        }
      },

      //点击保存按钮触发方法
      save(){
        this.searDialogVisible=false;
        console.log(this.fields);
        for(let showFalse of this.tableData.title){
          showFalse.show=false
        }
        for(let data of this.tableData.title){
          for(let field of this.fields){
            if(field==data.field){
              data.show=true
            }
          }
        }
      },
      SpanMethod({ row, column, rowIndex, columnIndex }){//20180521
        if(this.tableData.arraySpanMethodFn&&this.tableData.arraySpanMethodFn!="") {
          try {
            return this.$parent[this.tableData.arraySpanMethodFn]({row, column, rowIndex, columnIndex});
          }catch(err){
            this.$emit(this.tableData.arraySpanMethodFn,{row, column, rowIndex, columnIndex});
          }
        }
      },
      formatter(row, column) {
        return row.name;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },

    },
    mounted: function () {
      this.tableData = this.value;
      this.fields=[];
      for(let data of this.tableData.title){
        if(data.show==true){
          this.fields.push(data.field);
        }
      }
    },
    computed: {
      tableData: {
        // 动态计算currentValue的值
        get: function () {
          return this.value;
        },
        set: function (val) {
          this.$emit('input', val);
        }
      },
      sHeight() {
        if(this.tableData.hideToolbar){
          return 5
        }else {
          return this.$store.getters.sHeight;
        }
      },
      //调整不同情情况表格高度不同
      TableClass(){
        if(this.tableData.hideToolbar && (!this.tableData.pagination||!this.tableData.pagination.switch)){
          return "mrcTable3"
        }else if(!this.tableData.hideToolbar){
          return "mrcTable1"
        }else if(this.tableData.hideToolbar){
          return "mrcTable2"
        }
      },
    },

  };
</script>
