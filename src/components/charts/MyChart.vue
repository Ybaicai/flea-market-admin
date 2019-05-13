<template>
    <div id="chart" ref="chart"></div>
</template>
<script>
export default {
  props: ['datetime', 'report'],
  data() {
    return {
    };
  },
  mounted() {
    this.$nextTick(() => {     //初始化
      console.log(this.datetime);

      this.initChart();
      this.getChartData();
      window.addEventListener("resize", () => {
        this.resize();           //监听屏幕大小，来刷新画布
      });
    });
  },
  methods: {
    //查询图表数据  动态的改变数据
    getChartData() {
      // this.chart.setOption({
      //   xAxis: {
      //     data: this.xAxisdata
      //   },
      //   series: {
      //     data: this.seriesdata
      //   }
      // });
      this.chart.hideLoading();
    },
    //初始化图表
    initChart() {
      let option = {
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'pie'
          }]
      };

      this.chart = this.$echarts.init(this.$refs.chart);   //定义
      this.chart.showLoading();  //等待的显示
      this.chart.setOption(option);  //展示
      this.chart.resize(); //刷新画布
    },
    resize() {
      if (this.chart) {
        this.chart.resize();
      }
    }
  },
};
</script>
<style scoped>
#chart {
  width: 100%;
  height: 500px;
}
</style>