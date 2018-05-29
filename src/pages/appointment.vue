<template>
  <div class="content">

    <mrc-search-form v-model="formSearchData"></mrc-search-form>
    <span v-if="chartShow">
        <mrc-table v-model="tableData"></mrc-table>
        <mrc-dialog v-model="dialogView">
          <mrc-form v-model="formView"></mrc-form>
        </mrc-dialog>
    </span>
    <span v-if="!chartShow">
      <div style="border:solid 1px #dce0e1;border-radius:4px;padding:12px 28px;height:calc(100% - 73px);margin: 0 2px;">
        <div style="float: left;font-size: 18px;margin-bottom:16px;color:#a4aeb2;">会议室预约查询</div>
        <div style="float: right;margin-top:-5px;margin-right: 8px">
          <el-button type="text" icon="el-icon-circle-plus-outline" @click="goMeeting">发起会议</el-button>
          <el-button type="text" icon="el-icon-tickets" @click="listShow" style="margin-left: 4px;">列表显示</el-button>
        </div>
       <el-table
         border=""
         :data="tableDataChart.data"
         style="width: 100%">
          <el-table-column
            prop="MeetingRoomName"
            showOverflowTooltip
            label="会议室名称"
            width="200">
      </el-table-column>
     <el-table-column v-for="(data,index) in tableDataChart.title" :key="index" :prop="data.field" :label="data.name" v-if="data.show" :width="data.width" :fixed="data.fixed" :sortable="data.sortable" :show-overflow-tooltip="data.showOverflowTooltip" :align="data.align" :headerAlign="data.headerAlign">
       <template slot-scope="scope">
         <div style="width: 100%;height: 30px" v-if="scope.row[data.field]==1">
             <div style="width: 100%;background: red;height: 30px;cursor: pointer" @click="goView('id')"></div>
         </div>
         <div style="width: 100%;height: 30px" v-if="scope.row[data.field]==0.25">
             <div style="width: 25%;background: red;height: 30px;cursor: pointer;float: left" @click="goView('id')"></div>
            <div style="width: 75%;height: 30px;cursor: pointer;overflow: hidden;float: left" @click="goMeeting('id')"></div>
         </div>
         <div style="width: 100%;height: 30px" v-if="scope.row[data.field]==0.5">
             <div style="width: 50%;background: red;height: 30px;cursor: pointer;float: left" @click="goView('id')"></div>
            <div style="width: 50%;height: 30px;cursor: pointer;overflow: hidden;float: left" @click="goMeeting('id')"></div>
         </div>
         <div style="width: 100%;height: 30px" v-if="scope.row[data.field]==0.75">
             <div style="width: 75%;background: red;height: 30px;cursor: pointer;float: left" @click="goView('id')"></div>
            <div style="width: 25%;height: 30px;cursor: pointer;overflow: hidden;float: left" @click="goMeeting('id')"></div>
         </div>

         <div style="width: 100%;height: 30px;cursor: pointer" v-if="scope.row[data.field]==0" @click="goMeeting('id')"></div>
      </template>
     </el-table-column>
    </el-table>
    </div>
    </span>
  </div>
