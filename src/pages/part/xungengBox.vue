<template>
  <div class="xungeng-box">
    <div class="infos">
      <div class="info-item">
        <span>点位总数</span>
        <span><countTo :startVal="0" :endVal="data?parseInt(data.pointTotal):0" :duration="1000"></countTo></span>
        <div class="process-box">
          <div class="process-p p1"></div>
        </div>
      </div>
      <div class="info-item">
        <span>今日漏检点位数</span>
        <span><countTo :startVal="0" :endVal="data?parseInt(data.toTayNum):0" :duration="1000"></countTo></span>
        <div class="process-box">
          <div class="process-p p2"></div>
        </div>
      </div>
    </div>
    <div class="infos-circle">
      <span><countTo style="display:inline-block" :startVal="0" :endVal="data?(parseFloat(data.taskRatio) * 100):0" :duration="1000"></countTo>%</span>
      <span>今日任务</span>
      <span>完成率</span>
    </div>
  </div>
</template>
<script>
import countTo from "vue-count-to";
export default {
  props: ["data"],
  components: { countTo },
  data() {
    return {};
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>
<style scoped>
.xungeng-box {
  width: 280px;
  height: 183px;
  background: url(../../assets/imgs/xungeng-box.png) no-repeat center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.infos {
  /* width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 58px; */
  width: 50%;
  padding: 26px 0 0 18px;
  box-sizing: border-box;
}

.process-box {
  width: 88px;
  height: 12px;
  padding-top: 1px;
  background: url(../../assets/imgs/process-box.png) no-repeat center;
  background-size: 100% 100%;
  position: relative;
}

.info-item > span:nth-of-type(1) {
  display: block;
  font-family: PingFangSC-Semibold;
  font-size: 9px;
  color: #ffffff;
  letter-spacing: 0;
}

.info-item:nth-of-type(2) {
  margin-top: 16px;
}

.info-item > span:nth-of-type(2) {
  display: block;
  font-family: PARaDOS;
  font-size: 15.3px;
  color: #ffffff;
  letter-spacing: 0;
}

.infos-circle {
  width: 99px;
  height: 99px;
  background: url(../../assets/imgs/shebei-circle.png) no-repeat center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
}

.infos-circle > span:nth-of-type(1) {
  font-family: PARaDOS;
  font-size: 13.5px;
  color: #ffffff;
  letter-spacing: 0;
}

.infos-circle > span:nth-of-type(2) {
  font-family: PingFangSC-Semibold;
  font-size: 9px;
  color: #ffffff;
  letter-spacing: 0;
}


.infos-circle > span:nth-of-type(3) {
  font-family: PingFangSC-Semibold;
  font-size: 9px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 10px;
}

.process-p {
  width: 90%;
  height: 7px;
  margin-top: 2px;
  margin-left: 5.7%;
  background-image: url(../../assets/imgs/process-re.png);
  background-size: 10px 7px;
  background-repeat: repeat-x;
}

.p1 {
  animation: processMove 10s linear infinite;
}

.p2 {
  animation: processMove 10s 2s linear infinite;
}

@keyframes processMove {
  0% {
    width: 12%;
  }

  12.4% {
    width: 12%;
  }

  12.5% {
    width: 22%;
  }

  24.9% {
    width: 22%;
  }
  25% {
   width: 34%;
  }

  37.4% {
    width: 34%;
  }
  37.5% {
    width: 45%;
  }

  49.9% {
    width: 45%;
  }
  50% {
   width: 56%;
  }

  62.4% {
    width: 56%;
  }
  62.5% {
    width: 67%;
  }

  74.9% {
   width: 67%;
  }
  75% {
    width: 78%;
  }

  87.4% {
   width: 78%;
  }
  87.5% {
    width: 90%;
  }

  99.9% {
    width: 90%;
  }
  100% {
    width: 0%;
  }
}
</style>
