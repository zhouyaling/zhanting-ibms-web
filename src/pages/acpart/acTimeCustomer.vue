<template>
  <div>
    <div class="centerChart" @click="showBigChart(true)">
      <div class="icon-show"></div>
    </div>
    <div ref="chart5" style="width: 214px;height: 200px;" class="chart5"></div>
    <div
      class="big-centerChart"
      v-bind:class="bigChartPanel?'display-block show-chart-animation':''"
    >
      <div class="icon-hide" @click="showBigChart(false)"></div>
      <div class="big-centerchart-title">分时客流量</div>
      <div class="module-monitor-tab module-chart-tab">
        <div
          v-bind:class="currentChart55Tab=='day'?'active':''"
          v-on:click="changeChart55Tab('day')"
        >
          <span>今天</span>
        </div>
        <div
          v-bind:class="currentChart55Tab=='tomorrow'?'active':''"
          v-on:click="changeChart55Tab('tomorrow')"
        >
          <span>昨天</span>
        </div>
      </div>
      <div class="big-centerchart-bottom">
        <span>总人数：{{currentChart55Tab=='day'?dataDetail.dayCount:dataDetail.yesCount}}人</span>
        <span>
          环比昨日 {{dataDetail.periodAvg}}
          <img
            v-if="dataDetail.periodAvg>=0"
            src="../../assets/imgs/ancang/icon-up.png"
            alt
          />
          <img v-if="dataDetail.periodAvg<0" src="../../assets/imgs/ancang/icon-down.png" alt />
        </span>
        <span>
          <span
            class="color-blue-0"
          >{{currentChart55Tab=='day'?dataDetail.dayHighest:dataDetail.yesHighest}}</span>有较高来访
        </span>
      </div>
      <div ref="chart55" style="width: 470px;height: 290px" class="chart55"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  props: ["data", "dataDetail"],
  data() {
    return {
      bigChartPanel: false, // 显示分时客流量大图表
      currentChart55Tab: "day"
      // timeUserData: {
      //   dataX: [1, 2, 3, 4],
      //   dataY: [11, 22, 44, 66, 77, 88]
      // }, // 分时客流量
      // timeUserDataDetail: {
      //   dayCount: 0,
      //   dayHighest: "00:00",
      //   widths: [1, 2, 3, 4],
      //   heights: [11, 22, 44, 66, 77, 88],
      //   yesCount: 0,
      //   yesHighest: "00:00",
      //   yesHeights: [11, 22, 44, 66, 77, 88]
      // } // 分时客流量详细
    };
  },
  watch: {
    data() {
      this.chart5 = echarts.init(this.$refs.chart5);
      this.chart5.setOption(
        this.initChart5(this.data.dataX, this.data.dataY, "分时客流", 0)
      );
    },
    dataDetail() {
      this.chart55 = echarts.init(this.$refs.chart55);
      this.chart55.setOption(
        this.initChart5(
          this.dataDetail.dataX,
          this.dataDetail.todayDataY,
          "分时客流",
          0
        )
      );
    }
  },
  mounted() {
    // 分时客流量
    this.chart5 = echarts.init(this.$refs.chart5);
    this.chart5.setOption(
      this.initChart5(this.data.dataX, this.data.dataY, "分时客流", 0)
    );
  },
  methods: {
    // 切换当前查询分时客流量
    changeChart55Tab(mark) {
      return;
      this.currentChart55Tab = mark;
      this.getTimerUserDetail();
    },

    // 分时客流量详情
    getTimerUserDetail() {
      this.$axios
        .post(this.$acBaseUrl + "/api/visitor/query/todayVisitor", {
          projectId: this.projectId
        })
        .then(response => {
          console.log("分时客流量详情", response.data.data);
          this.timeUserDataDetail.yesterday = response.data.data.yesterday;
          this.timeUserDataDetail.days = response.data.data.days;
          this.timeUserDataDetail.per = response.data.data.per;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 展示大图表
    showBigChart(mark) {
      return
      this.bigChartPanel = mark;
      if (this.showBigChart) {
        this.chart55 = echarts.init(this.$refs.chart55);
        this.chart55.setOption(
          this.initChart5(
            this.dataDetail.dataX,
            this.dataDetail.todayDataY,
            "分时客流",
            0
          )
        );
      }
    },

    //
    initChart5(dataX, dataY, chartName, rotate) {
      let option = {
        grid: {
          left: "12%",
          top: 60,
          bottom: 60,
          right: "8%"
        },
        color: ["#4DFFDE"],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#FFFFFF", //y轴字体的颜色
                fontSize: 9
              },
              rotate: rotate || 0
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
            data: dataX
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#4864E6", //设置 y 轴的颜色
                fontSize: "10px"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#FFFFFF", //y轴字体的颜色
                fontSize: 9
              },
              formatter: "{value}"
            },
            axisTick: {
              // 刻度线
              show: false
            },
            splitLine: {
              // 水平线设置
              show: false,
              lineStyle: {
                color: "#4560DC",
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: chartName,
            type: "line",
            smooth: true, // 曲线
            symbol: "none", // 小圆点
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#67A1FF"
                }
              }
            },
            areaStyle: {
              normal: {
                // color: 'rgba(120, 239, 215, 0.56)',
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "rgba(22,95,216,0.1)" },
                  { offset: 0.7, color: "rgba(22,95,216,0.6)" },
                  { offset: 0, color: "rgba(22,95,216,1)" }
                ])
              }
            },
            data: dataY
          }
        ]
      };

      return option;
    }
  }
};
</script>
<style scoped>
/* 分时客流量样式 */
.centerChart {
  position: absolute;
  top: 606px;
  left: 130px;
  width: 189px;
  height: 131px;
  background: url(../../assets/imgs/ancang/box-fenshi.png);
  background-size: 189px 131px;
  z-index: 3;
  cursor: pointer;
}

