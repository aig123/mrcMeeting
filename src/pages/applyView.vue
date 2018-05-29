<template>
  <div class="content">
    <el-form :model="form" ref="form" label-width="75px" class="demo-ruleForm" style="max-width: 900px;">
      <el-form-item label="会议类型" prop="name">
        普通会议
      </el-form-item>
      <el-form-item label="预订方式" prop="applyType">
        按时间预订
      </el-form-item>
      <el-form-item label="预定时间" prop="BookDate">
      2018-05-25 08:30-17:30
      </el-form-item>
      <el-form-item label="会议室" prop="MeetingRoomId">
        301会议室
      </el-form-item>
      <el-form-item label="参会人员" prop="MailCc">
        <el-tag style="margin-left: 10px" >王三</el-tag>
        <el-tag style="margin-left: 10px" >王四</el-tag>
      </el-form-item>
      <el-form-item label="抄送人员" prop="MailTo">
        <el-tag style="margin-left: 10px" >李四</el-tag>
      </el-form-item>
      <el-form-item label="会议主题" prop="Subject">
       讨论人民的力量
      </el-form-item>
      <el-form-item label="会议资料" prop="ContentInfo">
       暂无材料
      </el-form-item>
      <el-form-item label="自动提醒" prop="Remind">
      15
        <span>统计单位：分钟/每次</span>
      </el-form-item>
      <el-form-item label="会议内容" prop="Description">
       人民的力量是多么的伟大，让我们一起努力创造美好的未来
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">返回列表</el-button>
        <!--<el-button @click="resetForm('form')">重置</el-button>-->
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
              ]
            },
            selectD:{
              keyField:{key:'id',name:'label'},
              data:[
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
            },
            data:[],
            firstTab:true,
            secondTab:true,
          },
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
               // peopleSting:[],
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
          this.$router.push({
            path: '/meet/appointment',
            query: { type: "apply" }
          })
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
  .drag{
    background: #99CC00;
    width: 50px;
    height: 50px;
    position: fixed;
    cursor: pointer;
  }
.el-icon-warning {
    /*调整叹号和左侧文本框距离和图标颜色*/
    position: absolute;
    top: 12px;
    right: -24px;
    color: #e6a23c;
}

.content {
    padding: 20px;
  background: white;
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
