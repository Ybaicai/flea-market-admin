<template>
  <div class="saleContainer">
    <div class="title-form">已上架商品</div>
    <hr>
    <div class="saledContainer">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品分类">
                <span>{{ props.row.category_id }}</span>
              </el-form-item>
              <el-form-item label="商品数量">
                <span>{{ props.row.stock }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.detail }}</span>
              </el-form-item>
              <el-form-item label="上架时间">
                <span>{{ props.row.update_time }}</span>
              </el-form-item>
              <el-form-item label="商品相册">
                <span v-for="item in props.row.album" :key="item.id">
                  <img :src="item.img_url" alt="" style="width:70px;height:70px;margin:15px 10px 0 0;">
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="商品封面"
          align="center">
          <template slot-scope="scope">
            <img :src="scope.row.main_img" alt="" style="width:70px;height:70px;">
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="name"
          align="center">
        </el-table-column>
        <el-table-column
          label="商品价格"
          align="center">
          <template slot-scope="scope">￥{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="操作"
        align="center">
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              style="padding:0"
              placeholder="输入商品名关键字"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDown(scope.$index,scope.row)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px;text-align:left;">
        <el-button type="danger" @click="delSelect">批量删除</el-button>
        <el-button type="danger" @click="downSelect">批量下架</el-button>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        :total="total"
        layout="prev, pager, next">
      </el-pagination>
    </div>
    <div class="title-form">已下架商品</div>
    <hr>
    <div class="saledContainer">
      <el-table
        :data="tableData1.filter(data => !search1 || data.name.toLowerCase().includes(search1.toLowerCase())).slice((currentPage1-1)*pagesize1,currentPage1*pagesize1)"
        @selection-change="handleSelectionChange1"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品分类">
                <span>{{ props.row.category_id }}</span>
              </el-form-item>
              <el-form-item label="商品数量">
                <span>{{ props.row.stock }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.detail }}</span>
              </el-form-item>
              <el-form-item label="上架时间">
                <span>{{ props.row.update_time }}</span>
              </el-form-item>
              <el-form-item label="商品相册">
                <span v-for="item in props.row.album" :key="item.id">
                  <img :src="item.img_url" alt="" style="width:70px;height:70px;margin:15px 10px 0 0;">
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="商品封面"
          align="center">
          <template slot-scope="scope">
            <img :src="scope.row.main_img" alt="" style="width:70px;height:70px;">
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="name"
          align="center">
        </el-table-column>
        <el-table-column
          label="商品价格"
          align="center">
          <template slot-scope="scope">￥{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="操作"
        align="center">
          <template slot="header">
            <el-input
              v-model="search1"
              size="mini"
              style="padding:0"
              placeholder="输入商品名关键字"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleUp(scope.$index,scope.row)">上架</el-button>
            <el-button
            size="mini"
            type="warning"
            @click="setSpecials(scope.row)">特价</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px;text-align:left;">
        <el-button type="danger" @click="delSelect">批量删除</el-button>
        <el-button type="success" @click="upSelect">批量上架</el-button>
        <el-button type="warning" @click="setSelect">批量特价</el-button>
      </div>
      <el-pagination
        @current-change="handleCurrentChange1"
        :current-page.sync="currentPage1"
        :page-size="pagesize1"
        :total="total1"
        layout="prev, pager, next">
      </el-pagination>
    </div>
    <div class="title-form">特价商品</div>
    <hr>
    <div class="saledContainer">
      <el-table
        :data="tableData2.filter(data => !search || data.name.toLowerCase().includes(search2.toLowerCase())).slice((currentPage2-1)*pagesize2,currentPage2*pagesize2)"
        @selection-change="handleSelectionChange2"
        style="width: 100%">
        <el-table-column
          type="selection"
          align="center">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品分类">
                <span>{{ props.row.category_id }}</span>
              </el-form-item>
              <el-form-item label="商品数量">
                <span>{{ props.row.stock }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.detail }}</span>
              </el-form-item>
              <el-form-item label="上架时间">
                <span>{{ props.row.update_time }}</span>
              </el-form-item>
              <el-form-item label="商品相册">
                <span v-for="item in props.row.album" :key="item.id">
                  <img :src="item.img_url" alt="" style="width:70px;height:70px;margin:15px 10px 0 0;">
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="商品封面"
          align="center">
          <template slot-scope="scope">
            <img :src="scope.row.main_img" alt="" style="width:70px;height:70px;">
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="name"
          align="center">
        </el-table-column>
        <el-table-column
          label="商品价格"
          align="center">
          <template slot-scope="scope">￥{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="操作"
        align="center">
          <template slot="header">
            <el-input
              v-model="search2"
              size="mini"
              style="padding:0"
              placeholder="输入商品名关键字"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="cancelSpecial(scope.row)">取消特价</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px;text-align:left;">
        <el-button type="primary" @click="cancelSelect">批量取消特价</el-button>
      </div>
      <el-pagination
        @current-change="handleCurrentChange2"
        :current-page.sync="currentPage2"
        :page-size="pagesize2"
        :total="total2"
        layout="prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagesize:6,//每页的数据条数
      currentPage:1,//默认开始页面
      total: 0,//上架商品总条数
      pagesize1:6,//每页的数据条数
      currentPage1:1,//默认开始页面
      total1: 0,//下架商品总条数
      pagesize2:6,//每页的数据条数
      currentPage2:1,//默认开始页面
      total2: 0,//特价商品总条数
      tableData: [],
      tableData1: [],
      tableData2: [],
      multipleSelection: [], //选中的商品
      multipleSelection1: [], //选中的商品
      multipleSelection2: [], //选中的商品
      search: '', //搜索上架关键字
      search1: '', //搜索下架关键字
      search2: '', //搜索下架关键字
    }
  },
  created() {
    this.getAllUP();
    this.getAllDown()
    this.getSpecialList()
  },
  methods: {
    getAllUP(){ //获取已上架商品
      this.axios.get('/api/getAllUP')
      .then(res => {
        this.tableData = res.data
        this.total = res.data.length
      }).catch(e => {
        console.log(e);
      })
    },
    getAllDown(){ //获取已下架商品
      this.axios.get('/api/getAllDown')
      .then(res => {
        this.tableData1 = res.data
        this.total1 = res.data.length
      }).catch(e => {
        console.log(e);
      })
    },
    handleDown(index,row){ //下架一个
      this.axios.put('/api/downGoods/'+row.Id)
      .then(res => {
        if(res.data.code == 200){
          this.getAllUP()
          this.getAllDown()
          this.$message.success('下架成功！')
        }else{
          this.$message.success('下架失败！')
        }
      }).catch(e=>{
        console.log(e);

      })

    },
    downSelect(){ //批量下架
      if (this.multipleSelection.length<1) {
        this.$message('请勾选要下架的商品！')
        return false
      }
      this.axios.put('/api/downSelectGoods',this.multipleSelection)
      .then(res => {
        if(res.data.code == 200){
          this.getAllUP()
          this.getAllDown()
          this.$message.success('下架成功！')
        }else{
          this.$message.error('下架失败！')
        }
      })
    },
    handleUp(index,row){
      this.axios.put('/api/upGoods/'+row.Id)
      .then(res => {
        if(res.data.code == 200){
          this.getAllUP()
          this.getAllDown()
          this.$message.success('上架成功！')
        }else{
          this.$message.success('上架失败！')
        }
      }).catch(e=>{
        console.log(e);

      })
    },
    upSelect(){
      if (this.multipleSelection1.length<1) {
        this.$message('请勾选要上架的商品！')
        return false
      }
      this.axios.put('/api/upSelectGoods',this.multipleSelection1)
      .then(res => {
        if(res.data.code == 200){
          this.getAllUP()
          this.getAllDown()
          this.$message.success('上架成功！')
        }else{
          this.$message.error('上架失败！')
        }
      })
    },
    handleDelete(row){ //删除一个
      var goodsList = []
      goodsList.push(row)
      this.axios.post('/api/delGoods', goodsList)
      .then(res => {
        console.log(res.data);

        if(res.data.code == 200){
          this.getAllUP()
          this.getAllDown()
          this.$message.success('删除成功！')
        }else{
          this.$message.error('删除失败！')
        }
      })
    },
    delSelect(){ //批量删除
      if (this.multipleSelection.length<1) {
        this.$message('请勾选要删除的商品！')
        return false
      }
      this.axios.post('/api/delGoods',this.multipleSelection)
      .then(res => {
        if(res.data.code == 200){
          this.getAllUP()
          this.$message.success('删除成功！')
        }else{
          this.$message.error('删除失败！')
        }
      })
    },
    delSelect1(){
      if (this.multipleSelection1.length<1) {
        this.$message('请勾选要删除的商品！')
        return false
      }
      this.axios.post('/api/delGoods',this.multipleSelection1)
      .then(res => {
        if(res.data.code == 200){
          this.getAllDown()
          this.$message.success('删除成功！')
        }else{
          this.$message.error('删除失败！')
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
    },
    handleCurrentChange(val) { //选择页数
      this.currentPage = val
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val
    },
    handleCurrentChange2(val) {
      this.currentPage1 = val
    },
    getSpecialList(){
      this.axios.get('/api/getSpecial')
      .then(res => {
        this.tableData2 = res.data
        this.total2 = res.data.length
      }).catch(e => {
        console.log(e);
      })
    },
    setSpecials(row){
      var specialList = []
      specialList.push(row)
      this.axios.post('/api/setSpecial',specialList)
      .then(res => {
        if(res.data.code == 200){
          this.getSpecialList()
          this.getAllDown()
          this.$message.success('设置成功！')
        }else{
          this.$message.error('设置失败！')
        }
      }).catch(e => {
        console.log(e);
      })
    },
    setSelect(){
      if (this.multipleSelection1.length<1) {
        this.$message('请勾选商品！')
        return false
      }
      this.axios.post('/api/setSpecial',this.multipleSelection1)
      .then(res => {
        if(res.data.code == 200){
          this.getSpecialList()
          this.getAllDown()
          this.$message.success('设置成功！')
        }else{
          this.$message.error('设置失败！')
        }
      })
    },
    cancelSpecial(row){
      var specialList = []
      specialList.push(row)
      this.axios.post('/api/cancelSpecial',specialList)
      .then(res => {
        if(res.data.code == 200){
          this.getAllDown()
          this.getSpecialList()
          this.$message.success('取消成功！')
        }else{
          this.$message.error('取消失败！')
        }
      }).catch(e => {
        console.log(e);
      })
    },
    cancelSelect(){
      if (this.multipleSelection2.length<1) {
        this.$message('请勾选商品！')
        return false
      }
      this.axios.post('/api/cancelSpecial',this.multipleSelection2)
      .then(res => {
        if(res.data.code == 200){
          this.getAllDown()
          this.getSpecialList()
          this.$message.success('取消成功！')
        }else{
          this.$message.error('取消失败！')
        }
      })
    }
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
      margin-bottom: 30px;
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

