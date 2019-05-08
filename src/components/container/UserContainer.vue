<template>
  <div class="userContainer">
    <div class="title">用户管理</div>
    <el-table
      ref="multipleTable"
      :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))
      .slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        label="头像">
        <template slot-scope="scope">
          <div class="avatar">
            <img :src="scope.row.avatar" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        align="center"
        prop="tel"
        label="手机">
      </el-table-column>
      <el-table-column
        align="center"
        label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.status===1?'正常':'已封禁'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        align="center">
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            style="padding:0"
            placeholder="输入用户名关键字"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.status==2"
            @click="unban(scope.$index, scope.row)">解封</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.status==1"
            @click="banned(scope.$index, scope.row)">封禁</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px;text-align:left;">
      <el-button type="danger" @click="delSelect">批量删除</el-button>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      :total="total"
      layout="prev, pager, next">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        pagesize:6,//每页的数据条数
        currentPage:1,//默认开始页面
        total: 0,//用户总个数
        tableData: [],
        search: '',
        multipleSelection: [],
      }
    },
    created() {
      this.getUser()
    },
    methods: {
      getUser(){
        this.axios.get('/api/getUser')
        .then(res => {
          if(res.data.code == 200){
            this.tableData = res.data.data
            this.total = res.data.data.length
          }else{
            console.log('获取用户列表失败');
          }
        }).catch(e => {
          console.log(e);
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      delSelect(){ //批量操作
        if (this.multipleSelection.length<1) {
          this.$message('请勾选要删除的用户！')
          return false
        }
        this.axios.post('/api/delUser',this.multipleSelection)
        .then(res => {
          if(res.data.code == 200){
            this.getUser()
            this.$message.success('删除成功！')
          }else{
            this.$message.error('删除失败！')
          }
        })
      },
      unban(index, row) { //解封按钮
        this.axios.put('/api/unbanUser/' + row.Id)
        .then(res => {
          if(res.data.code == 200){
            this.getUser() //重新获取用户列表
            this.$message.success('解封成功！')
          }else{
            this.$message.error('解封失败！')
          }
        }).catch(e => {
          console.log(e);
        })
      },
      banned(index, row) { //封禁按钮
        this.axios.put('/api/bannedUser/' + row.Id)
        .then(res => {
          if(res.data.code == 200){
            this.getUser() //重新获取用户列表
            this.$message.success('封禁成功！')
          }else{
            this.$message.error('封禁失败！')
          }
        }).catch(e => {
          console.log(e);
        })
      },
      handleDelete(index, row) {
        var users = [] //空的用户数组
        users.push(row) //把要删除的用户push进空数组
        this.axios.post('/api/delUser',users) //因为是数组，所以可以使用批量删除的接口
        .then(res => {
          if(res.data.code == 200){
            this.getUser()
            this.$message.success('删除成功！')
          }else{
            this.$message.error('删除失败！')
          }
        })
      },
    },
  }
</script>
<style lang="less" scoped>
  .userContainer{
    background-color: #fff;
    padding: 20px;
    .title{
      text-align: left;
      border-left: 2px solid rgb(10, 158, 96);
      padding-left: 20px;
      font-size: 18px;
      margin: 10px 0;
    }
    .avatar{
      img{
        height: 80px;
        width: 80px;
      }
    }
  }
</style>
