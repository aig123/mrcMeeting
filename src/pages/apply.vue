<template>
  <div class="content">
    <el-form :model="form"  ref="form" label-width="120px" class="demo-ruleForm">
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
      <el-form-item label="预定时间" prop="date">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-time-select
          placeholder="起始时间"
          v-model="form.startTime"
          :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="form.endTime"
          :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
    }">
        </el-time-select>
      </el-form-item>
      <el-form-item label="会议室" prop="classRoom">
        <el-select v-model="form.classRoom">
          <el-option key="1" value="1" label="301会议室"></el-option>
          <el-option key="2" value="2" label="302会议室"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参会人员" prop="classRoom">
        <el-input
          type="textarea"
          :rows="2"
          readonly
          placeholder="请选择参会人员"
          v-model="form.people" style="width: 100%;">
        </el-input>
        <el-button type="primary" size="small"  @click="dialogVisible=true">选择人员</el-button>
      </el-form-item>
      <el-form-item label="抄送人员" prop="classRoom">
        <el-input
          type="textarea"
          :rows="2"
          readonly
          placeholder="请选择抄送人员"
          v-model="form.people" style="width: 100%;">
        </el-input>
        <el-button type="primary" size="small"  @click="dialogVisible=true">选择人员</el-button>
      </el-form-item>
      <el-form-item label="会议主题" prop="classRoom">
        <el-input
          placeholder="请填写会议主题"
          v-model="form.people">
        </el-input>
      </el-form-item>
      <el-form-item label="自动提醒" prop="classRoom">
        <el-input
          placeholder="统计单位：分钟/每次"
          v-model="form.people" style="width: 100px;">
        </el-input>
        <span>统计单位：分钟/每次</span>
      </el-form-item>
      <el-form-item label="会议内容" prop="classRoom">
        <el-input
          type="textarea"
          :rows="2"
          readonly
          placeholder="请填写会议内容"
          v-model="form.people" style="width: 100%;">
        </el-input>
      </el-form-item>
      <el-form-item label="会议资料" prop="classRoom">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :limit="3"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">申请会议</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="选择人员"
      :visible.sync="dialogVisible"
      width="716px"
      >
      <span>
         <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="审批人">
                 <el-input v-model="formInline.user" placeholder="审批人"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                   <el-select v-model="formInline.region" placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                 <el-button type="primary" @click="onSubmit">查询</el-button>
               </el-form-item>
          </el-form>
           <el-transfer
             v-model="value5"
             :props="{key: 'value',label: 'desc' }"
             :data="data3">
          </el-transfer>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
            desc: `人员 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        formInline: {
          user: '',
          region: ''
        },
        data3: generateData3(),
        value5: [],
        MeetingTypes:[{id:1,name:"普通会议"},{id:2,name:"高级会议"},{id:3,name:"视频会议"}],
        MeetingType:1,
        dialogVisible:false,
        form: {
          MeetingType:1,
          applyType:1,
          endTime:"",
          startTime:"",
          classRoom:"1",
          people:"",
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          value6:"",
          date:""
        },
        fileList: []
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
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
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>
<style scoped>

  .el-icon-warning{/*调整叹号和左侧文本框距离和图标颜色*/
    position: absolute;
    top: 12px;
    right: -24px;
    color: #e6a23c;
  }
  .content{
    padding: 20px;
    max-width:900px
  }
  .widthFull{
    width: 100%;
  }
</style>
<style>
  .el-transfer-panel{
    width: 300px;
  }
</style>
