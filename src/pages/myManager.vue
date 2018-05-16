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
  export default {
    data(){
      return {
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
          description:"我的会议管理",//表单左上角显示的文字
          pagination: {
            switch: true,//是否显示分页
            type: "default",
            CurrentChangeFn: "getTableData",
            pageSize: 15,//每页显示条目个数
            pageIndex: 1,//当前页数
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 40],
          },//是否开启分页
          selectionChangeFn:"",//Select框变化触发方法
          buttons:[],
          operate:[{name:"操作",click:"viewData",type:'default',field:"StartTime"}],//表格操作按钮
          title: [//表格信息
            {name: "开始时间", field: "StartTime",width:"",show:true,sortable:false,showOverflowTooltip:true},
            {name: "会议主题", field: "Subject",width:"880",show:true,sortable:false,showOverflowTooltip:true},
            {name: "会议地点", field: "MeetingRoomId",width:"",show:true,showOverflowTooltip:true},
            {name: "重要度", field: "Importance",width:"",show:true,sortable:false,showOverflowTooltip:true},
            {name: "状态", field: "MeetingStatus",width:"",show:true,sortable:false,showOverflowTooltip:true},
            {name: "结束时间", field: "EndTime",show:false,showOverflowTooltip:true},
            {name: "发起人", field: "Creator",show:false,showOverflowTooltip:true},
            {name: "会议内容", field: "Description",show:false,showOverflowTooltip:true},
            {name: "会议资料", field: "ContentInfo",show:false,showOverflowTooltip:true},
            {name: "与会人员", field: "MailCc",show:false,showOverflowTooltip:true},
            {name: "抄送人员", field: "MailTo",show:false,showOverflowTooltip:true},
          ],
          data: [
            {
              "StartTime":"2017/01/16 15:00",
              "Subject":"财务组工作总结汇报",
              "MeetingRoomId":"301会议室",
              "Importance":"重要",
              "MeetingStatus":"已批准",
              "EndTime":"2018/05/15 17:30",
              "Creator":"jingwen.xu",
              "Description":"会议内容1",
              "ContentInfo":"会议资料1",
              "MailCc":"与会人员1",
              "MailTo":"抄送人员1"
            },
            {
              "StartTime":"2017/01/20 09:00",
              "Subject":"集团人事系统交流",
              "MeetingRoomId":"503会议室",
              "Importance":"重要",
              "MeetingStatus":"已批准",
              "EndTime":"2018/05/15 17:30",
              "Creator":"qina_mao",
              "Description":"会议内容2",
              "ContentInfo":"会议资料2",
              "MailCc":"与会人员2",
              "MailTo":"抄送人员2"
            },
            {
              "StartTime":"2017/01/20 13:30",
              "Subject":"meeting",
              "MeetingRoomId":"503会议室",
              "Importance":"重要",
              "MeetingStatus":"已批准",
              "EndTime":"2018/05/15 17:30",
              "Creator":"qina_mao",
              "Description":"会议内容3",
              "ContentInfo":"会议资料3",
              "MailCc":"与会人员3",
              "MailTo":"抄送人员3"
            },
            {
              "StartTime":"2017/03/27 13:00",
              "Subject":"HR平台系统交流会",
              "MeetingRoomId":"503会议室",
              "Importance":"重要",
              "MeetingStatus":"已批准",
              "EndTime":"2018/05/15 17:30",
              "Creator":"jingwen.xu",
              "Description":"会议内容4",
              "ContentInfo":"会议资料4",
              "MailCc":"与会人员4",
              "MailTo":"抄送人员4"
            },
            {
              "StartTime":"2017/03/28 10:00",
              "Subject":"移动应用会议",
              "MeetingRoomId":"503会议室",
              "Importance":"重要",
              "MeetingStatus":"已批准",
              "EndTime":"2018/05/15 17:30",
              "Creator":"jingwen.xu",
              "Description":"会议内容5",
              "ContentInfo":"会议资料5",
              "MailCc":"与会人员5",
              "MailTo":"抄送人员5"
            },
          ]//表格内部数据
        },
        formSearchData:{
          labelWidth:100,
          buttons:{dataLeft:[{name:language.search,click:"search"}],dataRight:[]},//操作按钮
          title:[//默认显示的搜索内容
            {type:'date',title:"会议查询",field:"SectionNo"}
          ],
          moreTitle:[//点击更多显示的搜索内容
            {type:'date',title:"会议查询",field:"SectionNo"}
          ],
          data:{//绑定搜索栏数据
            "SectionNo":""
          }
        },
      }
    },
    methods: {
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
      }
    }
  }
</script>
