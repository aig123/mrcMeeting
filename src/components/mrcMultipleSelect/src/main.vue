<template>
  <span>

  <el-button type="primary" size="small" @click="dialogVisible=true">选择人员</el-button>
  <el-dialog title="选择人员" :visible.sync="dialogVisible" width="770px">
      <span>
        <el-tabs type="card">
          <el-tab-pane v-if="multipleSelectDatas.firstTab" label="组织架构">
            <div style="max-height: 150px;overflow-y: auto;border: 1px solid #ebeef5;border-radius: 4px;" class="multiple-select">
              <el-select v-model="value8" filterable multiple placeholder="请选择" style="width: 100%">
                <el-option v-for="item in multipleSelectDatas.selectD.data" :key="item[multipleSelectDatas.selectD.keyField.key]" :label="item[multipleSelectDatas.selectD.keyField.name]" :value="item[multipleSelectDatas.selectD.keyField.key]">
                </el-option>
              </el-select>
            </div>
            <div style="border: 1px solid #ebeef5;border-radius: 4px;margin-top: 20px">
              <el-tree ref="tree3" @check="handleCheckChange" :data="multipleSelectDatas.treeD.data" show-checkbox :node-key="multipleSelectDatas.treeD.nodeKey" :props="multipleSelectDatas.treeD.defaultProps" default-expand-all :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data1 }">
                  <span>
                    <img src="./assets/person_icon.png" width="22" style="margin-right:4px">{{ node.label }} </span>
                </span>
              </el-tree>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="multipleSelectDatas.secondTab" label="人员搜索">
            <div style="max-height: 150px;overflow-y: auto;border: 1px solid #ebeef5;border-radius: 4px;" class="multiple-select">
              <el-select v-model="value8" filterable multiple placeholder="请选择" style="width: 100%">
               <el-option v-for="item in multipleSelectDatas.selectD.data" :key="item[multipleSelectDatas.selectD.keyField.key]" :label="item[multipleSelectDatas.selectD.keyField.name]" :value="item[multipleSelectDatas.selectD.keyField.key]">
                </el-option>
              </el-select>
            </div>
            <div style="border: 1px solid rgb(235, 238, 245);border-radius: 4px;margin-top: 20px;width: 100%;">
              <slot></slot>
              <el-table :data="multipleSelectDatas.tableData.data" style="width: 100%"  @select="selectionChange" @select-all="selectionChange" ref="multipleTable" border>
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column v-for="(data,index) in multipleSelectDatas.tableData.title" :key="index" :prop="data.field" :label="data.name" v-if="data.show" :width="data.width" :fixed="data.fixed" :sortable="data.sortable" :show-overflow-tooltip="data.showOverflowTooltip" :align="data.align" :headerAlign="data.headerAlign">
                 </el-table-column>
              </el-table>
               <el-pagination
                 style="float: right;margin-top: 10px"
                 v-if="multipleSelectDatas.tableData.pagination.switch"
                 background
                 :page-sizes="multipleSelectDatas.tableData.pagination.pageSizes"
                 :layout="multipleSelectDatas.tableData.pagination.layout"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange" :current-page="multipleSelectDatas.tableData.pagination.pageIndex" :page-size="multipleSelectDatas.tableData.pagination.pageSize" :total="multipleSelectDatas.tableData.pagination.total"
                 class="dialogPaging"
               >
      </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cleanPeople">清 空</el-button>
        <el-button type="primary" @click="savePeople">确 定</el-button>
      </span>
  </el-dialog>
  </span>

</template>
<script>

  export default {
    name: 'mrc-multiple-select',
    template:'<div><input type="text" type="text" v-model="people"/></div>',
    data() {
      return {
        dialogVisible:false,
        value8:""
      };
    },
    props: ['value',"treeD","selectD","tableData","formData"],
    methods:{
      savePeople(){
        this.multipleSelectDatas.data.splice(0,this.multipleSelectDatas.data.length);
        for (let val of this.value8){
          for (let option of this.multipleSelectDatas.selectD.data){
            if(val==option.id){
              this.multipleSelectDatas.data.push(option)
            }
          }
        }
        this.dialogVisible = false;
      },
      cleanPeople(){
        this.multipleSelectDatas.data=[];
        this.value8=[];
      },
      handleCheckChange(data, checked, indeterminate) {
        //树形菜单改变回调
        this.value8 = [];
        for (let key of this.$refs.tree3.getCheckedKeys()) {
          for (let option of this.multipleSelectDatas.selectD.data) {
            if (key == option.id) {
              this.value8.push(key);
            }
          }
        }
        //this.value8=this.$refs.tree2.getCheckedKeys()
      },
      selectionChange(datas) {
        this.value8 = [];
        for (let data of datas) {
          this.value8.push(data.id);
        }
      },
      //当前页变化触发方法
      handleCurrentChange(val) {
        this.multipleSelectDatas.tableData.pagination.pageIndex = val;
        if (this.multipleSelectDatas.tableData.pagination.CurrentChangeFn && this.multipleSelectDatas.tableData.pagination.CurrentChangeFn != "") {
          try{
            this.$parent[this.multipleSelectDatas.tableData.pagination.CurrentChangeFn](val);
          }catch(err){
            this.$emit(this.multipleSelectDatas.tableData.pagination.CurrentChangeFn,val);
          }
        }
      },
      //当前页显示条数变化 触发方法
      handleSizeChange(val) {
        this.multipleSelectDatas.tableData.pagination.pageSize = val;
        if (this.multipleSelectDatas.tableData.pagination.CurrentChangeFn && this.multipleSelectDatas.tableData.pagination.CurrentChangeFn != "") {
          try{
            this.$parent[this.multipleSelectDatas.tableData.pagination.CurrentChangeFn](val);
          }catch(err){
            this.$emit(this.multipleSelectDatas.tableData.pagination.CurrentChangeFn,val);
          }
        }
      },
    },
    mounted: function () {
      this.multipleSelectDatas = this.value;
    },
    watch: {
      value8(curVal, oldVal) {
        var rows = [];
        this.$refs.multipleTable.clearSelection();
        for (let cur of curVal) {
          for (let index in this.multipleSelectDatas.tableData.data) {
            if (cur == this.multipleSelectDatas.tableData.data[index].id) {
              rows.push(this.multipleSelectDatas.tableData.data[index]);
            }
          }
        }
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
        this.$refs.tree3.setCheckedKeys(curVal);
      },
    },
    computed: {
      multipleSelectDatas: {
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
  .el-transfer-panel {
    width: 300px;
  }

  .multiple-select input {
    border: 0;
  }

  .el-select__tags > span {
    display: inline-block;
    width: auto;
  }
</style>
