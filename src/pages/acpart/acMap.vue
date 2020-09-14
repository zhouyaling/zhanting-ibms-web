<template>
  <!-- 中间区域 start style="width: 1600px; transform: scale(0.5625,0.5625); margin-left: -350px;"-->
  <div class="module-center">
    <div class="module-big-title" style="margin-left:55px;">
      <span>案场</span>热力图
      <div class="center-title"></div>
    </div>
    <div class="module-center-1">
      <img class="hot-bk" v-if="hotConfig && hotConfig.backImg" v-bind:src="hotConfig.backImg" alt />
      <!-- <div class="bk-text" v-if="!hotConfig.backImg">案场地图还未上传</div> -->
      <!-- 案场地图摄像头 -->
      <div class="monitor-points monitor-points-new" v-if="hotConfig && hotConfig.backImg">
        <div
          v-for="(item,index) in hotConfig.monitorGroups"
          class="monitor-light"
          :key="index"
          v-bind:style="{'top':(item.mainTop*0.5625) + 'px', 'left':   (item.mainLeft*0.5625) +'px' }"
        >
          <img
            v-bind:src="item.lightImg"
            alt
            v-bind:style="{'top':item.lightTop*0.5625 + 'px','left':item.lightLeft*0.5625 + 'px'}"
            @click="showMonitor(item.monitorNum)"
          />
        </div>
      </div>
      <ac-dong-xian :selectedPointList="selectedPointList" :monitorGroups="hotConfig.monitorGroups"></ac-dong-xian>
    </div>

    <!-- 案场热力图区域右上角访问总人数 -->
    <div class="module-timer">
      <div class="color-blue">
        <p>
          <span>{{areaVisitorAll.atime}}</span>
        </p>
        <p>访问总人数</p>
      </div>
      <div>
        <p>
          <span>{{areaVisitorAll.atime}}</span>min
        </p>
        <p>停留总时长</p>
      </div>
      <div>
        <p>
          <span>{{areaVisitorAll.avgTime}}</span>min
        </p>
        <p>平均停留时长</p>
      </div>
    </div>

    <!-- 年龄分布 -->
    <div class="module-age">
      <ul>
        <li
          class="age-item"
          v-for="(item,index) in ageVisitorGroup"
          v-bind:style="{float:item.ages=='未识别'?'right!important':''}"
          :key="index"
        >
          <div>
            <div class="age-progress"></div>
          </div>
          <p class="age-avg">
            <span class="age-avg-percent">{{item.percentage}}</span>%
          </p>
          <p>{{item.ages}}</p>
        </li>
      </ul>
    </div>

    <!-- 性别比例图表 -->
    <div class="sex-chart-box">
      <ac-sex-pie-chart :data="sexData" ></ac-sex-pie-chart>
    </div>
  </div>
</template>
<script>
import AcSexPieChart from "./acSexPieChart";
import AcDongXian from "./acDongXian";
export default {
  props: [
    "projectId",
    "hotConfig",
    "areaVisitorAll",
    "sexData",
    "ageVisitorGroup",
    "timeUserData",
    "timeUserDataDetail",
    "selectedPointList"
  ],
  data() {
    return {
      // hotConfig: {
      //   backImg: require("../../assets/imgs/ancang/dx-back.png")
      // }
    };
  },
  components: {
    AcSexPieChart,
    AcDongXian
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
/* 中间模块 */

.module-center {
  width: 900px;
  height: 760px;
  position: relative;
  top: 0;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.module-center-1 {
  position: relative;
  left: 0;
  top: 0;
  /* width: 1600px; */
  width: 100%;
  /* height: 100%; */
  background-position: center;
  background-repeat: no-repeat;
  /* transform: scale3d(0.5625, 0.5625, 1);
  margin-left: -350px; */
}

.hot-bk {
  width: 100%;
  height: auto;
}

.module-big-title {
  font-size: 18px;
  color: #fff;
  padding-left: 30px;
  position: absolute;
  top: 44px;
  left: 0px;
  display: flex;
  align-items: center;
}

.module-big-title span {
  /* font-weight: 700; */
  opacity: 0.5;
}

.module-big-title::after {
  content: "";
  width: 22px;
  height: 15px;
  background: url(../../assets/imgs/ancang/icon-title.png) no-repeat center;
  background-size: 100%;
  position: absolute;
  left: 0;
  top: 8px;
}

/* 中间区域模块样式调整 end */

/* 地图右上角统计样式 */

.module-timer {
  width: 96px;
  height: 160px;
  background: #040714;
  position: absolute;
  top: 52px;
  left: 754px;
}

.module-timer div {
  text-align: right;
  font-size: 10px;
  color: #ffffff;
  margin-bottom: 25px;
  border-right: 2px solid #0061ea;
  padding-right: 10px;
}

.module-timer div:nth-of-type(1) {
  border-right: 2px solid #7dfeff !important;
}

.module-timer div p span {
  letter-spacing: 2px;
  font-weight: 500;
  font-size: 18px;
  font-family: din;
}

.color-blue {
  color: #7dfeff !important;
}

.color-blue-0 {
  color: #0166ff !important;
}

.color-white {
  color: #fff !important;
}

.color-red {
  color: #ff5151 !important;
}

/* 年龄段样式 */

.module-age {
  position: absolute;
  bottom: 15px;
  right: 55px;
  color: #8b8b8b;
  font-size: 8px;
}

.module-age ul {
  list-style: none;
}

.module-age .age-avg {
  color: #fff;
  margin: 3px 0 auto !important;
}

.module-age .age-avg-percent {
  font-size: 14px !important;
  color: #fff;
  margin: 3px 0 auto !important;
}

.module-age ul li {
  list-style: none;
  float: left !important;
  /*  width: 20%; */
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 0.8;
  font-size: 12px;
}

.module-age .age-progress {
  width: 37px;
  height: 17px;
  background: url(../../assets/imgs/ancang/icon-progress.png) no-repeat center;
  background-size: 37px auto;
}

.sex-chart-box {
  position: absolute;
  top: 637px;
  right: 53px;
}

.bk-text {
  font-size: 12px;
  opacity: 0.6;
}

.monitor-light {
  width: 5px;
  height: 5px;
  /* background: white;
    border-radius: 50%; */
  position: absolute;
  opacity: 0.5;
}

.monitor-light img:nth-of-type(1) {
  position: absolute;
  /*  width: 140px; */
  /* height: auto; */
}
</style>