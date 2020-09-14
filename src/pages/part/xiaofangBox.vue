<template>
  <div class="xiaofang-box">
    <div ref="myEchart" class="xf-echarts"></div>
    <div class="chart-number">
      <span>{{data?data.all:0}}</span>
      <span>{{data?data.normal:0}}</span>
      <span>{{data?data.alarm:0}}</span>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  props: ["data"],
  data() {
    return {
      myChart: null,
      yData: [0, 0, 0]
    };
  },
  watch: {
    data(newD, oldD) {
      this.yData = [];
      this.yData.push(this.data.all);
      this.yData.push(this.data.normal);
      this.yData.push(this.data.alarm);
      this.initChart();
    }
  },

  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.myEchart);
      window.onresize = this.myChart.resize;
      let option = this.getChartOpt();
      this.myChart.setOption(option, true);
    },
    getChartOpt() {
      var option = {
        grid: {
          top: "80px",
          left: "7%",
          right: "7%",
          bottom: "40px"
        },
        xAxis: {
          data: ["设备总数", "正常数", "告警数"],
          axisTick: { show: false },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#206B9B"
            }
          },
          axisLabel: {
            color: "#ffffff",
            fontSize: 9
            // fontFamily:'PingFangSC',
          }
        },
        yAxis: {
          splitLine: {
            show: true,
            interval: 0,
            lineStyle: {
              color: "#206B9B",
              type: "dotted"
            }
          },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false }
        },
        // color: ["#35AEF4"],
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#3AB9FF" // 0% 处的颜色
              },
              {
                offset: 0.15,
                color: "rgba(58,185,255,0.9)" // 100% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(58,185,255,0.2)" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(58,185,255,0)" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        ],
        series: [
          {
            name: "hill",
            type: "pictorialBar",
            barCategoryGap: "40%",
            symbol: "path://M0,10 L10,10 L5,0 L0,10 z",
            // symbol:
            //   "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            itemStyle: {
              opacity: 1
            },
            emphasis: {
              itemStyle: {
                opacity: 1
              }
            },
            data: this.yData,
            z: 10
          }
        ]
      };

      return option;
    }
  }
};
</script>
<style scoped>
.xiaofang-box {
  width: 308px;
  height: 196px;
  background: url(../../assets/imgs/xiaofang-box.png) no-repeat center;
  background-size: 100% 100%;
  position: relative;
}

.xf-echarts {
  width: 308px;
  height: 196px;
}

.chart-number {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 60px;
  width: 88%;
  margin: 0 6%;
}

.chart-number > span {
  display: block;
  width: 33.3%;
  font-family: PARaDOS;
  font-size: 15.3px;
  color: #ffffff;
  letter-spacing: 0;
  min-width: 20px;
  text-align: center;
}
</style>