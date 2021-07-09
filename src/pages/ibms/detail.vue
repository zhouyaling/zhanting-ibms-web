

<template>
  <div class="bg">
    <page-layout>
      <div
        slot="slotHeader"
        class="page-header"
        style="background: rgba(6, 30, 93, 0.4)"
      >
        <dv-decoration-5
          style="width: 45%; height: 100px; margin-left: 27.5%"
          :color="['#2E6099', '#2E6099']"
        />
        <dv-decoration-8
          style="width: 20%; height: 50px; position: absolute; top: 0"
          :color="['#2E6099', '#2E6099']"
        />
        <dv-decoration-8
          :reverse="true"
          style="width: 20%; height: 50px; position: absolute; top: 0; right: 0"
          :color="['#2E6099', '#2E6099']"
        />
        <div class="header-name" style="top: 25%; color: #2e6099">
          {{ projectName }}
        </div>
      </div>
      <div slot="slotContent" class="wrap">
        <digital-flop :numbers="currentNumbers"></digital-flop>
        <div class="block-left-content">
          <div style="width: 100%">
            <ranking-board :waterList="waterList" />
          </div>
        </div>
        <div class="block-right-content">
          <div class="block-top-content">
            <rose-chart />
            <water-level-chart :moneyInfo="moneyInfo" />
            <scroll-board />
          </div>
          <div clas="block-bottom-content">
            <monitor-card> </monitor-card>
            <monitor-card> </monitor-card>
            <line-chart></line-chart>
          </div>
        </div>
        <img
          @click="goBack"
          class="img-btn"
          src="@/assets/imgs/back-btn.png"
          alt=""
        />
      </div>
    </page-layout>
  </div>
</template>
<script>
import PageLayout from "../../components/pageLayout";
import DigitalFlop from "../part/digitalFlop";
import RankingBoard from "../part/rankingBoard";
import RoseChart from "../part/roseChart";
import WaterLevelChart from "../part/waterLevelChart";
import ScrollBoard from "../part/scrollBoard";
import MonitorCard from "../part/monitorCard";
import LineChart from "../part/lineChart";
export default {
  name: "Index",
  components: {
    PageLayout,
    DigitalFlop,
    RankingBoard,
    RoseChart,
    WaterLevelChart,
    ScrollBoard,
    MonitorCard,
    LineChart,
  },
  data() {
    return {
      moneyInfo: {},
      waterList: [],
      currentNumbers: [0, 0, 0, 0, 0, 0, 0],
      projectName: "",
    };
  },
  mounted() {
    this.projectId = this.$route.query.projectId;
    this.projectName = this.$route.query.projectName;
    staticProjectData.forEach((element) => {
      if (element.projectName == this.projectName) {
        this.currentNumbers = element.numbers;
        this.waterList = element.waterList;
        this.moneyInfo = element.moneyInfo;
      }
    });
  },
  beforeDestroy() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.center {
  width: 51.2%;
  height: 100%;
  float: left;
  position: relative;
}

.left {
  width: 15.6%;
  float: left;
  margin: 0 2.5%;
  box-sizing: border-box;
}

.right {
  width: 23.2%;
  float: left;
  box-sizing: border-box;
  margin: 0 2.5%;
}

.block-left-content {
  flex: 1;
  display: flex;
  margin-top: 20px;
  float: left;
  width: 20%;
}

.block-right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 50px;
  padding-left: 20px;
  float: left;
  width: 80%;
}

.block-top-content {
  height: 55%;
  display: flex;
  flex-grow: 0;
  box-sizing: border-box;
  padding-bottom: 20px;
}

/* 电压模块 */

.dianya-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.dianya-box > div:nth-of-type(1) {
  width: 50%;
  min-width: 30%;
  font-size: 24px;
  text-align: center;
  height: 83%;
  display: flex;
  align-content: center;
  justify-content: center;
  line-height: 166px;
  color: #0f2b73;
  font-weight: 600;
  border-right: 1px solid #133180;
}

.dianya-box > div:nth-of-type(2) {
  font-size: 14px;
  width: 50%;
  display: flex;
  align-content: center;
  justify-content: space-around;
  height: 80%;
  flex-direction: column;
  text-align: center;
}

.dianya-box > div:nth-of-type(2) > div {
  width: 70%;
}

.img-btn {
  position: absolute;
  bottom: -60px;
  right: 0;
  width: 100px;
  z-index: 99999 !important;
}
</style>


