<template>
    <div id="scroll-board">
        <div class="check-action">
            <div class="active">电</div>
            <div > 水</div>
        </div>
        <div class="lineChart" ref="lineChart"></div>.
    </div>
</template>
<<script>
import echarts from "echarts";
import TitleBar from "../../components/titleBar";
import { symbolImgBase64 } from "../../../static/utils/imgBase64Data";
export default {
  components: {
    TitleBar,
  },
  data() {
    return {
      xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      yData: [10, 20, 30, 20, 20, 40, 50, 90,70, 110, 100, 80],
       yData2: [90,70, 110, 100, 80,10, 20, 30, 20, 20, 40, 50],
      myChart: null,
    };
  },
  watch: {
    // data(newD, oldD) {
    //   if (newD) {
    //     // this.xData = [];
    //     // this.yData = [];
    //     // this.showData();
    //     if (this.myChart) {
    //       this.myChart.setOption(
    //         {
    //           xAxis: {
    //             data: this.xData,
    //           },
    //           series: [
    //             {
    //               name: "告警",
    //               data: this.yData,
    //             },
    //           ],
    //         },
    //         { notMerge: false, lazyUpdate: false, silent: false }
    //       );
    //     }
    //   }
    // },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    // 初始化地图
    initChart() {
      this.myChart = echarts.init(this.$refs.lineChart); //这里是为了获得容器所在位置
      window.onresize = this.myChart.resize;
      let option = {
        grid: {
          show: false,
          left: 50,
          right: 0,
          top: 40,
          bottom: 30,
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            icon : 'emptyCircle',//图例的形状
            itemWidth:10,//图例的宽
            data:['当日量','昨日量']
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
              show: true,
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
              show: true, //去掉网格线
            },
          },
          {
            type: "value",
            // name: "告警",
            min: 0,
            axisLabel: {
              show: true,
              formatter: "{value}",
            },
            axisLine: {
              show: true,
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
              show: true, //去掉网格线
               lineStyle:{
                color: ['#315070'],
                width: 1,
                type: 'solid'
            }
            },
          },
        ],
        series: [
          {
            name: "当日量",
            type: "line",
            yAxisIndex: 1,
            lineStyle: {
              color: "#F19149",
              borderWidth: 2,
            },
            zlevel: 1,
            // symbol: symbolImgBase64,
            showSymbol: true,
            symbolSize: 10,
            itemStyle: {
              color: "#F19149",
              borderWidth: 2,
            },
            // areaStyle: {
            //   color: {
            //     type: "linear",
            //     x: 0,
            //     y: 0,
            //     x2: 0,
            //     y2: 1,
            //     colorStops: [
            //       {
            //         offset: 0,
            //         color: "rgba(241,145,73,0.8)", // 0% 处的颜色 #3F96A5
            //       },
            //       {
            //         offset: 1,
            //         color: "rgba(241,145,73,0.00)", // 100% 处的颜色
            //       },
            //     ],
            //     global: false, // 缺省为 false
            //   },
            // },
            data: this.yData,
          },
          {
            name: "昨日量",
            type: "line",
            yAxisIndex: 1,
            lineStyle: {
              color: "#5971C0",
              borderWidth: 2,
            },
            zlevel: 1,
            // symbol: symbolImgBase64,
            showSymbol: true,
            symbolSize: 10,
            itemStyle: {
              color: "#5971C0",
              borderWidth: 2,
            },
            // areaStyle: {
            //   color: {
            //     type: "linear",
            //     x: 0,
            //     y: 0,
            //     x2: 0,
            //     y2: 1,
            //     colorStops: [
            //       {
            //         offset: 0,
            //         color: "rgba(89,113,192,0.8)", // 0% 处的颜色 #3F96A5
            //       },
            //       {
            //         offset: 1,
            //         color: "rgba(89,113,192,0.00)", // 100% 处的颜色
            //       },
            //     ],
            //     global: false, // 缺省为 false
            //   },
            // },
            data: this.yData2,
          },
        ],
      };

      this.myChart.setOption(option);
    },
  },
};
</script>
<style scoped>
#scroll-board {
    width: 45%;
    height: 260px;
    box-sizing: border-box;
    text-align: center;
    float: left;
    margin: 0 2.5%;
    margin-top: 30px;
    position: relative;
}

.lineChart {
    width: 100%;
    height: 260px;
}

.check-action {
    position: absolute;
    top: 0;
    right: 0px;
    width: 80px;
    border-radius: 4px;
    height: 24px;
    border: 1px solid #1981F6;
    font-size: 12px;
}

.check-action>div {
    width: 50%;
    float: left;
    line-height: 24px;
    box-sizing: border-box;
}

.check-action>div:nth-of-type(1) {
    border-right: 1px solid #1981F6;
}

.check-action>div.active {
    background:#1981F6;
}

</style>