.centerChart .icon-show {
  width: 20px;
  height: 20px;
  background: url(../../assets/imgs/ancang/icon-scale-big.png) no-repeat center;
  background-size: 100%;
  position: absolute;
  top: 12px;
  right: 15px;
  cursor: pointer;
  z-index: 1;
}

.chart5 {
  position: absolute;
  top: 572px;
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

.big-centerChart {
  width: 470px;
  height: 326px;
  /*  width: 377px;
    height: 262px; */
  background: url(../../assets/imgs/ancang/chart-big-box.png) no-repeat center;
  background-size: 100%;
  position: absolute;
  top: 414px;
  left: 100px;
  z-index: 4;
  color: #fff;
  cursor: pointer;
  display: none;
}

.big-centerchart-title {
  position: absolute;
  top: 30px;
  left: 20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.big-centerChart .icon-hide {
  width: 20px;
  height: 20px;
  background: url(../../assets/imgs/ancang/icon-scale-small.png) no-repeat
    center;
  background-size: 100%;
  position: absolute;
  top: 27px;
  right: 15px;
  cursor: pointer;
  z-index: 4;
}

.show-chart-animation {
  animation: show-chart 0.5s linear 1;
}

.show-amonitor-animation {
  animation: show-monitor 0.5s linear 1;
}

.big-centerchart-bottom {
  color: #fff;
  font-size: 10px;
  position: absolute;
  left: 0;
  bottom: 24px;
  width: 88%;
  margin: 0 6%;
}

.big-centerchart-bottom :nth-child(1) {
  margin-left: 12px;
  font-size: 12px;
}

.big-centerchart-bottom :nth-child(2) {
  float: right;
  display: flex;
  align-items: center;
  height: 16px;
}

.big-centerchart-bottom :nth-child(3) {
  float: right;
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.big-centerchart-bottom :nth-child(2) img {
  width: 7px;
  height: auto;
  margin-left: 3px;
}

.big-centerchart-bottom :nth-child(3) span {
  margin-right: 10px;
}

.module-chart-tab {
  top: 22px;
  right: 45px;
  z-index: 4;
}

.module-monitor-tab {
  position: absolute;
  bottom: 405px;
  right: 34px;
}

.module-monitor-tab div {
  width: 70px;
  height: 30px;
  background: url(../../assets/imgs/ancang/icon-monitor-box3.png) no-repeat
    center;
  background-size: 60px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  color: #fff;
  font-size: 8px;
  cursor: pointer;
}

.module-monitor-tab span {
  opacity: 0.5;
}

.module-monitor-tab .active {
  background: url(../../assets/imgs/ancang/icon-monitor-box2.png) no-repeat
    center !important;
  background-size: 76px auto;
}

.module-monitor-tab .active span {
  opacity: 1 !important;
}

@keyframes show-chart {
  0% {
    transform: scale3d(0.4, 0.4, 1);
    top: 510px;
    left: -30px;
    opacity: 0.1;
  }
  100% {
    transform: scale3d(1, 1, 1);
    top: 414px;
    left: 100px;
    opacity: 1;
  }
}

@keyframes show-monitor {
  0% {
    transform: scale3d(0.4, 0.4, 1);
    top: 20px;
    left: -140px;
    opacity: 1;
  }
  100% {
    transform: scale3d(1, 1, 1);
    top: 100px;
    left: -10px;
    opacity: 1;
  }
}
</style>