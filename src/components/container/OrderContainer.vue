<template>
  <div class="OrderContainer">
    <div class="title">订单列表</div>
    <el-table
      ref="multipleTable"
      :data="tableData.filter(data => !search || data.order_item[0].goods_name.toLowerCase().includes(search.toLowerCase()))
      .slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="卖家:">
              <span>{{ props.row.shopkeeper}}</span>
            </el-form-item>
            <el-form-item label="收货地址:">
              <span>{{ props.row.address[0].province }} {{ props.row.address[0].city }} {{ props.row.address[0].area }} {{ props.row.address[0].detail }} </span>
            </el-form-item>
            <el-form-item label="收货人:">
              <span>{{ props.row.address[0].receiver_name }} {{ props.row.address[0].phone }} </span>
            </el-form-item>
            <el-form-item label="邮编:">
              <span>{{ props.row.address[0].zip }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="160"
        label="日期|单号">
        <template slot-scope="scope">
          <span style="display:block;margin-bottom:20px;">{{scope.row.create_time}}</span>
          <span>{{scope.row.order_no}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="300"
        label="商品">
        <template slot-scope="scope">
          <div class="goodsinfo">
            <img :src="scope.row.order_item[0].goods_img" alt="">
            <div class="goods_title">
              <span>{{ scope.row.order_item[0].goods_name }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="单价">
        <template slot-scope="scope">
          ￥{{scope.row.order_item[0].goods_price}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="数量">
        <template slot-scope="scope">
          {{scope.row.order_item[0].goods_count}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="实付款">
        <template slot-scope="scope">
          <span>{{scope.row.status===1?'￥'+scope.row.order_item[0].total_price:'未支付'}}</span>
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
            placeholder="输入商品标题搜索"/>
        </template>
        <template slot-scope="scope">
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
        total: 0,//订单总条数
        tableData: [],
        search: '',
        multipleSelection: [],
      }
    },
    created() {
      this.getOrder()
    },
    methods: {
      getOrder(){
        this.axios.get('/api/getAllOrder')
        .then(res => {
          if(res.data.code == 200){
            this.tableData = res.data.data
            this.total = res.data.data.length
          }else{
            console.log('获取订单失败');
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
      delSelect(){
        if (this.multipleSelection.length<1) {
          this.$message('请勾选要删除的订单！')
          return false
        }
        this.axios.post('/api/delOrder',this.multipleSelection)
        .then(res => {
          if(res.data.code == 200){
            this.getOrder()
            this.$message.success('删除成功！')
          }else{
            this.$message.error('删除失败！')
          }
        })
      },
      handleDelete(index, row) {
        var order = [] //空的订单数组
        order.push(row) //把要删除的订单信息push进空数组
        this.axios.post('/api/delOrder',order) //因为是数组，所以可以使用批量删除的接口
        .then(res => {
          if(res.data.code == 200){
            this.getOrder()
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
  .OrderContainer{
    background-color: #fff;
    padding: 20px;
    .title{
      text-align: left;
      border-left: 2px solid rgb(10, 158, 96);
      padding-left: 20px;
      font-size: 18px;
      margin: 10px 0;
    }
    .goodsinfo{
      display: flex;
      align-items: center;
      img{
        height: 80px;
        width: 80px;
      }
      .goods_title{
        width: 190px;
        align-items: center;
        margin-left: 5px;
        text-align: left;

      }
    }
  }
</style>
