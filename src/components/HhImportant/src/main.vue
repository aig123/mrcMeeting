<template>
  <section style="margin: 10px;height: 100%">
    <el-row type="flex" justify="center" :gutter="20" style="height: 100%">
      <el-col :span="5"  >
        <el-row class="font_content" style="height: 250px;">
          <div style="width: 100%;height: 100%;border: 1px dashed rgb(202, 199, 199);border-radius: 5px;">
            <img src="./../assets/images/import.png" class="import_img" @click="templateExport">
          </div>
        </el-row>
        <el-row style="margin-top: 10px;">
          <!--<el-button type="primary" size="mini" style="margin-left:12% ">选择文件</el-button>-->
          <!--<el-button type="success" size="mini">导入文件</el-button>-->
          <el-upload
            style="margin-left:5% "
            class="upload-demo"
            ref="upload"
            :action="uploadUrl"
            :data="uploadData"
            :on-preview="handlePreview"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitReady">上传到服务器</el-button>
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-row>
      </el-col>
      <el-col :span="19">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          align="left"
          height="90%"
         >
          <el-table-column
            align="left"
            prop="address"
            label="导入过程提示信息">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog
      title="操作提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>请选择‘覆盖’或‘忽略’!</span>
      <span slot="footer" class="dialog-footer">
     <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload('cover')">覆盖</el-button>
        <el-button type="primary" @click="submitUpload('jump')">忽略</el-button>
      </div>
  </span>
    </el-dialog>
  </section>
</template>
<style>
  .import_img{
    margin-top: 40%;
    margin-left: 17%;
    cursor: pointer;
  }
</style>
<script>

  export default {
    name: 'hh-important',
    template:'<div><input type="text" type="text" v-model="uploadData"/></div>',
    data() {
      return {
        loadingTip: false,
        dialogVisible:false,
        tableData: [
            {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
        ],
        fileList:[],
//        uploadUrl: process.env.BASE_URL,
        uploadUrl: "http://new.test.hhedu.cn/middle/sport/score/import",
      };
    },
    props: ['downUrl', 'importUrl','value'],
//    props: {
//      value:Array,
//    },
    methods: {
      templateExport: function () {
        this.$emit('templateExport');
      },
      submitReady(){
        this.dialogVisible=true;
      },
      submitUpload(type) {
        //this.$emit('templateExport');
        if(this.uploadData){
          this.uploadData.inputType=type;
        }
        this.$refs.upload.submit();
        this.dialogVisible=false;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleAvatarScucess(res, file) {
        this.fileName="";
        if (res.result == "failure") {
          this.showMsg = false;
          this.$notify({
            title: '提示',
            message: res.messages[0],
            type: 'error'
          });

        } else {
          this.tableData = res.data.messages;
          }
        },
      beforeAvatarUpload(file) {
          debugger
         var excel ;
         if(file.type=='application/vnd.ms-excel'||file.type=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
           excel=true
         }else {
           excel=false
         }
          this.fileName=file.name;

         if (!excel) {
           this.$notify({
             message: '上传excel!！',
             type: 'error'
           });
         }else {
           return true
         }

      },
    },
    mounted: function () {
      this.uploadData = this.value;
    },
    computed: {
      uploadData: {
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
