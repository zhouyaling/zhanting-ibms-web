<template>
  <div style="position:relative">
    <ac-sub-title text="区域客流数"></ac-sub-title>
    <div ref="chart4" style=" width:100%;height: 170px;" class="chart4"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import AcSubTitle from "../../components/acSubTitle";
import { symbolImgBase64 } from "../../../static/utils/imgBase64Data";
export default {
  props: ["dataX", "dataY1"],
  components: {
    AcSubTitle
  },
  data() {
    return {};
  },
  watch: {
    dataX() {
      this.chart4 = echarts.init(this.$refs.chart4);
      this.chart4.setOption(this.initChart());
    }
  },
  mounted() {
    this.chart4 = echarts.init(this.$refs.chart4);
    this.chart4.setOption(this.initChart());
  },
  methods: {
    initChart() {
      var option = {
        grid: {
          top: 15,
          bottom: 28,
          left: 0,
          right: 0
        },
        xAxis: 
          {
            type: "category",
            data: this.dataX,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#43BAFF"
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: "#43BAFF"
              }
            },
            axisLabel: {
              rotate: 0,
              show: true,
              fontSize: "7",
              color: "#797979",
              padding:[0,0,0,0],
              formatter: function(params) {
                var newParamsName = ""; // 最终拼接成的字符串
                var paramsNameNumber = params.length; // 实际标签的个数
                var provideNumber = 2; // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""; // 表示每一次截取的字符串
                    var start = p * provideNumber; // 开始截取的位置
                    var end = start + provideNumber; // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr; // 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName;
              }
            },
            axisPointer: {
              type: "shadow"
            },
            splitLine: {
              show: false //去掉网格线
            }
          },
        yAxis: [
          {
            type: "value",
            min: 0,
            max: 100,
            interval: 50,
            axisLabel: {
              show: false,
              formatter: "{value} ml"
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#43BAFF"
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: "#43BAFF"
              }
            },
            splitLine: {
              show: false //去掉网格线
            }
          },
          {
            type: "value",
            min: 0,
            max: 200,
            interval: 60,
            axisLabel: {
              show: false,
              formatter: "{value}"
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#43BAFF"
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: "#43BAFF"
              }
            },
            splitLine: {
              show: false //去掉网格线
            }
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: 35,
            itemStyle: {
              color: "#060E24"
            },
            // emphasis: {
            //   itemStyle: {
            //     color: "#060E24"
            //   }
            // },
            data: this.convarData(this.dataY1)
          },
          {
            type: "line",
            yAxisIndex: 1,
            zlevel: 1,
            symbol: symbolImgBase64,
            showSymbol: true,
            symbolSize: 16,
            animationEasing: "cubicOut",
            animationDuration: 2000,
            itemStyle: {
              color: "#43BAFF"
            },
            lineStyle:{
              width:1,
              color:"#3991C5"
            },
            label: {
              show: true,
              formatter: ({ data }) => `${data}人`,
              fontSize: 10,
              color: "#979797",
              fontFamily: "DIN"
            },
            data: this.dataY1
          }
        ]
      };
      return option;
    },
    convarData(data){
      let res = [];
      data.forEach(element => {
        res.push(100)
      });

      return res;
    }
  }
};
</script>
<style scoped>
</style>