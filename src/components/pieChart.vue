<template>
  <div class="chart-box" ref="myChart"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: ["data"],
  data() {
    return {
      myChart: null,
    };
  },
  watch: {
    data(newD, oldD) {
      if (newD) {
        this.initChart();
      }
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.getOptions());
    },
    getOptions() {
      var options = {
        series: [
          {
            name: "月总人数",
            type: "pie",
            color: ["#0A406B", "#03A9F2", "#6FEDFF", "#84A4B3"],
            center: ["45%", "50%"],
            radius: ["35%", "60%"],
             roseType: 'area',
            avoidLabelOverlap: false,
            label: {
                // color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
                lineStyle: {
                    // color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 1,
                length: 10,
                length2: 20
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            data: this.data
          },
        ],
      };

      return options;
    },
  },
};
</script>
<style scoped>
.chart-box {
  width: 100%;
  height: 100%;
}
</style>