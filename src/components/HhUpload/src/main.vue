<template>
  <section>
    <el-upload
      class="upload-demo"
      ref="upload"
      :on-progress="handleProgress"
      :action="uploadUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarScucess"
      :show-file-list="false"
      list-type="picture"
      :auto-upload="true"  multiple style="width:100%;float: left" v-show="!uploadFlag" >
      <el-button slot="trigger" size="small" type="primary" :loading="progress">上传文件</el-button>
      <span v-if="loadingTip" style="margin-left: 10px;"><i class="el-icon-loading"></i> 上传中...</span>
      <div slot="tip" class="el-upload__tip" >{{uploadTipContent}}</div>
    </el-upload>

    <div style="">
      <div v-for="file in fileList"  class="cart-upload">
        <div style="float: left"><img style="border-radius: 10px;" width="70" height="70" :src="file.imgSUrl"></div>
        <div style="width: 73px;float: left;color: rgb(31, 45, 61);text-overflow: ellipsis;overflow: hidden;">
          <el-tooltip class="item" effect="dark" :content="file[name]" placement="top-start">
            <span style="display: block; width: 100%; text-overflow:ellipsis; white-space: nowrap; overflow: hidden;height: 16px;font-size: 12px;"> {{file[name]}}</span>
          </el-tooltip>
        </div>
        <div >
          <span v-if="showImg(file[name])" class="icon" @click="fileView(file[url])" > <i class="el-icon-search"></i></span>
          <span v-show="!downloadFlag"  class="icon" style="float: right;" @click="fileDown(file[name],file[url])"> <i class="el-icon-download"></i></span>
          <span v-show="!deleteFlag" class="icon" style="float: right;" @click="delFile(file[url])"> <i class="el-icon-delete"></i></span>
        </div>

      </div>
    </div>
    <div class="shadeImg" @click="closeShadeImg" v-show="shadeModel">
      <el-carousel :interval="5000" arrow="always" height="100%"  :autoplay="false" ref="carousel">
        <el-carousel-item v-for="item in fileImgList" :key="item.url">
          <h3 style="height: 100%;line-height: 50"><img class="showImg" :src="item.imgUrl" style="width: auto;max-width: 60%;margin-top: 5%"></h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </section>
</template>
<style>
  .cart-upload{
    height: 118px;
    float: left;
    margin-top: 15px;
    border: 1px solid #dcdfe6;
    padding: 5px;
    width: 82px;
    border-radius: 5px;
    margin-left: 10px;
    background: #ebeef5;
  }
  .shadeImg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 150;
    text-align: center;
    background: rgba(0, 0, 0, 0.65);

  }
  .el-carousel__arrow{
    width: 80px;
    height: 80px;
    font-size: 25px;
    background-color:#4c4d4e;
  }
  .cart-upload .icon{
    cursor: pointer;
  }
  .cart-upload .icon:hover{
    color: #188fff;
  }
  .showImg {
    max-width: 100%;
    max-height: 100%;
    box-sizing: border-box;
    /*border: 10px solid #fff;*/
  }
  .shadeImg:after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 100%;
    overflow: hidden;
    vertical-align: middle;
  }
  .upload .el-dialog {
    left: 25%;
    -ms-transform: none;
    transform: none;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    margin-bottom: 50px;
  }
  /*轮播*/

   .el-carousel{
     height: 100%;
   }
  .el-carousel__item h3 img{
    color: #475669;
    font-size: 18px;
    line-height: 600px;
    margin: 0;

  }
