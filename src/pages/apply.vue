<template>
  <div class="content">
    <el-form :model="form" ref="form" label-width="120px" class="demo-ruleForm">
      <el-form-item label="会议类型" prop="name">
        <el-radio-group v-model="form.MeetingType">
          <el-radio :label="1">普通会议</el-radio>
          <el-radio :label="2">重要会议</el-radio>
          <el-radio :label="3">视频会议</el-radio>
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
      </el-form-item>
      <el-form-item label="参会人员" prop="MailCc">
        <el-tag style="margin-left: 10px" v-for="people in peopleSting" :key="people.id">{{people.label}}</el-tag>
        <el-button type="primary" size="small" @click="dialogVisible=true">选择人员</el-button>
      </el-form-item>
      <!--<el-form-item label="抄送人员" prop="MailTo">-->
        <!--<el-tag style="margin-left: 10px" v-for="people in peopleSting" :key="people.id">{{people.label}}</el-tag>-->
        <!--<el-button type="primary" size="small" @click="dialogVisible=true">选择人员</el-button>-->
      <!--</el-form-item> <!--<el-form-item label="抄送人员" prop="MailTo">-->
        <!--<el-tag style="margin-left: 10px" v-for="people in peopleSting" :key="people.id">{{people.label}}</el-tag>-->
        <!--<el-button type="primary" size="small" @click="dialogVisible=true">选择人员</el-button>-->
      <!--</el-form-item>-->
      <el-form-item label="会议主题" prop="Subject">
        <el-input placeholder="请填写会议主题" v-model="form.Subject">
        </el-input>
      </el-form-item>
      <el-form-item label="自动提醒" prop="Remind">
        <el-input placeholder="统计单位：分钟/每次" v-model="form.Remind" style="width: 100px;">
        </el-input>
        <span>统计单位：分钟/每次</span>
      </el-form-item>
      <el-form-item label="会议内容" prop="Description">
        <el-input type="textarea" :rows="2" readonly placeholder="请填写会议内容" v-model="form.Description" style="width: 100%;">
        </el-input>
      </el-form-item>
      <el-form-item label="会议资料" prop="ContentInfo">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3" :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">申请会议</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="选择人员" :visible.sync="dialogVisible1" width="716px">
      <span>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="部门">
            <el-select v-model="formInline.region" placeholder="部门">
              <el-option label="部门1" value="shanghai"></el-option>
              <el-option label="部门2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人员">
            <el-input v-model="formInline.user" placeholder="人员"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
        <el-transfer v-model="value5" :titles="['人员群体', '选中人员']" :props="{key: 'value',label: 'desc' }" :data="data3">
        </el-transfer>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择人员" :visible.sync="dialogVisible" width="770px">
      <span>
        <el-tabs type="card">
          <el-tab-pane label="组织架构">
            <div style="max-height: 150px;overflow-y: auto;border: 1px solid #ebeef5;border-radius: 4px;" class="multiple-select">
              <el-select v-model="value8" filterable multiple placeholder="请选择" style="width: 100%">
                <el-option v-for="item in options1" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div style="border: 1px solid #ebeef5;border-radius: 4px;margin-top: 20px">
              <el-tree ref="tree3" @check="handleCheckChange1" :data="data6" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data1 }">
                  <span>
                    <img src="../assets/person_icon.png" width="22" style="margin-right:4px">{{ node.label }} </span>
                </span>
              </el-tree>
            </div>
          </el-tab-pane>
          <el-tab-pane label="人员搜索">
            <div style="max-height: 150px;overflow-y: auto;border: 1px solid #ebeef5;border-radius: 4px;" class="multiple-select">
              <el-select v-model="value8" filterable multiple placeholder="请选择" style="width: 100%">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div style="border: 1px solid rgb(235, 238, 245);border-radius: 4px;margin-top: 20px;width: 100%;">
              <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 0px;margin-bottom: -20px">
                <el-form-item label="" style="margin-left: 3px">
                  <el-input v-model="formInline.user" placeholder="" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="" size="small">搜索</el-button>
                </el-form-item>
              </el-form>
              <el-table :data="tableData.data" style="width: 100%"  @select="selectionChange" @select-all="selectionChange" ref="multipleTable" border>
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column v-for="(data,index) in tableData.title" :key="index" :prop="data.field" :label="data.name" v-if="data.show" :width="data.width" :fixed="data.fixed" :sortable="data.sortable" :show-overflow-tooltip="data.showOverflowTooltip" :align="data.align" :headerAlign="data.headerAlign">
                 </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cleanPeople">清 空</el-button>
        <el-button type="primary" @click="savePeople">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data() {
        const generateData3 = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    value: i,
                    desc: `人员 ${i}`,
                    disabled: i % 4 === 0
                });
            }
            return data;
        };
        const data = [
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
                                label: "组织与流程科"
                            },
                            {
                                id: 10,
                                label: "产品与综合业务开发科"
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
                        label: "安全保障部"
                    },
                    {
                        id: 6,
                        label: "人员服务部"
                    }
                ]
            }
        ];
        const data1 = [
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
                                label: "组织与流程科"
                            },
                            {
                                id: 10,
                                label: "产品与综合业务开发科"
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
                        label: "安全保障部"
                    },
                    {
                        id: 6,
                        label: "人员服务部"
                    }
                ]
            }
        ];
        return {
            data4: JSON.parse(JSON.stringify(data)),
            data5: JSON.parse(JSON.stringify(data)),
            data6: JSON.parse(JSON.stringify(data)),
            formInline: {
                user: "",
                region: ""
            },
            data3: generateData3(),
            value5: [],
            MeetingTypes: [
                { id: 1, name: "普通会议" },
                { id: 2, name: "高级会议" },
                { id: 3, name: "视频会议" }
            ],
            MeetingType: 1,
            dialogVisible: false,
            dialogVisible1: false,
            form: {
                MeetingType: 1,
                applyType: 1,
                BookDate: "",
                EndTime: "",
                StartTime: "",
                MeetingRoomId: "",
                MailCc: "",
                MailTo: "",
                Subject: "",
                Remind: "",
                Description: "1",
                ContentInfo: "1",
                peopleSting:[],
            },
            fileList: [],
            options4: [],
            value9: [5, "6", "人员服务部"],
            list: [
                //下拉菜单
                {
                    id: 9,
                    label: "组织与流程科"
                },
                {
                    id: 10,
                    label: "产品与综合业务开发科"
                },
                {
                    id: 5,
                    label: "安全保障部"
                },
                {
                    id: 6,
                    label: "人员服务部"
                }
            ],
            loading: false,
            options: [
                //
                {
                    id: 9,
                    label: "组织与流程科"
                },
                {
                    id: 10,
                    label: "产品与综合业务开发科"
                },
                {
                    id: 5,
                    label: "安全保障部"
                },
                {
                    id: 6,
                    label: "人员服务部"
                }
            ],
            options1: [
                {
                    id: 9,
                    label: "组织与流程科"
                },
                {
                    id: 10,
                    label: "产品与综合业务开发科"
                },
                {
                    id: 5,
                    label: "安全保障部"
                },
                {
                    id: 6,
                    label: "人员服务部"
                }
            ],
            value8: [],
            value10: [],
            multipleSelection: [], //选中checkbox
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
                        align: "center",
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
                        label: "组织与流程科"
                    },
                    {
                        id: 10,
                        label: "产品与综合业务开发科"
                    },
                    {
                        id: 5,
                        label: "安全保障部"
                    },
                    {
                        id: 6,
                        label: "人员服务部"
                    }
                ]
            }
        };
    },
    methods: {
        savePeople(){
          this.peopleSting=[];
          for (let val of this.value8){
            for (let option of this.options){
              if(val==option.id){
                this.peopleSting.push(option)
              }
            }
          }
          this.dialogVisible = false;
        },
        cleanPeople(){
          this.peopleSting=[];
          this.value8=[];
        },
        handleCheckChange(data, checked, indeterminate) {
            //树形菜单改变回调
            this.value8 = [];
            for (let key of this.$refs.tree2.getCheckedKeys()) {
                for (let option of this.options) {
                    if (key == option.id) {
                        this.value8.push(key);
                    }
                }
            }
            //this.value8=this.$refs.tree2.getCheckedKeys()
        },
        handleCheckChange1(data, checked, indeterminate) {
            this.value8 = [];
            for (let key of this.$refs.tree3.getCheckedKeys()) {
                for (let option of this.options) {
                    if (key == option.id) {
                        this.value8.push(key);
                    }
                }
            }
        },
        selectionChange(datas) {
            this.value8 = [];
            for (let data of datas) {
                this.value8.push(data.id);
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert("submit!");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
        remoteMethod(query) {
            if (query !== "") {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.options4 = this.list.filter(item => {
                        return (
                            item.label
                                .toLowerCase()
                                .indexOf(query.toLowerCase()) > -1
                        );
                    });
                }, 200);
            } else {
                this.options4 = [];
            }
        }
    },
    mounted() {},
    watch: {
      value8(curVal, oldVal) {
        debugger
        var rows = [];
        this.$refs.multipleTable.clearSelection();
        for (let cur of curVal) {
          for (let index in this.tableData.data) {
            if (cur == this.tableData.data[index].id) {
              rows.push(this.tableData.data[index]);
            }
          }
        }
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
        this.$refs.tree3.setCheckedKeys(curVal);
      },
        value10(curVal, oldVal) {
            this.$refs.tree3.setCheckedKeys(curVal);
        }
    },
    computed: {
        checkData() {
            console.log(this.$refs.tree.getCheckedNodes(), "------------dev");
            return this.$refs.tree.getCheckedNodes();
        }
    }
};
</script>
<style scoped>
.el-icon-warning {
    /*调整叹号和左侧文本框距离和图标颜色*/
    position: absolute;
    top: 12px;
    right: -24px;
    color: #e6a23c;
}

.content {
    padding: 20px;
    max-width: 900px;
}

.widthFull {
    width: 100%;
}
</style>
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
