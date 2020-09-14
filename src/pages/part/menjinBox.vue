<template>
  <div class="menjin-box">
    <div class="infos">
      <div class="info-item">
        <span>门禁总数</span>
        <span><countTo :startVal="0" :endVal="data?data.all:0" :duration="1000"></countTo></span>
        <div class="process-box">
          <div class="process-p p1"></div>
        </div>
      </div>
      <div class="info-item">
        <span>今日通行</span>
        <span><countTo :startVal="0" :endVal="data?data.today:0" :duration="1000"></countTo></span>
        <div class="process-box">
          <div class="process-p p2"></div>
        </div>
      </div>
    </div>
    <div class="infos-circle">
      <span><countTo :startVal="0" :endVal="data?data.fatal:0" :duration="1000"></countTo></span>
      <span>当前异常设备</span>
    </div>
  </div>
</template>
<script>
import countTo from "vue-count-to";
export default {
  props: ["data"],
  components: { countTo },
  data() {
    return {
      timer1: null,
      config1: {
        value: 80,
        borderWidth: 0,
        borderGap: 0,
        colors: ["#0ABBFE", "#0A8AEF"],
        lineDash: [9, 2]
      },
      config2: {
        value: 10,
        borderWidth: 0,
        borderGap: 0,
        colors: ["#0ABBFE", "#0A8AEF"],
        lineDash: [9, 2]
      }
    };
  },
  mounted() {
    this.animatePercent();
  },
  beforeDestroy() {
    window.clearInterval(this.timer1);
  },
  methods: {
    // 进度条效果
    animatePercent() {
      this.timer1 = window.setInterval(() => {
        let q = this.config1.value;
        q = q >= 100 ? 0 : q + 10;
        this.config1 = {
          value: q,
          borderWidth: 0,
          borderGap: 0,
          colors: ["#0ABBFE", "#0A8AEF"],
          lineDash: [9, 2]
        };
        let q2 = this.config2.value;
        q2 = q2 >= 100 ? 0 : q2 + 10;
        this.config2 = {
          value: q2,
          borderWidth: 0,
          borderGap: 0,
          colors: ["#0ABBFE", "#0A8AEF"],
          lineDash: [9, 2]
        };
      }, 1500);
    }
  }
};
</script>
<style scoped>
.menjin-box {
  width: 320px;
  height: 268px;
  background: url(../../assets/imgs/menjin-box.png) no-repeat center;
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
  width: 42%;
  padding: 26px 0 0 10px;
  box-sizing: border-box;
}

.process-box {
  width: 120px;
  height: 15px;
  padding-top: 1px;
  box-sizing: border-box;
  background: url(../../assets/imgs/process-box.png) no-repeat center;
  background-size: 100% 100%;
}

.info-item > span:nth-of-type(1) {
  display: block;
  font-family: PingFangSC-Semibold;
  font-size: 9px;
  color: #ffffff;
  letter-spacing: 0;
}

.info-item:nth-of-type(2) {
  margin-top: 32px;
}

.info-item > span:nth-of-type(2) {
  display: block;
  font-family: PARaDOS;
  font-size: 15.3px;
  color: #ffffff;
  letter-spacing: 0;
}

.infos-circle {
  width: 132px;
  height: 132px;
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
  font-size: 17.5px;
  color: #ffffff;
  letter-spacing: 0;
}

.infos-circle > span:nth-of-type(2) {
  font-family: PingFangSC-Semibold;
  font-size: 11.5px;
  color: #ffffff;
  letter-spacing: 0;
}

.process-p {
  width: 84%;
  height: 13px;
  margin-left: 8%;
  margin-top: 2.4px;
  background-image: url(../../assets/imgs/process-re.png);
  background-size: 10.4px 8.3px;
  background-repeat: repeat-x;
  box-sizing: border-box;
}

.p1 {
  animation: processMove 10s linear infinite;
}

.p2 {
  animation: processMove 10s 2s linear infinite;
}

@keyframes processMove {
  0% {
    width: 8.2%;
  }

  9.9% {
    width: 8.2%;
  }

  10% {
    width: 16.6%;
  }

  19.9% {
    width: 16.6%;
  }
  20% {
    width: 25%;
  }

  29.9% {
    width: 25%;
  }
  30% {
    width: 33.6%;
  }

  39.9% {
    width: 33.6%;
  }
  40% {
    width: 42%;
  }

  49.9% {
    width: 42%;
  }
  50% {
    width: 50.4%;
  }

  59.9% {
    width: 50.4%;
  }
  60% {
    width: 58.8%;
  }

  69.9% {
    width: 58.8%;
  }
  70% {
    width: 67.2%;
  }

  79.9% {
    width: 67.2%;
  }
  80% {
    width: 75.6%;
  }

  89.9% {
    width: 75.6%;
  }
  90% {
    width: 84%;
  }

  99.9% {
    width: 84%;
  }
  100% {
    width: 0%;
  }
}
</style>
<style>
.dv-percent-pond text {
  display: none;
}
</style>