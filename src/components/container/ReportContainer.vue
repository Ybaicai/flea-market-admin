<template>
  <div class="reportContainer">
    <div class="block">
      <span class="demonstration">选择时间</span>
      <el-select v-model="dateTime" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
    </div>
    <div class="selectReport">
      <span class="demonstration">选择报表</span>
      <el-select v-model="report" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
      <el-button type="success" plain @click="showChart">查看报表</el-button>
    </div>
    <div class="chart">
      <el-collapse-transition>
        <div id="echart" v-show="show">
          <myChart :datetime="dateTime" :report="report"></myChart>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>
<script>
import myChart from '../charts/MyChart.vue'
export default {
  data() {
    return {
      options: [
        {
          value: '1',
          label: '昨天'
        }, {
          value: '2',
          label: '上周'
        }, {
          value: '3',
          label: '上个月'
        }
      ],
      options1: [
        {
          value: '1',
          label: '财务报表'
        }, {
          value: '2',
          label: '销量报表',
        }, {
          value: '3',
          label: '用户注册量'
        }
      ],
      dateTime: '',
      report: '',
      show: true,
    };
  },
  methods: {
    showChart(){
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 500);
    }
  },
  components: {
    myChart
  }
}
</script>
<style lang="less" scoped>
  .reportContainer{
    background-color: #fff;
    padding: 20px;
    overflow: hidden;
    .block{
      text-align: left;
      float: left;
      margin: 10px;
    }
    .selectReport{
      float: left;
      margin: 10px;
    }
    .chart{
      height: 500px;
      margin-top: 70px;
      #echart{
        height: 500px;
      }
    }
  }
</style>

