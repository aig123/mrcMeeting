<template>
  <div class="content">
    <mrc-search-form v-model="formSearchData"></mrc-search-form>
    <mrc-table v-model="tableData"></mrc-table>
    <mrc-dialog v-model="addDialogData">
      <mrc-form v-model="addFormData" ref="addMrcForm"></mrc-form>
    </mrc-dialog>
    <mrc-dialog v-model="editDialogData">
      <mrc-form v-model="editFormData" ref="editMrcForm"></mrc-form>
    </mrc-dialog>
  </div>
</template>
<script>
  import language  from "../language/language";
  export default {
    data(){
      return {
        addFormData:{
          name:"form",
          title:[
            {type:'input',title:"会议室名称",value:"",field: "MeetingRoomId",placeholder:"会议室名称"},
            {type:'select',title:"所属",value:"",field: "DepartmentNo",datafield: {key: "name", value: "id"},data: [{id: 1, name: "管理服务部"}, {id: 2, name: "--组织与流程科"}, {id: 3, name: "--营销与服务开发科"}, {id: 4, name: "--IT生产与系统支持部"}, {id: 5, name: "----生产与质保开发科"}, {id: 6, name: "------生产与质保开发科青岛（临时R3组）"}, {id: 7, name: "------生产与质保开发科天津（临时R3组）"}, {id: 8, name: "----IT基础设施科"}, {id: 9, name: "----成都流程与IT室（组）"}, {id: 10, name: "----佛山流程与IT科"}, {id: 11, name: "----青岛流程与IT（临时R3组）"}, {id: 12, name: "----天津流程与IT（临时R3组）"}, {id: 13, name: "--战略规划组"}, {id: 14, name: "--互联应用开发科"}, {id: 15, name: "--创新与数据实验室"}]},
            {type:'select',title:"类型",value:"",field: "RoomType",datafield: {key: "name", value: "id"},data: [{id: 1, name: "Common"}, {id: 2, name: "Advanced"}]},
            {type: 'checkbox', title: "是否公用", value: "", field: "IsPublic",key: {label: "name", value: "id"},data: [{id: 1, name: "该会议室全公司可选"}]},
            {type:'textarea',title:"会议室说明",value:"",field: "Description",placeholder:"会议室说明"},
          ],
          data:{
            MeetingRoomId:"",
            DepartmentNo:"",
            RoomType:"",
            IsPublic:"",
            Description:""
          },
          rules: {
            MeetingRoomId: [
              { required: true, message: '请输入会议室名称', trigger: 'blur' }
            ],
            DepartmentNo: [
              { required: true, message: '请选择所属', trigger: 'change' }
            ],
            RoomType: [
              {required: true, message: '请选择类型', trigger: 'change' }
            ],
            IsPublic: [
              { required: false, message: '', trigger: 'change' }
            ],
            Description: [
              { required: false, message: '', trigger: 'change' }
            ]
          }
        },
        editFormData:{
          name:"form",
          title:[
            {type:'input',title:"会议室名称",value:"",field: "MeetingRoomId",placeholder:"会议室名称"},
            {type:'select',title:"所属",value:"",field: "DepartmentNo",datafield: {key: "name", value: "id"},data: [{id: 1, name: "管理服务部"}, {id: 2, name: "--组织与流程科"}, {id: 3, name: "--营销与服务开发科"}, {id: 4, name: "--IT生产与系统支持部"}, {id: 5, name: "----生产与质保开发科"}, {id: 6, name: "------生产与质保开发科青岛（临时R3组）"}, {id: 7, name: "------生产与质保开发科天津（临时R3组）"}, {id: 8, name: "----IT基础设施科"}, {id: 9, name: "----成都流程与IT室（组）"}, {id: 10, name: "----佛山流程与IT科"}, {id: 11, name: "----青岛流程与IT（临时R3组）"}, {id: 12, name: "----天津流程与IT（临时R3组）"}, {id: 13, name: "--战略规划组"}, {id: 14, name: "--互联应用开发科"}, {id: 15, name: "--创新与数据实验室"}]},
            {type:'select',title:"类型",value:"",field: "RoomType",datafield: {key: "name", value: "id"},data: [{id: 1, name: "Common"}, {id: 2, name: "Advanced"}]},
            {type: 'checkbox', title: "是否公用", value: "", field: "IsPublic",key: {label: "name", value: "id"},data: [{id: 1, name: "该会议室全公司可选"}]},
            {type:'textarea',title:"会议室说明",value:"",field: "Description",placeholder:"会议室说明"},
          ],
          data:{
            MeetingRoomId:"",
            DepartmentNo:"",
            RoomType:"",
            IsPublic:"",
            Description:""
          },
          rules: {
            MeetingRoomId: [
              { required: true, message: '请输入会议室名称', trigger: 'blur' }
            ],
            DepartmentNo: [
              { required: true, message: '请选择所属', trigger: 'change' }
            ],
            RoomType: [
              {required: true, message: '请选择类型', trigger: 'change' }
            ],
            IsPublic: [
              { required: false, message: '', trigger: 'change' }
            ],
            Description: [
              { required: false, message: '', trigger: 'change' }
            ]
          }
        },
        addDialogData:{
          show:false,
          title:language.add,
          width:"40%",
          closeOnClickModal:true,
          beforeCloseFn:"beforeCloseFn",
          saveFn:"addSave",
          confirmButtonText:language.save,
          cancelButtonText:language.cancel
        },
        editDialogData:{
          show:false,
          title:"修改",
          width:"40%",
          closeOnClickModal:true,
          beforeCloseFn:"beforeCloseFn",
          saveFn:"editSave",
          confirmButtonText:language.save,
          cancelButtonText:language.cancel
        },
        tableData:{
          description:"会议室管理",
          pagination: {
            switch: true,
            type: "default",
            CurrentChangeFn: "getTableData",
            pageSize: 15,
            pageIndex: 1,
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 40],
          },
          selectionChangeFn:"",
          buttons:[{name:"增加会议室",click:"addData",icon:"el-icon-circle-plus-outline"}],
          operate:[{name:"修改",click:"edit",type:'default',field:"MeetingRoomId"},{name:"删除",click:"del",type:'default',field:"DepartmentNo"}],//表格操作按钮
          title: [//表格信息
            {name: "会议室", field: "MeetingRoomId",width:"",show:true,showOverflowTooltip:true},
            {name: "所属", field: "DepartmentNo",width:"",show:true,showOverflowTooltip:true},
            {name: "类型", field: "RoomType",width:"",show:true,showOverflowTooltip:true},
            {name: "是否公用", field: "IsPublic",width:"",show:true,showOverflowTooltip:true},
            {name: "会议室说明", field: "Description",width:"",show:false,showOverflowTooltip:true},
          ],
          data: [
            {
              "MeetingRoomId":"104培训室",
              "DepartmentNo":"管理服务部",
              "RoomType":"Advanced",
              "IsPublic":"False",
              "Description":"会议室说明1"
            },
            {
              "MeetingRoomId":"301会议室",
              "DepartmentNo":"管理服务部",
              "RoomType":"Common",
              "IsPublic":"False",
              "Description":"会议室说明2"
            },
            {
              "MeetingRoomId":"305会议室",
              "DepartmentNo":"管理服务部",
              "RoomType":"Common",
              "IsPublic":"False",
              "Description":"会议室说明3"
            },
            {
              "MeetingRoomId":"310会议室",
              "DepartmentNo":"管理服务部",
              "RoomType":"Common",
              "IsPublic":"False",
              "Description":"会议室说明4"
            },
            {
              "MeetingRoomId":"407会议室",
              "DepartmentNo":"管理服务部",
              "RoomType":"Common",
              "IsPublic":"False",
              "Description":"会议室说明5"
            },
          ]
        },
        formSearchData:{
          buttons:{dataLeft:[{name:language.search,click:"search"}],dataRight:[]},
          title:[
            {type:'select',title:"所属",change:"gradeChange",datafield:{key:"name",value:"id"},data:[{id:1,name:"管理服务部"}],field:"DepartmentNo"}
          ],
          moreTitle:[
            {type:'select',title:"所属",change:"gradeChange",datafield:{key:"name",value:"id"},data:[{id:1,name:"管理服务部"}],field:"DepartmentNo"}
          ],
          data:{
            "DepartmentNo":""
          }
        },
      }
    },
    methods: {
      edit(row){
        this.editFormData.data=row;
        this.editDialogData.show=true;
      },
      del(row){
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      addSave(){
        this.$refs['addMrcForm'].$refs[this.addFormData.name].validate((valid) => {
          if (valid) {
            let param = this.addFormData.data;
           // Api.addTable(param).then((res) => {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success'
              });
              this.addDialogData.show=false;
          } else {
            return false;
          }
        });
      },
      editSave(){
        this.$refs['editMrcForm'].$refs[this.editFormData.name].validate((valid) => {
          if (valid) {
            let param = this.editFormData.data;
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success'
            });
            this.editDialogData.show=false;
          } else {
            return false;
          }
        });
      },
      addData(){
        this.addDialogData.show=true;
      },
      gradeChange(){

      },
      search(){
        alert('搜索')
      },
      beforeCloseFn(){
        this.addDialogData.show=false;
        this.editDialogData.show=false;
      },
    }
  }
</script>
