<template>
  <div class="alarm-show">
    <dv-border-box-13 style="height:100px;margin-top:10px">
      <div class="alarm-number">

        <div class="alarm-number-text">
          <span>工单总数</span>
          <span>（个）</span>
        </div>
        <div class="alarm-number-n">
          <countTo :startVal="100000" :endVal="data.powerTotal" :duration="5000"></countTo>
        </div>
      </div>
    </dv-border-box-13>
    <dv-border-box-13 style="height:100px;margin-top:50px">
      <div class="alarm-number">
        <div class="alarm-number-text">
          <span>异常工单</span>
          <span>（个）</span>
        </div>
        <div class="alarm-number-n">
          <countTo :startVal="0" :endVal="data.waterTotal" :duration="5000"></countTo>
        </div>
      </div>
    </dv-border-box-13>
    <div style="width:320px">
      <div class="myChart">
        <pie-chart :data="FaceSortList"></pie-chart>
      </div>
      <div class="chart-legend">
        <div v-for="(item,index) in FaceSortList" :key="index">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import countTo from "vue-count-to";
import PieChart from "@/components/pieChart.vue";
export default {
  props: ["data"],
  data() {
    return {
      config: {
        startVal: 4970,
        endVal: 21017
      },
      config1: {
        data1: 23,
        data2: 13,
        data3: 21,
        data4: 7
      },
      FaceSortList: [
        { value: 335, name: "巡检工单" },
        { value: 310, name: "保养工单" },
        { value: 34, name: "维修工单" },
        { value: 135, name: "临时工单" },
      ],
    };
  },
  components: { countTo, PieChart }
};
</script>
<style scoped>
.alarm-show {
  /* margin-left: 10px; */
  width: 90%;
}

.alarm-line {
  width: 277px;
  height: 92px;
  background: url(../../assets/imgs/alarm-line.png) no-repeat center;
  background-size: 257px 100%;
  margin-bottom: 45px;
}

.line-text {
  height: 100%;
  width: 100%;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  font-family: PingFangSC-Semibold;
  font-size: 12px;
  letter-spacing: 0;
  color: #43baff;
  width: 50%;
  float: left;
}

.line-text:nth-of-type(2) {
  float: right;
  text-align: right;
  color: #aba10e;
}

.line-text span {
  font-family: PARaDOS;
  font-size: 30px;
  letter-spacing: -2px;
}

.line-text-number {
  height: 60%;
}

.line-text-number>span {
  display: inline-block;
}

.line-text-des {
  font-family: PingFangSC-Semibold;
  font-size: 12px;
  letter-spacing: 0;
  opacity: 0.7;
}

.alarm-number {
  width: 267px;
  height: 100px;
  /*background: url(../../assets/imgs/number-box.png) no-repeat center;
  background-size: 100% 100%;*/
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 13px 0 20px;
  margin-bottom: 34px;
}

.alarm-number-text {
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #b9e2e8;
  letter-spacing: 0;
  margin-top: -6px;
}

.alarm-number-text>span {
  display: block;
}

.alarm-number-n {
  font-family: PARaDOS;
  font-size: 36px;
  color: #43baff;
  letter-spacing: 0;
  margin-top: -6px;
}

.myChart {
  width: 100%;
  height: 250px;
  float: left;
}


.chart-legend {
  width: 100%;
  height: 100%;
  float: left;
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
  /* margin-top: 20%; */
}

.chart-legend > div {
  margin: 5px 0;
  float: left;
}

.chart-legend > div > span:nth-of-type(1) {
  padding-left: 29px;
  position: relative;
  min-width: 88px;
  /* display: inline-block; */
}

.chart-legend > div > span:nth-of-type(2) {
  min-width: 68px;
  /* display: inline-block; */
}

.chart-legend > div > span:nth-of-type(1)::after {
  content: "";
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  left: 10px;
  top: 50%;
  transform: translate(0%, -50%);
}

.chart-legend > div:nth-of-type(1) > span:nth-of-type(1)::after {
  background-color: #0a406b;
}

.chart-legend > div:nth-of-type(2) > span:nth-of-type(1)::after {
  background-color: #03a9f2;
}

.chart-legend > div:nth-of-type(3) > span:nth-of-type(1)::after {
  background-color: #6fedff;
}

.chart-legend > div:nth-of-type(4) > span:nth-of-type(1)::after {
  background-color: #84a4b3;
}

</style>