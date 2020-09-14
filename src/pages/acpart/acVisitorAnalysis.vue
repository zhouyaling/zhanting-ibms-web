<template>
  <div style="position:relative">
    <ac-sub-title text="访客统计分析（单位：人）"></ac-sub-title>
    <div id="car-flow-chart" ref="car-flow-chart" style="width:100%;height:160px"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import AcSubTitle from "../../components/acSubTitle";
import { symbolImgBase64 } from "../../../static/utils/imgBase64Data";
export default {
  props: ["data"],
  components: {
    AcSubTitle
  },
  data() {
    return {
      legendData: ["所有访客", "新客户", "老客户"]
      // dataX:[1,2,3,4,5],
      // dataY1:[10,43,24,16,18],
      // dataY2:[10,23,2,16,18],
      // dataY3:[12,3,11,26,28]
    };
  },
  watch: {
    data() {
      this.chart4 = echarts.init(document.getElementById("car-flow-chart"));
      this.chart4.setOption(this.initChart());
    }
  },
  mounted() {
    this.chart4 = echarts.init(document.getElementById("car-flow-chart"));
    this.chart4.setOption(this.initChart());
  },
  methods: {
    initChart(dataY1) {
      var option = {
        grid: {
          left: 30,
          top: 20,
          bottom: 25,
          right: 5
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          right: "1%",
          top: "0px",
          orient: "horizontal",
          icon: "square",
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 10,
          textStyle: {
            fontSize: 9,
            color: "#ffffff"
          },
          data: this.legendData
        },
        color: ["#1B66E6", "#5E50E4", "#109090"],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,

            axisLabel: {
              interval: 0,
              rotate: "40",
              textStyle: {
                color: "#9CB3D6", //y轴字体的颜色
                fontSize: 8
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#4864E6" //设置 x 轴的颜色
              }
            },
            axisTick: {
              // 刻度线
              show: false
            },
            data: this.data.dataX
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#666" //设置 y 轴的颜色
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 9,
                color: "#9CB3D6" //y轴字体的颜色
              },
              formatter: "{value}"
            },
            axisTick: {
              show: false
            },
            splitLine: {
              // 水平线设置
              lineStyle: {
                color: "#0D172F"
              }
            }
          }
        ],
        series: [
          {
            name: this.legendData[0],
            type: "line",
            smooth: true, // 曲线
            symbol: "none",
            animationEasing: "cubicOut",
            animationDuration: 2000,
            itemStyle: {
              normal: {
                lineStyle: {
                }
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "rgba(27,102,230,0.1)" },
                  { offset: 0.7, color: "rgba(27,102,230,0.4)" },
                  { offset: 0, color: "rgba(27,102,230,0.5)" }
                ])
              }
            },
            data: this.data.dataY1
          },
          {
            name: this.legendData[1],
            type: "line",
            smooth: true, // 曲线
            symbol: "none",
            itemStyle: {
              normal: {
                lineStyle: {
                  // color: "transparent"
                }
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "rgba(94,80,228,0.1)" },
                  { offset: 0.7, color: "rgba(94,80,228,0.4)" },
                  { offset: 0, color: "rgba(94,80,228,0.5)" }
                ])
              }
            },
            data: this.data.dataY2
          },
          {
            name: this.legendData[2],
            type: "line",
            smooth: true, // 曲线
            symbol: "none",
            itemStyle: {
              normal: {
                lineStyle: {
                  // color: "transparent"
                }
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "rgba(16,144,144,0.1)" },
                  { offset: 0.7, color: "rgba(16,144,144,0.4)" },
                  { offset: 0, color: "rgba(16,144,144,0.5)" }
                ])
              }
            },
            data: this.data.dataY3
          }
        ]
      };

      return option;
    }
  }
};
</script>
<style scoped>
</style>