<template>
  <div>
    <div class="sex-name">
      <span>男性</span>
      <span>女性</span>
    </div>
    <div ref="chart6" style="width: 120px;height: 120px;" class="chart6"></div>
    <div ref="chart7" style="width: 120px;height: 120px;" class="chart7"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  props:["data"],
  mounted() {
    // 性别图表
    this.chart6 = echarts.init(this.$refs.chart6);
    this.chart6.setOption(this.initPieChart(this.data && this.data.length>1?this.data[1].genderCount:0, "#1F95FF"));
    this.chart7 = echarts.init(this.$refs.chart7);
    this.chart7.setOption(this.initPieChart(this.data && this.data.length>2?this.data[2].genderCount:0, "#1FC7B5"));
  },
  watch:{
    data(){
      this.chart6 = echarts.init(this.$refs.chart6);
      this.chart6.setOption(this.initPieChart(this.data && this.data.length>1?this.data[1].genderCount:0, "#1F95FF"));
      this.chart7 = echarts.init(this.$refs.chart7);
      this.chart7.setOption(this.initPieChart(this.data && this.data.length>2?this.data[2].genderCount:0, "#1FC7B5"));
    }
  },
  methods: {
    initPieChart(val, colorText) {
      let option = {
        label: {
          normal: {
            show: true,
            position: "center",
            formatter: ({ data }) => `${data.value.toFixed(2)}%`
          },
          emphasis: {
            show: true
          }
        },
        series: [
          {
            type: "pie",
            radius: ["60%", "66%"],
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0.3,
                    y2: 0.5,
                    colorStops: [
                      {
                        offset: 0.3,
                        color: "#3a3a3a" // 0% 处的颜色
                      },
                      {
                        offset: 0.9,
                        color: "#979797" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  borderWidth: 200
                }
              }
            ]
          },
          {
            type: "pie",
            radius: ["56%", "72%"],
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100 - val,
                itemStyle: {
                  opacity: 0
                }
              },
              {
                value: val,
                itemStyle: {
                  color: colorText,
                  borderColor: "#050814",
                  borderWidth: 3
                },
                label: {
                  normal: {
                    show: true,
                    position: "center",
                    formatter: ({ data }) => `${data.value.toFixed(0)}%\n`,
                    fontSize: 15,
                    fontFamily: "DIN",
                    lineHeight: 15,
                    color: "#FFFFFF",
                    verticalAlign: "top",
                    height: 1
                  },
                  emphasis: {
                    show: true
                  }
                }
              }
            ]
          }
        ]
      };

      return option;
    }
  }
};
</script>
<style scoped>
/* 性别图标样式 */
.sex-name {
  width: 173px;
  position: absolute;
  top: 0px;
  right: 0px;
  color: #fff;
  font-size: 10px;
  opacity: 0.6;
}

.sex-name span {
  display: inline-block;
  width: 50%;
  float: left;
  text-align: center;
}

.chart5 {
  position: absolute;
  top: 0px;
  left: 120px;
  transform: scale(0.8);
  z-index: 2;
}

.chart55 {
  position: absolute;
  top: 10px;
  left: 0px;
  z-index: 2;
}

.chart6 {
  position: absolute;
  top: -61px;
  left: -188px;
  transform: scale(0.77);
  z-index: 2;
}

.chart7 {
  position: absolute;
  top: -61px;
  left: -102px;
  transform: scale(0.77);
  z-index: 2;
}
</style>