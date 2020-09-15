<template>
  <div class="module">
    <title-bar text="告警趋势图（近12天）" number="1" type="1"></title-bar>
    <div class="lineChart" ref="lineChart"></div>
    <div class="top-info">
      <div v-for="(item,index) in yData" :key="index">{{item}}</div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import TitleBar from "../../components/titleBar";
import { symbolImgBase64 } from "../../../static/utils/imgBase64Data";
export default {
  props: ["data"],
  components: {
    TitleBar,
  },
  data() {
    return {
      xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      yData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      myChart: null,
    };
  },
  watch: {
    data(newD, oldD) {
      if (newD) {
        this.xData = [];
        this.yData = [];
        this.showData();
        if (this.myChart) {
          this.myChart.setOption(
            {
              xAxis: {
                data: this.xData,
              },
              series: [
                {
                  name: "告警",
                  data: this.yData,
                },
              ],
            },
            { notMerge: false, lazyUpdate: false, silent: false }
          );
        }
      }
    },
  },
  mounted() {
    this.xData = [];
    this.yData = [];
    this.showData();
    this.initChart();
  },
  methods: {
    // 处理数据
    showData() {
      this.data.forEach((element, index) => {
        if (index < 12) {
          var timestamp = new Date().valueOf();
          var newDate = new Date(timestamp - 1000 * 3600 * 24 * (index +1));
          var dateStr =
           ((newDate.getMonth() + 1 < 10 ? "0" : "") +
            (newDate.getMonth() + 1) +
            "-" +
            (newDate.getDate() < 10 ? "0" : "") +
            newDate.getDate()) ;
          this.xData.unshift(dateStr);
          this.yData.unshift(element.total);
        }
      });
    },

    // 初始化地图
    initChart() {
      this.myChart = echarts.init(this.$refs.lineChart); //这里是为了获得容器所在位置
      window.onresize = this.myChart.resize;
      let option = {
        grid: {
          show: false,
          left: 0,
          right: 0,
          top: 35,
          bottom: 30,
        },
        xAxis: {
          type: "category",
          data: this.xData,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#3F96A5",
            },
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: "#3F96A5",
            },
          },
          axisLabel: {
            // rotate: 20,
            show: true,
            fontSize: "9",
            color: "#3F96A5",
            // backgroundColor: "rgba(0,85,150,0.3)",
            padding: [9, 0, 4, 0],
          },
          axisPointer: {
            type: "shadow",
          },
          splitLine: {
            show: false, //去掉网格线
          },
        },
        yAxis: [
          {
            type: "value",
            // name: "背景",
            min: 0,
            max: 100,
            interval: 50,
            axisLabel: {
              show: false,
              formatter: "{value} ml",
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#3F96A5",
              },
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: "#3F96A5",
              },
            },
            splitLine: {
              show: false, //去掉网格线
            },
          },
          {
            type: "value",
            // name: "告警",
            min: 0,
            max: 130,
            interval: 60,
            axisLabel: {
              show: false,
              formatter: "{value}",
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#3F96A5",
              },
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: "#3F96A5",
              },
            },
            splitLine: {
              show: false, //去掉网格线
            },
          },
        ],
        series: [
          {
            name: "背景",
            type: "bar",
            barWidth: 20,
            itemStyle: {
              color: "#0A1934",
            },
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          },
          {
            name: "告警",
            type: "line",
            yAxisIndex: 1,
            lineStyle: {
              color: "#3F96A5",
              borderWidth: 2,
              // type: "dashed", // dotted
            },
            zlevel: 1,
            symbol: symbolImgBase64,
            showSymbol: true,
            symbolSize: 18,
            itemStyle: {
              color: "#3F96A5",
              borderWidth: 2,
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(63,150,165,0.8)", // 0% 处的颜色 #3F96A5
                  },
                  {
                    offset: 1,
                    color: "rgba(63,150,165,0.00)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            data: this.yData,
          },
        ],
      };

      this.myChart.setOption(option);
    },
  },
};
</script>
<style scoped>
.module {
  min-height: 260px;
  position: relative;
}
.module .title-bar {
  width: 446px;
}
.module .title-bar span {
  font-family: PingFangSC-Semibold !important;
  color: #b9e2e8;
}

.lineChart {
  width: 100%;
  height: 266px;
}

.top-info {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 10px;
  color: #43baff;
  position: absolute;
  left: 0;
  top: 50px;
}

.top-info > div {
  position: relative;
  min-width: 20px;
  text-align: center;
}

.top-info > div::after {
  content: "";
  width: 10px;
  height: 5px;
  background: url(../../assets/imgs/icon-arrow.png) no-repeat center;
  background-size: 10px 5px;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}
</style>