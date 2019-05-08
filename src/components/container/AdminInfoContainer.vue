<template>
  <div class="userinfocontainer">
    <el-tabs tab-position="top" style="padding:0px 18px;">
      <!-- 个人资料 -->
      <el-tab-pane label="个人资料" style="padding:20px 0 20px 350px">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="text-align:left;">
          <el-form-item label="用户头像">
            <el-upload
              class="avatar-uploader"
              ref="upload"
              action="ybc-jxh"
              name="image[]"
              :show-file-list="false"
              :on-change="changeImage"
              :before-upload="beforeAvatarUpload"
              >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名" prop="username" style="width:400px;">
            <el-input v-model="form.username" :value="form.username"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="tel" style="width:400px;">
            <el-input v-model="form.tel" :value="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 密码修改 -->
      <el-tab-pane label="密码修改" style="padding:100px 0 100px 350px">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" style="text-align:left;">
          <el-form-item label="旧密码" prop="oldpass" style="width:400px;">
            <el-input type="password" v-model="ruleForm2.oldpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass" style="width:400px;">
            <el-input type="password" v-model="ruleForm2.newpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" style="width:400px;">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">立即修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.newpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        flag: true,
        tableData: [],
        imageUrl: '',
        form: {
          formdata:new FormData(),
          username: '',
          tel: '',
          sex: '',
        },
        ruleForm2: {
          oldpass: '',
          newpass: '',
          checkPass: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名！', trigger: 'blur'},
            { min: 1, max: 10, message: '不能超过10个字符', trigger: 'blur'}
          ],
          tel: [
            { min: 11, max: 11,message: '请输入11位手机号', trigger: 'blur'}
          ]
        },
        rules2: {
          oldpass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          newpass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
      };
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      beforeAvatarUpload(file) {
        this.form.formdata.set('image',file);
        return false;
      },
      changeImage(file){
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.form.formdata.set('token',this.$store.state.token)
            this.form.formdata.set('username',this.form.username)
            this.form.formdata.set('tel',this.form.tel)
            this.form.formdata.set('sex',this.form.sex)
            let data = this.form.formdata
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            this.axios.post('/api/admin_userinfo',data,config)
            .then(res => {
              if(res.data.code === 200){
                this.$message.success('保存成功！');
              }else{
                this.$message.error('保存失败');
              }
            }).catch(error => {
              console.log(error);
            })
          }else {
            this.$message.error('请正确填写信息');
            return false;
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var token = this.$store.state.token
            var data = {
              token: token,
              oldpass: this.ruleForm2.oldpass,
              newpass: this.ruleForm2.newpass
            }
            this.axios.post('/api/admin_updatepass',data)
            .then(res => {
              if(res.data.code === 200){
                this.$message.success('密码修改成功！请重新登录！')
                this.$router.push({path:'/login'})
                localStorage.removeItem('token')
                this.$store.commit('setToken')
              }else{
                console.log(res);

              }
            }).catch(error => {
              console.log(error);
              this.$message.error(error);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getUserInfo(){
        this.axios.get('/api/admin_getinfo/' + this.$store.state.token)
        .then( res => {
          if(res.data.code == 200){
            this.imageUrl = res.data.data.avatar;
            this.form.username = res.data.data.username;
            this.form.tel = res.data.data.tel;
            this.form.sex = res.data.data.sex;
          }else{
            console.log('获取用户信息失败');
          }
        }).catch(error => {
          console.log(error);
        })
      },
    },
  }
</script>
<style lang="less" scoped>
  .userinfocontainer {
    background-color: #fff;
    .title{
      text-align: left;
      border-left: 2px solid #409EFF;
      margin-bottom: 20px;
      line-height: 40px;
      padding-left: 20px;
      background-color: rgba(204, 204, 204, 0.103);
    }
    .el-icon-plus {
      border: 1px dashed #ccc;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-icon-plus:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .avatar {
    width: 150px;
    height: 150px;
    display: block;
    .addressContainer{
      height: 300px;
      width: 300px;
      margin: 0 auto;
      .demo-ruleForm{
        width: 500px;
      }
    }
  }
  }

</style>

