<template>
  <div class="content">
    <el-form :model="form" ref="form" label-width="75px" class="demo-ruleForm" style="max-width: 900px;">
      <el-form-item label="会议类型" prop="name">
        <el-radio-group v-model="form.MeetingType">
          <el-radio :label="1">普通会议</el-radio>
          <el-radio :label="2">重要会议</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="预订方式" prop="applyType">
        <el-radio-group v-model="form.applyType">
          <el-radio :label="1">按时间预订</el-radio>
          <el-radio :label="2">按会议室预订</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="预定时间" prop="BookDate">
        <el-date-picker v-model="form.BookDate" type="date" placeholder="选择日期">
        </el-date-picker>
        <el-time-select placeholder="起始时间" v-model="form.StartTime" :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }">
        </el-time-select>
        <el-time-select placeholder="结束时间" v-model="form.EndTime" :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30',
        }">
        </el-time-select>
      </el-form-item>
      <el-form-item label="会议室" prop="MeetingRoomId">
        <el-select v-model="form.MeetingRoomId">
          <el-option key="1" value="1" label="301会议室"></el-option>
          <el-option key="2" value="2" label="302会议室"></el-option>
        </el-select>
        <el-button>301会议室</el-button>
      </el-form-item>
      <el-form-item label="参会人员" prop="MailCc">
        <el-tag style="margin-left: 10px" v-for="peo in attendPeople.data" :key="peo.id">{{peo.label}}</el-tag>
        <mrc-multiple-select v-model="attendPeople" @getTableData="getTableData">
        <el-form :inline="true" :model="attendPeople.formData" class="demo-form-inline" style="margin-top: 0px;margin-bottom: -20px;height: 60px">
          <el-form-item label="" style="margin-left: 3px">
            <el-input v-model="attendPeople.formData.user" placeholder="" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="" size="small">搜索</el-button>
          </el-form-item>
        </el-form>
      </mrc-multiple-select>
      </el-form-item>
      <el-form-item label="抄送人员" prop="MailTo">
        <el-tag style="margin-left: 10px" v-for="peo in multipleSelectDatas.data" :key="peo.id">{{peo.label}}</el-tag>
        <mrc-multiple-select v-model="multipleSelectDatas" @getTableData="getTableData">
          <el-form :inline="true" :model="multipleSelectDatas.formData" class="demo-form-inline" style="margin-top: 0px;margin-bottom: -20px;height: 60px">
            <el-form-item label="" style="margin-left: 3px">
              <el-input v-model="multipleSelectDatas.formData.user" placeholder="" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="" size="small">搜索</el-button>
            </el-form-item>
          </el-form>
        </mrc-multiple-select>
      </el-form-item>
      <el-form-item label="会议主题" prop="Subject">
        <el-input placeholder="请填写会议主题" v-model="form.Subject">
        </el-input>
      </el-form-item>
      <el-form-item label="会议资料" prop="ContentInfo">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3" :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="自动提醒" prop="Remind">
        <el-input placeholder="统计单位：分钟/每次" v-model="form.Remind" style="width: 100px;">
        </el-input>
        <span>统计单位：分钟/每次</span>
      </el-form-item>
      <el-form-item label="会议内容" prop="Description">
        <el-input type="textarea" :rows="2"  placeholder="请填写会议内容" v-model="form.Description" style="width: 100%;">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-if="!appointment">申请会议</el-button>
        <el-button type="primary" @click="goAppointment" v-if="appointment">申请会议</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      const data = [];
      return {
        attendPeople:{
          treeD:{
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            nodeKey:"id",
            data:[
              {
                id: 1,
                label: "一汽大众有限责任公司成都分公司",
                children: [
                  {
                    id: 4,
                    label: "管理服务部",
                    children: [
                      {
                        id: 9,
                        label: "何艳"
                      },
                      {
                        id: 10,
                        label: "叶桂英"
                      }
                    ]
                  }
                ]
              },
              {
                id: 2,
                label: "一汽大众有限责任公司佛山分公司",
                children: [
                  {
                    id: 5,
                    label: "林杰"
                  },
                  {
                    id: 6,
                    label: "谢磊"
                  }
                ]
              }
            ]
          },
          selectD:{
            keyField:{key:'id',name:'label'},
            data:[
              {
                id: 9,
                label: "何艳"
              },
              {
                id: 10,
                label: "叶桂英"
              },
              {
                id: 5,
                label: "林杰"
              },
              {
                id: 6,
                label: "谢磊"
              }
            ]
          },
          formData:{
            title:[
              {type:'input',title:"关键字",user:"",field:"user",placeholder:"关键字"},
            ],
            buttons:{name:"搜索",click:"search"},
            data:{
              user: "",
            }
          },
          tableData:{
            name: "attendPeople",
            pagination: {
              switch: false,
              type: "default",
              CurrentChangeFn: "getTableData",
              pageSize: 15,
              pageIndex: 1,
              layout: "total, sizes, prev, pager, next, jumper",
              pageSizes: [10, 20, 40]
            },
            Checkbox: true,
            selectionChangeFn: "selectionChange",
            title: [
              {
                name: "工号",
                field: "id",
                width: "120",
                show: true,
                showOverflowTooltip: true,
                align: "left",
                headerAlign: "left"
              },
              {
                name: "部门名称",
                field: "label",
                width: "",
                show: true,
                showOverflowTooltip: true,
                align: "left",
                headerAlign: "left"
              },
              {
                name: "人员",
                field: "label",
                width: "",
                show: true,
                showOverflowTooltip: true,
                align: "left",
                headerAlign: "left"
              }
            ],
            data: [
              {
                id: 9,
                label: "何艳"
              },
              {
                id: 10,
                label: "林桂英"
              },
              {
                id: 5,
                label: "林杰"
              },
              {
                id: 6,
                label: "谢磊"
              }
            ]
          },
          data:[],
          firstTab:true,
          secondTab:true,
        },
        multipleSelectDatas:{
          treeD:{
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            nodeKey:"id",
            data:[
              {
                id: 1,
                label: "一汽大众有限责任公司成都分公司",
                children: [
                  {
                    id: 4,
                    label: "管理服务部",
                    children: [
                      {
                        id: 9,
                        label: "姚芳"
                      },
                      {
                        id: 10,
                        label: "吕刚"
                      }
                    ]
                  }
                ]
              },
              {
                id: 2,
                label: "一汽大众有限责任公司佛山分公司",
                children: [
                  {
                    id: 5,
                    label: "江涛"
                  },
                  {
                    id: 6,
                    label: "唐磊"
                  }
                ]
              }
            ]
          },
          selectD:{
            keyField:{key:'id',name:'label'},
            data:[
              {
                id: 9,
                label: "姚芳"
              },
              {
                id: 10,
                label: "吕刚"
              },
              {
                id: 5,
                label: "江涛"
              },
              {
                id: 6,
                label: "唐磊"
              }
            ]
          },
          formData:{
            title:[
              {type:'input',title:"关键字",user:"",field:"user",placeholder:"关键字"},
            ],
            buttons:{name:"搜索",click:"search"},
            data:{
              user: "",
            }
          },
          tableData:{
            name: "multipleTable",
            pagination: {
              switch: false, //是否显示分页
              type: "default",
              CurrentChangeFn: "getTableData",
              pageSize: 15, //每页显示条目个数
              pageIndex: 1, //当前页数
              layout: "total, sizes, prev, pager, next, jumper",
              pageSizes: [10, 20, 40]
            }, //是否开启分页
            Checkbox: true, //是否显示复选框
            selectionChangeFn: "selectionChange", //Select框变化触发方法
            title: [
              {
                name: "工号",
                field: "id",
                width: "120",
                show: true,
                showOverflowTooltip: true,
                align: "left",
                headerAlign: "left"
              },
              {
                name: "部门名称",
                field: "label",
                width: "",
                show: true,
                showOverflowTooltip: true,
                align: "left",
                headerAlign: "left"
              },
              {
                name: "人员",
                field: "label",
                width: "",
                show: true,
                showOverflowTooltip: true,
                align: "left",
                headerAlign: "left"
              }
            ],
            data: [
              {
                id: 9,
                label: "姚芳"
              },
              {
                id: 10,
                label: "吕刚"
              },
              {
                id: 5,
                label: "江涛"
              },
              {
                id: 6,
                label: "唐磊"
              }
            ]
          },
          data:[],
          firstTab:true,
          secondTab:true,
        },
        form: {
          MeetingType: 1,
          applyType: 1,
          BookDate: new Date(),
          EndTime: "17:30",
          StartTime: "08:30",
          MeetingRoomId: '1',
          MailCc: "",
          MailTo: "",
          Subject: "",
          Remind: "15",
          Description: "",
          ContentInfo: "1",

        },
        fileList: [],
        tableData: {
          name: "multipleTable",
          pagination: {
            switch: true, //是否显示分页
            type: "default",
            CurrentChangeFn: "getTableData",
            pageSize: 15, //每页显示条目个数
            pageIndex: 1, //当前页数
            layout: "total, sizes, prev, pager, next, jumper",
            pageSizes: [10, 20, 40]
          }, //是否开启分页
          Checkbox: true, //是否显示复选框
          selectionChangeFn: "selectionChange", //Select框变化触发方法
          title: [
            {
              name: "工号",
              field: "id",
              width: "120",
              show: true,
              showOverflowTooltip: true,
              align: "left",
              headerAlign: "left"
            },
            {
              name: "部门名称",
              field: "label",
              width: "",
              show: true,
              showOverflowTooltip: true,
              align: "left",
              headerAlign: "left"
            },
            {
              name: "人员",
              field: "label",
              width: "",
              show: true,
              showOverflowTooltip: true,
              align: "left",
              headerAlign: "left"
            }
          ],
          data: []
        },
        appointment:false
      };
    },
    methods: {
      getTableData(){},
      submitForm(formName) {
        this.$message({
          type: 'success',
          message: "申请成功"
        });
      },
      goAppointment(formName) {
        this.$router.push({
          path: '/meet/appointment',
          query: { type: "apply" }
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${
            files.length
            } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        );
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },

    },
    mounted() {
      if( this.$route.query.type=="appointment"){
        this.appointment=true
      }else {
        this.appointment=false
      }
    }
  };
</script>
<style scoped>
  .content {
    padding: 20px;
    background: white;
  }
</style>
