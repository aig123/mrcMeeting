<template>
  <div class="content">
    <mrc-search-form v-model="formSearchData"></mrc-search-form>
    <mrc-table v-model="tableData"></mrc-table>
    <mrc-dialog v-model="dialogView">
      <mrc-form v-model="formView"></mrc-form>
    </mrc-dialog>
  </div>
</template>
<script>
  import language  from "../language/language";
  import * as Api from "../api/api";
  export default {
    data(){
      return {
        tableData:{
          description:"我的会议管理",//表单左上角显示的文字
          sortChange:"myManagerData",
          sortProp:"",
          sortasc:"",
          pagination: {
            switch: true,//是否显示分页
            type: "default",
            CurrentChangeFn: "myManagerData",
            pageSize: 10,//每页显示条目个数
            pageIndex: 1,//当前页数
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 40],
          },//是否开启分页
          selectionChangeFn:"",//Select框变化触发方法
          buttons:[],
          operate:[{name:"修改会议",click:"viewData",type:'default',field:"edit"},
                    {name:"取消会议",click:"viewData",type:'default',field:"cancel"},
                    {name:"上传会议纪要",click:"viewData",type:'default',field:"upload"}
                    ],//表格操作按钮
          title: [//表格信息
            {name: "开始时间", field: "StartTime",show:true,align:"left",sortable:'custom'},
            {name: "会议主题", field: "Name",show:true,showOverflowTooltip:true,align:"left",sortable:'custom',width:'600'},
            {name: "会议地点", field: "Orgnization",show:true,align:"left",sortable:'custom'},
            {name: "重要度", field: "MeetingTypeName",show:true,align:"left",sortable:'custom',width:"100"},
            {name: "状态", field: "MeetingStatusName",show:true,align:"left",sortable:'custom',width:"100"},
          ],
          data: []//表格内部数据
        },
        formSearchData:{
          labelWidth:80,
          buttons:{dataLeft:[{name:language.search,click:"search"}]},//操作按钮
          title:[//默认显示的搜索内容
            {type:'date',title:"会议查询",field:"stell"}
          ],
          data:{//绑定搜索栏数据
            "stell":""
          }
        },
        dialogView:{//点击查看弹出层数据
          show:false,//手否显示
          title:"查看",
          width:"40%",
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
      }
    },
    methods: {
      myManagerData(){
        let param = {
          page: this.tableData.pagination.pageIndex,
          data:{"StartTime":"2018-01-29","StartTimeEnd":"","Subject":"","EmployeeID":"","Name":""},
          pageSize: this.tableData.pagination.pageSize,
          sort:this.tableData.sortProp,
          sortasc:this.tableData.sortasc
        };
        this.tableData.loading=true;
        Api.myManagerData(param).then((res) => {
          this.tableData.loading=false
          if(res.data.success){
            this.tableData.data = res.data.data.data;
            this.tableData.pagination.total = res.data.data.count;
          }
          console.log(this.tableData.loading);
        })
      },
      viewData(row){
        this.formView.data=row;
        this.dialogView.show=true;
      },
      search(){
        this.myManagerData();
      },
      beforeCloseFn(){
        this.dialogView.show=false;
      },
      save(){
        this.dialogView.show=false;
      }
    },
    mounted: function () {
      this.myManagerData();
    },
  }
</script>
