<template>
  <div class="circle-box">
    <dv-decoration-9 style="width:200px;height:200px;" :dur="8" ></dv-decoration-9>
    <div class="circle-text">
      <div>项目总数</div>
      <div>
        <span ><countTo :startVal="0" :endVal="8" :duration="3000"></countTo></span>个
      </div>
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
}
</script>
<style scoped>
.circle-box {
  width: 219px;
  height: 219px;
  position: relative;
  /* margin: 0 auto; */
  margin: auto 20px auto auto;
}

.circle-box img,
.circle-box > div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
}

.circle-text {
  width: 100px;
  height: 100px;
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #b9e2e8;
  letter-spacing: 0;
}

.circle-text {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.circle-text span {
  font-family: PARaDOS;
  font-size: 34px;
  line-height: 27px;
  color: #b9e2e8;
  letter-spacing: 0;
  display:inline-block
}

.circle-box img:nth-of-type(4) {
  animation: circlemove 15s linear infinite;
}

.circle-box img:nth-of-type(2) {
  animation: circlemove1 20s linear infinite;
}

@keyframes circlemove {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes circlemove1 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
</style>