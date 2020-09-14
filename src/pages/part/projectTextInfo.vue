<template>
  <div class="info-list">
    <div class="info-item">
      <span>
        <span class="info-number"><countTo :startVal="0" :endVal="data?data.projectTotal:0" :duration="3000"></countTo></span>个
      </span>
      <span>项目总数</span>
    </div>
    <div class="info-item">
      <span>
        <span class="info-number"><countTo :startVal="0" :endVal="data?data.handledAlarmTotal:0" :duration="3000"></countTo></span>个
      </span>
      <span>报警已处理</span>
    </div>
    <div class="info-item">
      <span>
        <span class="info-number"><countTo :startVal="0" :endVal="data?data.repairTotal:0" :duration="3000"></countTo></span>次
      </span>
      <span>工单</span>
    </div>
    <div class="info-item" v-for="(item,index) in 6" :key="index"></div>
    <div class="info-item">
      <span>
        <span class="info-number"><countTo :startVal="0" :endVal="data?data.noticeTotal:0" :duration="3000"></countTo></span>个
      </span>
      <span>通知公告</span>
    </div>
    <div class="info-item">
      <span>
        <span class="info-number"><countTo :startVal="0" :endVal="data?data.powerTotal:0" :duration="3000"></countTo></span>KWH
      </span>
      <span>耗电总数</span>
    </div>
    <div class="info-item">
      <span>
        <span class="info-number"><countTo :startVal="0" :endVal="data?data.waterTotal:0" :duration="3000"></countTo></span>T
      </span>
      <span>排水总量</span>
    </div>
  </div>
</template>
<script>
import countTo from "vue-count-to";
export default {
  props:["data"],
  data() {
    return {
    };
  },
  components: { countTo }
};
</script>
<style scoped>
.info-list {
  width: 94%;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  position: absolute;
  top: -94px;
  left: 3%;
}

.info-item {
  font-family: PingFangSC-Semibold;
  font-size: 11.2px;
  color: #326dae;
  letter-spacing: 0;
  font-weight: 600;
}

.info-item > span {
  display: block;
  text-align: center;
}

.info-item > span:nth-of-type(2) {
  font-weight: normal;
}

.info-number {
  font-family: PARaDOS;
  font-size: 33.6px;
  font-weight: normal;
  display: inline-block;
}
</style>