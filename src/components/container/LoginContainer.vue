<template>
  <div class="logincontainer">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm2.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm2')">登录</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名'));
        }
        callback();
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        callback();
      };
      return {
        ruleForm2: {
          pass: '',
          userName: ''
        },
        token: '',
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          userName: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      login(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var readyData={
              username: this.ruleForm2.userName,
              password: this.ruleForm2.pass
            };
            this.axios.post('/api/admin_login',readyData)
            .then((res) => {
              if(res.data.code == 200){
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('userInfo',JSON.stringify(res.data.data))
                this.$store.commit('setToken')
                this.$message('登录成功！');
                this.$router.push({path:'/home'})
              }else{
                this.$message('登录失败，用户名或密码错误！');
              }
            }).catch(function(error) {
              console.log(error);
              ;
            });
          } else {
            this.$message('用户名或密码格式不正确！');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
}
</script>
<style lang="less" scoped>
@color: #69c18c;
  .logincontainer {
    padding: 11rem 18.75rem;
    background: #fff;
  }
</style>
