﻿﻿<template>
  <section  id="outer">
    <el-table
      :data="tableData.data"
      :span-method="SpanMethod"
      :empty-text="tableData.emptyText"
      border
      @selection-change="handleSelectionChange"
      height="80%" style="width: 99%;margin: 0 auto;"
      :class="''+TableClass+''"
    >
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
        v-if="tableData.buttons&&tableData.operate.length>0"
        width="150">
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
      @current-change="handleCurrentChange" :current-page="tableData.pagination.pageIndex" :page-size="tableData.pagination.pageSize" :total="tableData.pagination.total"
      class="tablePaging"
    >
    </el-pagination>
  </section>
</template>
<style scoped>
  #outer{
    height: 100%;
    border:none;
    padding:8px 0;
  }
  .tablePaging,.dialogPaging{text-align: right;margin-top: 10px}/*分页右对齐和上边界*/
  .mrcTable1{height:calc(100% - 44px) !important;}/*含有分页表格高度*/
  .mrcTable2{height:100% !important;}/*不含分页表格高度*/
  .dialogTable .el-dialog__body,.dialogTable .el-table{height: calc(100% - 43px) !important}/*调整dialog内部分页位置*/
  .mode:first-child {/*调整弹窗内部复选框对齐*/
    margin-left: 30px!important;
  }
</style>
<style>
  .diaFull .el-dialog__body{height: calc(100% - 92px);}/*调整dialog高度*/
</style>
<script>
  import language  from "../../language/language";
  export default {
    name: 'mrc-table-simple',
    template:'<div><input type="text" type="text" v-model="tableData"/></div>',
    data() {
      return {
        dialogTableVisible:false,
        searDialogVisible:false,//默认表格排序隐藏

      };
    },
    props: ['value'],
//    props: {s
//      value:Array,
//    },
    methods:{
      SpanMethod({ row, column, rowIndex, columnIndex }){
        if(this.tableData.arraySpanMethodFn&&this.tableData.arraySpanMethodFn!="") {
          try {
            return this.$parent[this.tableData.arraySpanMethodFn]({row, column, rowIndex, columnIndex});
          }catch(err){
            this.$emit(this.tableData.arraySpanMethodFn,{row, column, rowIndex, columnIndex});
          }
        }
      },
      //Select框变化触发方法
      handleSelectionChange(val) {
        if(this.tableData.selectionChangeFn&&this.tableData.selectionChangeFn!=""){
          try{
            this.$parent[this.tableData.selectionChangeFn](val);
          }catch(err){
            this.$emit(this.tableData.selectionChangeFn,val);
          }
        }
      },
      //当前页变化触发方法
      handleCurrentChange(val) {
        this.tableData.pagination.pageIndex = val;
        if (this.tableData.pagination.CurrentChangeFn && this.tableData.pagination.CurrentChangeFn != "") {
          try {
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
        try{
          this.$parent[fn](data);
        }catch(err){
          this.$emit(this[fn],data);
        }
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },

    },
    mounted: function () {
      this.tableData = this.value;
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
      //调整不同情情况表格高度不同
      TableClass(){
        if(this.tableData.pagination.switch){
          return "mrcTable1"
        }else{
          return "mrcTable2"
        }
      },
    },

  };
</script>
