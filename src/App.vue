<template>
  <el-container>
    <el-header>
      <div class="appheader">
        <div class="logo" @click="tohome" style="cursor: pointer;"><img src="./img/logo6.png" alt=""></div>
        <div class="login" v-if="!token">
          <router-link to="/login" class="loginbtn">登录</router-link>
        </div>
        <div class="register" v-if="!token">
          <router-link to="/register" class="regbtn">注册</router-link>
        </div>
        <div class="logout" @click="logout" v-if="token" style="cursor: pointer;">
          <span>退出登录</span>
        </div>
        <div class="userinfo" v-if="token" @click="tosetinfo" style="cursor: pointer;">
          <div class="avatar"><img :src="userinfo.avatar" alt=""></div>
          <div class="username"><span>{{userinfo.username}}</span></div>
        </div>
      </div>
    </el-header>
    <el-container class="asidecontainer">
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              default-active="$route.path"
              :router="true"
              style="border:none;"
              class="el-menu-aside"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="/user" style="padding-left: 6px;">
                <i class="el-icon-user-solid"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
              <el-menu-item index="/category" style="padding-left: 6px;">
                <i class="el-icon-menu"></i>
                <span slot="title">分类管理</span>
              </el-menu-item>
              <el-menu-item index="/homegoods" style="padding-left: 6px;">
                <i class="el-icon-s-tools"></i>
                <span slot="title">首页管理</span>
              </el-menu-item>
              <el-menu-item index="/goods" style="padding-left: 6px;">
                <i class="el-icon-s-goods"></i>
                <span slot="title">商品管理</span>
              </el-menu-item>
              <el-menu-item index="/order" style="padding-left: 6px;">
                <i class="el-icon-tickets"></i>
                <span slot="title">订单管理</span>
              </el-menu-item>
              <el-menu-item index="/report" style="padding-left: 6px;">
                <i class="el-icon-data-line"></i>
                <span slot="title">报表统计</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-main>
          <transition>
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '',
        userinfo: {},
      };
    },
    created() {
      this.validToken();
      this.$store.commit('setToken')
    },
    computed: {
      token: function(){
        this.validToken()
        return this.$store.state.token
      },
    },
    watch: {
      $route(){
        this.handleSelect(this.activeIndex)
      },
      userinfo: function () {
        return this.userinfo
      },
    },
    methods: {
      handleSelect(index){
        this.activeIndex = index
      },
      validToken(){
        var readyData = {
          token: localStorage.getItem('token')
        };
        if(readyData.token){
          this.axios.post('/api/admin_valid',readyData)
          .then((res)=>{
            if(res.data.code==201){

              this.$message(res.data.msg)
            }else if(res.data.code==202){
              localStorage.clear();
              this.$store.commit('setToken')
              this.$router.push({path:'/login'})
              this.$message(res.data.msg)
            }else if(res.data.code==203){
              localStorage.clear();
              this.$store.commit('setToken')
              this.$router.push({path:'/login'})
              this.$message(res.data.msg)
            }else{
              this.userinfo = res.data
            }
          })
        }
      },
      logout(){
        this.$router.push({path:'/home'})
        localStorage.clear();
        this.$store.commit('setToken')
        this.userinfo = {}
      },
      tosetinfo(){
        this.$router.push('/admininfo')
      },
      tohome(){
        this.$router.push('/home')
      }
    }
  }
</script>

<style lang="less" scoped>
@deep: ~'>>>';
  .appheader{
    .logo{
      height: 60px;
      width: 199px;
      float: left;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .login{
      float: right;
      &:hover{
        background-color: rgb(67,74,80);
      }
      .loginbtn{
        color: #fff;
        display: block;
        width: 80px;
      }
    }
    .register{
      float: right;
      &:hover{
        background-color: rgb(67,74,80);
      }
      .regbtn{
        color: #fff;
        display: block;
        width: 80px;

      }
    }
    .logout{
      float: right;
      height: 60px;
      text-align: center;
      width: 100px;
      color: #fff;
      &:hover{
        background-color: rgb(67,74,80);
      }
    }
    .userinfo{
      float: right;
      height: 60px;
      &:hover{
        background-color: rgb(67,74,80);
      }
      .avatar{
        float: left;
        width: 50px;
        height: 50px;
        margin: 5px 10px;
        border-radius: 25px;
        overflow: hidden;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .username{
        float: left;
        height: 60px;
        margin: 0 10px;
        color: #fff;
        span{
          line-height: 50px;
        }
      }
    }
  }
  a {
    text-decoration: none;
  }
  @{deep} .el-badge__content{
    top: 13px;
  }
  .router-link-active {
    text-decoration: none;
  }
  .asidecontainer {
    position: absolute;
    bottom: 0;
    top: 60px;
    width: 100%;
  }
  .el-header {
    background: #545c64;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
  }
  .el-aside {
    &::-webkit-scrollbar {/*滚动条整体样式*/
      width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgb(53, 155, 87);
    }
    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
    }
    .el-col-12 {
      width: 100%;
    }
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 100%;

  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding: 30px 100px 0 100px;
    &::-webkit-scrollbar {/*滚动条整体样式*/
      width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgb(53, 155, 87);
    }
    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);
    }
  }
  .v-enter {
    opacity: 0;
    transform: translateX(-100%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(100%);
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }
</style>



