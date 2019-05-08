<template>
  <div class="categoryContainer">
    <div class="title">商品分类管理</div>
    <div class="categoryInput">
      <el-input
        placeholder="请输入分类名称"
        v-model="category"
        clearable
        style="width:200px">
      </el-input>
      <el-button type="primary" @click="addCategory">添加分类</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData.filter(data => !search || data.category_name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center">
      </el-table-column>
      <el-table-column
        align="center"
        prop="Id"
        label="分类Id">
      </el-table-column>
      <el-table-column
        align="center"
        prop="category_name"
        label="分类名称">
      </el-table-column>
      <el-table-column
        width="150"
        align="center">
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            style="padding:0"
            placeholder="输入分类名关键字"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="updateBtn(scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteCategory(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px;text-align:left;">
      <el-button type="danger" @click="delSelect">批量删除</el-button>
    </div>
    <el-dialog
      title="修改分类名称"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>Id: {{updateRow.Id}} </span>
      <el-input
        v-model="categoryName"
        clearable
        style="width:200px">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      category: '', //添加的分类名
      tableData: [],//分类数据表
      search: '', //搜索关键字
      multipleSelection: [], //选中的分类
      dialogVisible: false,
      updateRow: {}, //要修改的行
      categoryName: '', //要修改的分类名
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    getCategory(){
      this.axios.get('/api/getCategory')
      .then(res => {
        if(res.data.code == 200){
          this.tableData = res.data.data
        }else{
          console.log('获取分类失败');
        }
      }).catch(e => {
        console.log(e);
      })
    },
    addCategory(){
      var data = {
        category_name: this.category
      }
      this.axios.post('/api/addCategory',data)
      .then(res => {
        if(res.data.code == 200){
          this.getCategory()
          this.$message.success('添加成功！')
        }else if(res.data.code == 201){
          this.$message.error('分类已经存在！请勿重复添加！')
        }else{
          this.$message.error('添加失败！')
        }
      }).catch(e => {
        console.log(e);
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    updateBtn(row){
      this.dialogVisible = true
      this.updateRow = row
      this.categoryName = row.category_name
    },
    updateCategory() {
      if(this.categoryName.trim().length<1){
        this.$message.error('分类名不能为空！')
        return false
      }
      var data = {
        category_id: this.updateRow.Id,
        category_name: this.categoryName
      }
      this.axios.put('/api/updateCategory',data)
      .then(res => {
        if(res.data.code == 200){
          this.getCategory()
          this.$message.success('修改成功！')
          this.dialogVisible = false
        }else{
          this.dialogVisible = false
        }
      })
    },
    deleteCategory(index,row){
      var categorys = [] //空的分类数组
      categorys.push(row) //把要删除的分类push进空数组
      this.axios.post('/api/delCategory',categorys) //因为是数组，所以可以使用批量删除的接口
      .then(res => {
        if(res.data.code == 200){
          this.getCategory()
          this.$message.success('删除成功！')
        }else{
          this.$message.error('删除失败！')
        }
      })
    },
    delSelect(){ //批量操作
      if (this.multipleSelection.length<1) {
        this.$message('请勾选要删除的分类！')
        return false
      }
      this.axios.post('/api/delCategory',this.multipleSelection)
      .then(res => {
        if(res.data.code == 200){
          this.getCategory()
          this.$message.success('删除成功！')
        }else{
          this.$message.error('删除失败！')
        }
      })
    },
    handleClose(){ //关闭对话框
      this.dialogVisible = false
    }
  },
}
</script>
<style lang="less" scoped>
  .categoryContainer{
    background-color: #fff;
    padding: 20px;
    .title{
      text-align: left;
      border-left: 2px solid rgb(10, 158, 96);
      padding-left: 20px;
      font-size: 18px;
      margin: 10px 0;
    }
    .categoryInput{
      margin-top: 20px;
      text-align: left;
    }
  }
</style>

