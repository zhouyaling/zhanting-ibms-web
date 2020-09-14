<template>
  <div class="monitor-box">
    <div class="infos">
      <div class="info-item">
        <span>设备总数</span>
        <span>
          <countTo :startVal="0" :endVal="data?data.all:0" :duration="1000"></countTo>
        </span>
      </div>
      <div class="info-item">
        <span>在线数</span>
        <countTo :startVal="0" :endVal="data?data.online:0" :duration="1000"></countTo>
      </div>
      <div class="info-item">
        <span>离线数</span>
         <countTo :startVal="0" :endVal="data?data.offline:0" :duration="1000"></countTo>
      </div>
    </div>
  </div>
</template>
<script>
import countTo from "vue-count-to";
export default {
  props: ["data"],
  components: { countTo },
  watch: {
    data(d, c) {}
  },
  mounted() {}
};
</script>
<style scoped>
.monitor-box {
  width: 398px;
  height: 122px;
  background: url(../../assets/imgs/monitor-box.png) no-repeat center;
  background-size: cover;
}

.infos {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 58px;
}

.info-item > span {
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