﻿﻿<template>
  <div class="content">
    <table class="table">
      <thead>
      <tr>
        <th width="50">排序</th>
        <th :width="title.width" v-for="title in tableData.title">{{title.name}}</th>
      </tr>
      </thead>
      <tbody v-sortable="{ handle: '.handle' }">
      <tr   v-for="(data,index) in tableData.data" :key="index">
        <td style="text-align: center">
          <i class="el-icon-menu handle" style="cursor: move"></i>
        </td>
        <td v-for="title in tableData.title">{{data[title.field]}}</td>
      </tr>
      </tbody>

    </table>
  </div>
</template>
<style lang="scss" scoped>
  table{
    width: 100%;
  }
  tr{
    width: 100px;
  }
  td{
    border: 1px solid #f56c6c;
    height: 50px;
    line-height: 50px;
  }
  .table {
    width: 100%;
    border: 1px solid #d1dbe5; border-width: 1px 1px 0 0;
    border-collapse:collapse; border-spacing:0;

    th,td {
      height: 40px;
      padding: 0 10px;
      border: 1px solid #d1dbe5; border-width: 0 0 1px 1px;
      background-color: #fff;
      color: #1f2d3d; font-size: 14px; line-height: 24px;
      vertical-align: middle;
      text-align: left;
      //&.left {text-align: left;}
    }
    //tbody tr:hover td,
    th {
      background-color: #eef1f6;
    }
    .table--empty {color: #5e7382; line-height: 60px;}
  }
</style>
<script>
  import language  from "../../language/language";
  export default {
    name: 'mrc-table-drag',
    template:'<div><input type="text" type="text" v-model="tableData"/></div>',
    data() {
      return {
        fields:[],//为checkbox绑定数据
      };
    },
    props: ['value'],
    methods:{
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
      }
    },

  };
</script>
