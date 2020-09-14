<template>
  <div class="monitor-box">
    <div class="infos">
      <div class="info-item">
        <span>陌生人</span>
        <span><countTo :startVal="0" :endVal="data?data.stranger:0" :duration="1000"></countTo></span>
      </div>
      <div class="info-item">
        <span>人员关怀</span>
        <span><countTo :startVal="0" :endVal="data?data.personnelCare:0" :duration="1000"></countTo></span>
      </div>
      <div class="info-item">
        <span>危险区域报警</span>
        <span><countTo :startVal="0" :endVal="data?data.strangerArea:0" :duration="1000"></countTo></span>
      </div>
    </div>
  </div>
</template>
<script>
import countTo from "vue-count-to";
export default {
  props: ["data"],
  components: { countTo },
};
</script>
<style scoped>
.monitor-box {
  width: 430px;
  height: 122px;
  background: url(../../assets/imgs/shequ-box.png) no-repeat center;
  background-size: cover;
}

.infos {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 58px;
}

.info-item>span{
    display: block;
}

.info-item > span:nth-of-type(1) {
  font-family: PingFangSC-Semibold;
  font-size: 9px;
  color: #ffffff;
  letter-spacing: 0;
}

.info-item > span:nth-of-type(2) {
  font-family: PARaDOS;
  font-size: 15.3px;
  color: #ffffff;
  letter-spacing: 0;
}
</style>