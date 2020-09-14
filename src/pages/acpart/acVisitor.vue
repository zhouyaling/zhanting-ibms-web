<template>
  <div>
    <ac-sub-title text="到访次数比例(次)"></ac-sub-title>
    <div ref="chart2" style=" width:220px;height: 160px;" class="chart2"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import AcSubTitle from "../../components/acSubTitle";
export default {
  props: ["data"],
  components: {
    AcSubTitle
  },
  data() {
    return {
      chart2: null
    };
  },
  watch: {
    data() {
      this.chart2 = echarts.init(this.$refs.chart2);
      this.chart2.setOption(this.initChart());
    }
  },
  mounted() {
    // 到访次数比例图表
    this.chart2 = echarts.init(this.$refs.chart2);
    this.chart2.setOption(this.initChart());
  },
  methods: {
    initChart() {
      var option = {
        grid: {
          bottom: 35,
          top: 35,
          left: 15,
          right: 15
        },
        xAxis: {
          boundaryGap: false,
          type: "category",
          data:  this.data.dataX, // ["首次", "2次", "3次", "4次", "4次以上"],
          splitLine: {
            show: true,
            lineStyle: {
              color: "#3B70E9",
              type: "dotted"
            }
          },
          show: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            // rotate: 20,
            show: true,
            fontSize: "9",
            color: "#477DE4"
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          show: false
        },
        series: [
          {
            type: "line",
            step: "start",
            data: this.data.dataY,
            // animationEasing: "cubicOut",
            // animationDuration: 2000,
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAGCAYAAADQQP5pAAAABGdBTUEAALGPC/xhBQAAACxJREFUKBVj9Cy93MNAR8Dy/9//Yjrax8BET8tAdtHdQhZGBsYSevuSrvYBAJ4aBhACqJURAAAAAElFTkSuQmCC",
            symbolSize: 12,
            lineStyle: {
              opacity: 0
            },
            label: {
              show: true,
              formatter: ({ data }) => `${data}%`,
              fontSize: 10,
              color: "white",
              fontFamily: "DIN"
            }
          }
        ]
      };

      return option;
    }
  }
};
</script>
<style scoped>
.chart1 {
  width: 76px;
  height: 101px;
  background: url(../../assets/imgs/ancang/yuanzhu.png);
  background-size: 76px 101px;
  margin-top: 30px;
}

.chart1 .p1 {
  position: relative;
  top: 33px;
  left: 29px;
  background: url(../../assets/imgs/ancang/line-purple.png);
  background-size: 32px 3px;
  background-repeat: no-repeat;
  background-position-x: 33px;
  background-position-y: 8px;
  width: 65px;
  height: 15px;
}

.p1 > div {
  font-family: DIN;
  color: #ffffff;
  letter-spacing: 1.01px;
  width: 65px;
  height: 15px;
  font-size: 12px;
  transform: scale(0.65);
  left: -8px;
  position: relative;
}

.p1 > div:nth-of-type(2) {
  position: absolute;
  top: 0;
  left: 70px;
}

.p1 > div:nth-of-type(3) {
  position: absolute;
  top: 0;
  left: 100px;
}

.chart1 .p2 {
  position: relative;
  top: 48px;
  left: 29px;
  background: url(../../assets/imgs/ancang/line-green.png);
  background-size: 42px 3px;
  background-repeat: no-repeat;
  background-position-x: 23px;
  background-position-y: 6px;
  width: 65px;
  height: 15px;
}

.p2 div {
  font-family: DIN;
  color: #ffffff;
  letter-spacing: 1.01px;
  width: 65px;
  height: 15px;
  font-size: 12px;
  transform: scale(0.65);
  left: -8px;
  position: relative;
}

.p2 > div:nth-of-type(2) {
  position: absolute;
  top: 0;
  left: 70px;
}

.p2 > div:nth-of-type(3) {
  position: absolute;
  top: 0;
  left: 110px;
}

.chart1 .p3 {
  position: relative;
  top: -33px;
  left: 93px;
}

.p3 div {
  font-family: DIN;
  color: #56b1ff;
  letter-spacing: 1.01px;
  height: 15px;
  font-size: 12px;
  left: -8px;
  position: relative;
  transform: scale3d(0.9);
}

.p3 > div:nth-of-type(2) {
  font-family: DIN;
  position: absolute;
  top: 0;
  left: 56px;
  min-width: 61px;
}
</style>