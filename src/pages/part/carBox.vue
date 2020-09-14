<template>
  <div class="monitor-box">
    <div class="circle-box">
      <div class="car-circle-bg">
        <img src="../../assets/imgs/car-circle.png" alt />
        <!-- <div class="car-circle"></div> -->
      </div>
    </div>
    <div class="infos">
      <div class="line-box" v-if="show">
        <img src="../../assets/imgs/car-line1.png" alt />
        <span class="line-text">车辆总数</span>
        <div class="line-number">
           <countTo :startVal="0" :endVal="data?data.all:0" :duration="1000"></countTo>
        </div>
      </div>
      <div class="line-box"  v-if="show2">
        <img src="../../assets/imgs/car-line2.png" alt />
        <span class="line-text">今日通行</span>
        <div class="line-number">
          <countTo :startVal="0" :endVal="data?data.today:0" :duration="1000"></countTo>
        </div>
      </div>
      <div class="line-box"  v-if="show3">
        <img src="../../assets/imgs/car-line3.png" alt />
        <span class="line-text">异常抬杆</span>
        <div class="line-number">
          <countTo :startVal="0" :endVal="data?data.todayFatal:0" :duration="1000"></countTo>
        </div>
      </div>
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
      show: false,
      show2:false,
      show3:false,
      timer1:null,
      timer2:null,
      timer3:null
    };
  },
  mounted() {
    this.showMove();
  },
  methods: {
    showMove() {
      this.timer1 = window.setInterval(() => {
        this.show = true;
      }, 1000);
      this.timer2 = window.setInterval(() => {
        this.show2 = true;
      }, 1700);
      this.timer3 = window.setInterval(() => {
        this.show3 = true;
      }, 2400);
    }
  },
  beforeDestroy(){
    window.clearInterval(this.timer1);
    window.clearInterval(this.timer2);
    window.clearInterval(this.timer3);
  }
};
</script>
<style scoped>
.monitor-box {
  width: 361px;
  height: 236px;
  background: url(../../assets/imgs/car-box.png) no-repeat center;
  background-size: 100% 100%;
  padding-top: 15%;
  box-sizing: border-box;
}

.circle-box {
  width: 45%;
  float: left;
  /* margin: 0 auto; */
  /* text-align: center; */
  height: 100%;
  /* padding-top: 20%; */
  /* margin-top: 20%; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.infos {
  width: 55%;
  float: right;
  height: 100%;
  position: relative;
}

/* .infos img {
  position: absolute;
}

.infos img:nth-of-type(1) {
  top: 15%;
  left: -4%;
}

.infos img:nth-of-type(2) {
  top: 47%;
}

.infos img:nth-of-type(3) {
  top: 73%;
  left: -8%;
} */

.car-circle-bg {
  width: 119px;
  height: 124px;
  background: url(../../assets/imgs/car-circle-bg.png) no-repeat center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.car-circle-bg img {
  animation: carCircle 12s linear infinite;
}

@keyframes carCircle {
  0% {
    transform: rotate(0deg);
  }

  60% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.car-circle {
  /* width: 108px;
    height: 108px; */
}

.line-box {
  position: relative;
}

.line-text {
  font-family: PingFangSC-Semibold;
  font-size: 9px;
  color: #ffffff;
  letter-spacing: 0;
  position: absolute;
}

.line-box:nth-of-type(1) {
  top: 15%;
  left: -4%;
}

.line-box:nth-of-type(1) > .line-text {
  left: 75px;
  top: 21px;
}

.line-box:nth-of-type(2) {
  top: 22%;
}

.line-box:nth-of-type(2) > .line-text {
  left: 67px;
  top: 21px;
}

.line-box:nth-of-type(3) {
  top: 39%;
  left: -8%;
}

.line-box:nth-of-type(3) > .line-text {
  left: 82px;
  top: 24px;
}

.line-number {
  width: 101px;
  height: 20px;
  line-height: 16px;
  background: url(../../assets/imgs/car-number-box.png) no-repeat center;
  background-size: 100% 100%;
  text-align: center;
  font-family: PARaDOS;
  font-size: 15.3px;
  color: #ffffff;
  letter-spacing: 0;
  position: absolute;
}

.line-box:nth-of-type(3) .line-number {
  top: -6px;
  left: 39px;
}

.line-box:nth-of-type(2) .line-number {
  left: 24px;
  top: -12px;
}

.line-box:nth-of-type(1) .line-number {
  top: -10px;
  left: 35px;
}

.line-box:nth-of-type(3) {
  animation: lineShow3 1s linear 1;
}

.line-box:nth-of-type(2) {
  animation: lineShow3 1s linear 1;
}

.line-box:nth-of-type(1) {
  animation: lineShow3 1s linear 1;
}

@keyframes lineShow3 {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>