</style>
<script>

  export default {
    name: 'hh-upload',
    template:'<div><input type="text" type="text" v-model="currentValue"/></div>',
    data() {
      return {
        loadingTip: false,
        progress: false,
        uploadUrl:process.env.UPLOAD_URL,
        fileList:[],
        fileImgList:[],
        typeList:[".JPEG", ".JPG", ".GIF", ".BMP", ".PNG", ".DOC", ".DOCX", ".PPT", ".PPTX", ".XLS", ".XLSX", ".ZIP", ".RAR", ".PDF"],
        uploadTipContent:this.uploadTip?this.uploadTip:"只能上传word、excel、ppt、pdf、图片、压缩文件，单个图片文件最大5M ，其他类型的文档最大10M",
        shadeModel:false,
        showImgSrc:"",
        initialIndex:1

      };
    },
    //props: ['files', 'deleteFlag','uploadFlag', 'name', 'url'],
    props: {
      value:Array,
      uploadTip:String,
      deleteFlag: Boolean,
      uploadFlag: Boolean,
      downloadFlag:Boolean,
      name: {
        type: String,
        default: "name"
      },
      url: {
        type: String,
        default: "url"
      }
    },
    methods: {
      handleProgress(event, file, fileList){
      },
      showImg(path){
        let filepath = path;
        var extStart = filepath.lastIndexOf(".");
        var ext = filepath.substring(extStart, filepath.length).toUpperCase();
        if (ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
          return false;
        } else {
          return true;
        }
      },
      beforeAvatarUpload(file) {
        this.loadingTip = true;
        var fileType = "";
        var filepath = file["name"];
        var isLt5M, isLt10M;
        var extStart = filepath.lastIndexOf(".");
        var ext = filepath.substring(extStart, filepath.length).toUpperCase();
        var _arr = this.typeList.filter(_=>ext ==_);
        if(_arr && _arr.length <= 0){
          this.$notify.error('错误的文件格式'); this.loadingTip = false;
          return false;
        }
        if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
          fileType = "notimg"
        } else {
          fileType = "img"
        }
        const isLength = this.fileList.length < 9;
        if (!isLength) {
          this.$notify.error('上传文件数量应小于10个'); this.loadingTip = false;
        }
        if (fileType == "img") {
          isLt5M = file.size / 1024 / 1024 < 5;
          if (!isLt5M) {
            this.$notify.error('图片文件应该小于 5MB!'); this.loadingTip = false;
          }
          return isLength && isLt5M;
        } else {
          isLt10M = file.size / 1024 / 1024 < 10;
          if (!isLt10M) {
            this.$notify.error('上传文件应该小于 10MB!'); this.loadingTip = false;
          }
          return isLt10M && isLength;
        }
      },
      handleAvatarScucess(res, file) {
        this.loadingTip = false;
        let data = {};
        if (res.results.length > 0) {
          data[this.name] = res.results[0].originalFileName;
          data[this.url] = res.results[0].accessPath;
          var extStart = res.results[0].originalFileName.lastIndexOf(".");
          var ext = data[this.name].substring(extStart, data[this.name].length).toUpperCase();
          if (ext == ".PNG" || ext == ".GIF" || ext == ".JPG" || ext == ".JPEG") {
            data.imgSUrl= process.env.RESOURCES_URL+res.results[0].accessPath;
          } else if(ext == ".XLS"){
            data.imgSUrl=require("../assets/images/icon-x.png")
          }
          else if(ext == ".DOC"){
            data.imgSUrl=require("../assets/images/icon-w.png")
          }
          else if(ext == ".PPT"||ext == ".PPTX"){
            data.imgSUrl=require("../assets/images/icon-p.png")
          }else {
            data.imgSUrl=require("../assets/images/icon-img.png")
          }
          // this.form.files.push(data);
          debugger
          if (this.fileList.length < 9) {
            this.fileList.push(data)
          } else {
            this.$notify.error('上传文件数量应小于10个');
          }
        } else {
          this.$notify.error('上传文件格式不正确，请重新上传');
        }
      },
      handlePreview(file) {
        //console.log(file);
      },
      handleRemove(file, fileList) {
        //console.log(file, fileList);
      },
      fileView(url){
        //window.open(process.env.RESOURCES_URL + url);
        this.fileImgList=[];
        for (let index in this.fileList){
            if(url==this.fileList[index].url){
              this.$refs.carousel.setActiveItem(Number(index))
            }
        }
        for(let file of this.fileList){
          if(this.showImg(file.name)){
            file.imgUrl=process.env.RESOURCES_URL+file.url;
            this.fileImgList.push(file);
          }
        }
        this.shadeModel=true;
        this.showImgSrc=process.env.RESOURCES_URL + url;
        //this.showImgSrc="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      },
      closeShadeImg(){
        this.shadeModel=false;
      },
      fileDown(name, url){
        window.location.href = process.env.DOWNLOAD_URL + "download_file?originalFileName=" +  encodeURI(encodeURI(name))  + "&accessPath=" + url;
      },
      delFile(url){
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (var i = 0; i < this.fileList.length; i++) {
            if (url == this.fileList[i][this.url]) {
              this.fileList.splice(i, 1);
              // this.fileList.splice(i, 1);
            }
          }
          this.$emit('getFiles', this.fileList);
          this.$emit('delFile',this.fileList);
        })
      },
    },
    mounted: function () {
      this.fileList = this.value;
    },
    computed: {
      currentValue: {
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