</template>
<script>
  import language  from "../language/language";
  import * as Api from "../api/api";
  export default {
    data(){
      return {
        chartShow:true,
        dialogView:{//点击查看弹出层数据
          show:false,//手否显示
          title:"查看",
          width:"40%",
          closeOnClickModal:true,
          beforeCloseFn:"beforeCloseFn",
          saveFn:"save",
          confirmButtonText:"确定", //确定名称
          cancelButtonText:language.cancel,   //取消名称
        },
        formView:{//点击查看弹出表单数据
          name:"form",
          labelWidth:100,
          title:[
            {type:'span',title:"发起人",field: "Creator"},
            {type:'span',title:"会议主题",field: "Subject"},
            {type:'span',title:"会议地点",field: "MeetingRoomId"},
            {type:'span',title:"与会人员",field: "MailCc"},
            {type:'span',title:"抄送人员",field: "MailTo"},
            {type:'span',title:"重要度",field: "Importance"},
            {type:'span',title:"开始时间",field: "StartTime"},
            {type:'span',title:"结束时间",field: "EndTime"},
            {type:'span',title:"会议内容",field: "Description"},
            {type:'span',title:"会议资料",field: "ContentInfo"},
          ],
          data:{//绑定弹出表单内容
            Creator:"",
            Subject:"",
            MeetingRoomId:"",
            MailCc:"",
            MailTo:"",
            Importance:"",
            StartTime:"",
            EndTime:"",
            Description:"",
            ContentInfo:""
          },
        },
        tableData:{
          description:"会议室预约查询",//表单左上角显示的文字
          pagination: {
            switch: true,//是否显示分页
            type: "default",
            CurrentChangeFn: "appointmentListData",
            pageSize: 10,//每页显示条目个数
            pageIndex: 1,//当前页数
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 40],
          },
          selectionChangeFn:"selectionChange",
          buttons:[{name:"发起会议",click:"goMeeting",icon:"el-icon-circle-plus-outline"},{name:"图表显示",click:"chartsShow",icon:"el-icon-tickets"}],
          operate:[{name:"查看",click:"viewData",type:'default',field:"MeetingRoomId"}],//表格操作按钮
          title: [//表格信息
            {name: "会议地点", field: "MeetingRoomId",width:"200",show:true,sortable:false,showOverflowTooltip:true,align:"left"},
            {name: "会议主题", field: "Subject",width:"280",show:true,sortable:false,showOverflowTooltip:true,align:"left"},
            {name: "开始时间", field: "StartTime",width:"",show:true,showOverflowTooltip:true,align:"left"},
            {name: "结束时间", field: "EndTime",width:"",show:true,sortable:false,showOverflowTooltip:true,align:"left"},
            {name: "发起人", field: "Creator",width:"",show:true,showOverflowTooltip:true,align:"left"},
            {name: "会议内容", field: "Description",width:"",show:false,showOverflowTooltip:true,align:"left"},
            {name: "会议资料", field: "ContentInfo",width:"",show:false,showOverflowTooltip:true,align:"left"},
            {name: "与会人员", field: "MailCc",width:"",show:false,showOverflowTooltip:true,align:"left"},
            {name: "抄送人员", field: "MailTo",width:"",show:false,showOverflowTooltip:true,align:"left"},
            {name: "重要度", field: "Importance",width:"",show:false,sortable:false,showOverflowTooltip:true,align:"left"},
          ],
          data: []//表格内部数据
        },
        tableDataChart:{
         description:"会议室预约查询",
         pagination: {
        switch: true,//是否显示分页
        type: "default",
        CurrentChangeFn: "getTableData",
        pageSize: 15,//每页显示条目个数
        pageIndex: 1,//当前页数
        layout: "total, sizes, prev, pager, next, jumper",
        pageSizes: [10, 20, 40],
      },//是否开启分页
      selectionChangeFn:"selectionChange",//Select框变化触发方法
      buttons:[{name:"发起会议",click:"addData",icon:"el-icon-circle-plus-outline"},{name:"列表显示",click:"listShow",icon:"el-icon-tickets"}],
      operate:[],
      title: [

        {name: "07:00", field: "time1",width:"",show:true,align:"left"},
        {name: "08:00", field: "time2",width:"",show:true,align:"left"},
        {name: "09:00", field: "time3",width:"",show:true,align:"left"},
        {name: "10:00", field: "time4",width:"",show:true,align:"left"},
        {name: "11:00", field: "time5",width:"",show:true,align:"left"},
        {name: "12:00", field: "time6",width:"",show:true,align:"left"},
        {name: "13:00", field: "time7",width:"",show:true,align:"left"},
        {name: "14:00", field: "time8",width:"",show:true,align:"left"},
        {name: "15:00", field: "time9",width:"",show:true,align:"left"},
        {name: "16:00", field: "time10",width:"",show:true,align:"left"},
        {name: "17:00", field: "time11",width:"",show:true,align:"left"},
        {name: "18:00", field: "time12",width:"",show:true,align:"left"},
        {name: "19:00", field: "time13",width:"",show:true,align:"left"},
        {name: "20:00", field: "time14",width:"",show:true,align:"left"},
        {name: "21:00", field: "time15",width:"",show:true,align:"left"},
      ],
      data: [
      ]
    },
        formSearchData:{
        labelWidth:100,
        buttons:{dataLeft:[{name:language.search,click:"search"}],dataRight:[]},//操作按钮
        title:[//默认显示的搜索内容
                 { type:'date',title:"会议室查看",field:"SectionNo"}
               ],
         data:{//绑定搜索栏数据
                "SectionNo":""
              }
    },
    }
  },
   methods: {
     goView(){
       this.$router.push({
         path: '/meet/applyView',
         query: { type: "appointment" }
       })
     },
    goMeeting(){
      this.$router.push({
        path: '/meet/apply',
        query: { type: "appointment" }
      })
    },
    selectionChange(){},
    addData(){
      alert('发起会议')
    },
    chartsShow(){
      this.chartShow=false;
    },
    listShow(){
      this.chartShow=true;
    },
    viewData(row){
      this.formView.data=row;
      this.dialogView.show=true;
    },
    search(){
      alert('搜索')
    },
    beforeCloseFn(){
      this.dialogView.show=false;
    },
    save(){
      this.dialogView.show=false;
    },
    appointmentListData(){//通过Mock接口获取"会议室预约查询"列表数据
      let param = {
        pageIndex: this.tableData.pagination.pageIndex,
        searchData:this.formSearchData.data.stell,
        pageSize: this.tableData.pagination.pageSize
      };
      Api.appointmentListData(param).then((res) => {
        this.tableData.data = res.data.data.content;
        this.tableData.pagination.total = res.data.data.totalPages;
      })
    },
    appointmentChartData(){//通过Mock接口获取"会议室预约查询"图表数据
      let param = {
        pageIndex: this.tableData.pagination.pageIndex,
        searchData:this.formSearchData.data.stell,
        pageSize: this.tableData.pagination.pageSize
      };
      Api.appointmentChartData(param).then((res) => {
        this.tableDataChart.data = res.data.data.content;
        this.tableDataChart.pagination.total = res.data.data.totalPages;
      })
    },
  },
    mounted: function () {
      this.appointmentListData();
      this.appointmentChartData();
      if( this.$route.query.type=="apply"){
        this.chartShow=false
      }else {
        this.chartShow=true
      }
    },
}
</script>
