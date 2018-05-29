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
  import * as Api from "../api/api";
  export default {
    data(){
      return {
        tableData:{
          description:"会议室管理",
          sortChange:"roomManagerData",
          sortProp:"",
          sortasc:"",
          loading:false,
          pagination: {
            switch: true,
            type: "default",
            CurrentChangeFn: "roomManagerData",
            pageSize: 10,
            pageIndex: 0,
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 40],
          },
          selectionChangeFn:"",
          buttons:[{name:"增加会议室",click:"addData",icon:"el-icon-circle-plus-outline"}],
          operate:[{name:"修改",click:"edit",type:'default',field:"edit"},{name:"删除",click:"delData",type:'default',field:"del"}],//表格操作按钮
          title: [//表格信息
            {name: "会议室", field: "Name",show:true,showOverflowTooltip:true,align:"left",sortable:'custom',width:"600"},
            {name: "所属", field: "Orgnization",show:true,align:"left",sortable:'custom'},
            {name: "类型", field: "RoomTypeName",show:true,align:"left",sortable:'custom'},
            {name: "是否公用", field: "IsPublicName",show:true,align:"left",sortable:'custom'},
          ],
          data: []
        },
        formSearchData:{
          labelWidth:120,
          buttons:{dataLeft:[{name:language.search,click:"search"}]},
          title:[
            {type:'select',title:"管理组织结构",change:"ownTo",datafield:{key:"name",value:"id"},data:[],field:"DepartmentNo"}
          ],
          data:{
            "DepartmentNo":""
          }
        },
        addFormData:{
          name:"form",
          labelWidth:100,
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
          labelWidth:100,
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
          beforeCloseFn:"beforeCloseAddFn",
          saveFn:"addSave",
          confirmButtonText:language.save,
          cancelButtonText:language.cancel
        },
        editDialogData:{
          show:false,
          title:"修改",
          width:"40%",
          beforeCloseFn:"beforeCloseEditFn",
          saveFn:"editSave",
          confirmButtonText:language.save,
          cancelButtonText:language.cancel
        },

      }
    },
    methods: {
      roomManagerData(){
        let param = {
          page: this.tableData.pagination.pageIndex,
          data:{"DepartmentNo":this.formSearchData.data.DepartmentNo,"EmployeeID":"eap_admin"},
          pageSize: this.tableData.pagination.pageSize,
          sort:this.tableData.sortProp,
          sortasc:this.tableData.sortasc
        };
        this.tableData.loading=true
        Api.roomManagerData(param).then((res) => {
          this.tableData.loading=false
          this.tableData.data = res.data.data.data;
          this.tableData.pagination.total = res.data.data.count;
        })
      },
      getDepartment(){
        let param = ['eap_admin']
        Api.getDepartment(param).then((res) => {
          this.formSearchData.title[0].data = res.data.data;
          this.formSearchData.title[0].data.splice(0, 0, {id:"",name:"全部"})
        })
      },
      edit(row){
        this.editFormData.data=row;
        this.editDialogData.show=true;
      },
      delData(data){
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param={};
          param.id=data.id;
          Api.roomManagerDel(param).then((res) => {
            console.log(res.data);
            this.$message({
              type: res.data.result,
              message: res.data.messages[0]
            });
            this.roomManagerData();
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      addSave(){//新增点击保存回调函数
        this.$refs['addMrcForm'].$refs[this.addFormData.name].validate((valid) => {
          if (valid) {
            let param = this.addFormData.data;
            Api.roomManagerAdd(param).then((res) => {
                this.$notify({
                  title: res.data.title,
                  message:res.data.messages[0],
                  type: res.data.result
                });
                this.addDialogData.show=false;
                this.roomManagerData();
              }
            )
          } else {
            return false;
          }
        });
      },
      // editSave(){
      //   this.$refs['editMrcForm'].$refs[this.editFormData.name].validate((valid) => {
      //     if (valid) {
      //       let param = this.editFormData.data;
      //       this.$notify({
      //         title: '成功',
      //         message: '保存成功',
      //         type: 'success'
      //       });
      //       this.editDialogData.show=false;
      //     } else {
      //       return false;
      //     }
      //   });
      // },
      editSave(){
        this.$refs['editMrcForm'].$refs[this.editFormData.name].validate((valid) => {
          if (valid) {
            let param = this.editFormData.data;
            Api.roomManagerEdit(param).then((res) => {
              this.$notify({
                title: res.data.title,
                message:res.data.messages[0],
                type: res.data.result
              });
              this.editDialogData.show=false;
              this.roomManagerData();
            })
          }else {
            return false;
          }
        });
      },
      addData(){
        this.addFormData.data={};
        this.addDialogData.show=true;
      },
      ownTo(){
        console.log("值改变");
      },
      search(){
        this.roomManagerData();
      },
    beforeCloseAddFn(){
      this.addDialogData.show=false;
    },
    beforeCloseEditFn(){
      this.editDialogData.show=false;
    },
    },mounted: function () {
      this.roomManagerData();
      this.getDepartment();
    },
  }
</script>
