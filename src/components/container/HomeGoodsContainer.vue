<template>
  <div class="saleContainer">
    <div class="title-form">设置轮播商品</div>
    <hr>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="轮播图片" prop="img">
        <el-upload
          action="ybc"
          ref="upload"
          list-type="picture-card"
          name="image[]"
          multiple
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview"
          :on-change="changeImage"
          :on-remove="handleRemove"
          :http-request="uploadFile"
          :auto-upload="false">
          <div slot="tip" class="el-upload__tip">上传每张图片大小不能超过1M,第一张为商品封面</div>
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item
        label="商品id"
        prop="goods_id">
        <el-input type="goods_id" v-model.number="ruleForm.goods_id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item style="text-align:left;">
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
    <div class="title-form">轮播图列表</div>
    <hr>
    <div class="saledContainer">
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center">
        </el-table-column>
        <el-table-column
          label="商品图片"
          align="center">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="" style="width:70px;height:70px;">
          </template>
        </el-table-column>
        <el-table-column
          label="商品id"
          prop="goods_id"
          align="center">
        </el-table-column>
        <el-table-column label="操作"
        align="center">
          <template slot="header">
            <el-button type="danger" @click="delSelect">批量删除</el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      dialogImageUrl: '',
      dialogVisible: false,
      tableData: [],
      multipleSelection: [], //选中的商品
      ruleForm: {
        formdata: new FormData(),
        goods_id: null,
      },
      rules: {
        goods_id: [
          { required: true, message: '商品id不能为空'},
          { type: 'number', message: '商品id必须为数字值'}
        ],
      },
    }
  },
  created() {
    this.getSwiper()
  },
  methods: {
    beforeAvatarUpload(file) {
    },
    changeImage(file,fileList){
    },
    handleRemove(file, fileList) {
      console.log('移除图片成功');
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadFile(file){
      this.ruleForm.formdata.append('image[]',file.file)
    },
    submitForm(formName) { //上传商品
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit(); //提交图片
          let data = this.ruleForm.formdata
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          data.set('goods_id',this.ruleForm.goods_id)
          this.axios.post('/api/setSwiper',data,config)
          .then((res) => {
            if(res.data.code = 200){
              this.getSwiper()
              data.delete('image[]') //清空formdata中的图片
              this.$refs[formName].resetFields() //重置表单
              this.$message.success(res.data.message)
            }else{
              data.delete('image[]')
              this.$message.error(res.data.message)
            }
          }).catch((error) =>{
            data.delete('image[]')
            console.log(error);
          })
        } else {
          this.$message.error('请正确填写信息！');
          return false;
        }
      });
    },
    getSwiper(){
      this.axios.get('/api/getSwiper')
      .then(res => {
        this.tableData = res.data
      }).catch(e => {
        console.log(e);
      })
    },
    handleDelete(row){ //删除一个
      var swiperlist = []
      swiperlist.push(row)
      this.axios.post('/api/delSwiper', swiperlist)
      .then(res => {
        if(res.data.code == 200){
          this.getSwiper()
          this.$message.success('删除成功！')
        }else{
          this.$message.error('删除失败！')
        }
      })
    },
    delSelect(){ //批量删除
      if (this.multipleSelection.length<1) {
        this.$message('请勾选要删除的轮播！')
        return false
      }
      this.axios.post('/api/delSwiper',this.multipleSelection)
      .then(res => {
        if(res.data.code == 200){
          this.getSwiper()
          this.$message.success('删除成功！')
        }else{
          this.$message.error('删除失败！')
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  }
}
</script>
<style lang="less" scoped>
  .saleContainer {
    background-color: #fff;
    padding: 20px 20px;
    hr {
      margin-bottom: 10px;
    }
    .title-form {
      color: #69696b;
      text-align: left;
      border-left: 2px solid rgb(4, 129, 56);
      padding-left: 10px;
      font-size: 16px;
    }
    .demo-ruleForm {
      width: 500px;
      text-align: left;
      margin: 0 auto;
    }
    .title {
      background-color: #f5f7fa;
      color: #909399;
      font-size: 14px;
      vertical-align: middle;
      border: 1px solid #DCDFE6;
      border-right: 0;
      border-radius: 4px;
      padding: 8px 20px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .saledContainer{
      .demo-table-expand {
        font-size: 0;
      }
      .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
      }
      .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }
  }
</style>

