<template>
  <div class="system-info">
    <div class="part">
      <div class="part a">SYS</div>
      <div class="part b">
        <span>系统状态</span>
        <span>STL 679</span>
        <span>105.40</span>
      </div>
      <div class="part c">
        <span>{{data && data==1?'正常':'异常'}}</span>
        <span>N · 134</span>
      </div>
      <div class="part d">
        <span>time 0·12</span>
        <span>date 8·12</span>
      </div>
    </div>
    <div class="part e">
      <mini-earth-show></mini-earth-show>
    </div>
  </div>
</template>
<script>
import MiniEarthShow from "../../components/nimiEarthShow";
export default {
  props: ["data"],
  components: {
    MiniEarthShow
  }
};
</script>
<style scoped>
.system-info {
  min-height: 122px;
  display: flex;
  align-items: center;
}

.part {
  float: left;
  margin-right: 28px;
}

.a {
  font-family: PARaDOS;
  font-size: 18px;
  color: #43baff;
  letter-spacing: 0;
}

.b {
  color: #fff;
  font-family: PingFangSC-Semibold;
}

.b > span {
  display: block;
  font-size: 10px;
}

.b > span:nth-of-type(1) {
  font-size: 16px;
}

.c > span {
  text-align: center;
  display: block;
  background: #43baff;
  font-family: PingFangSC-Regular;
  color: #020913;
  letter-spacing: 0.93px;
}

.c > span:nth-of-type(1) {
  width: 48px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
}

.c > span:nth-of-type(2) {
  width: 48px;
  height: 11px;
  font-size: 9px;
  line-height: 11px;
  margin-top: 2px;
}

.d {
  font-family: PARaDOS;
  font-size: 7px;
  color: #ffffff;
  letter-spacing: 0.54px;
  margin-right: 0;
}

.d > span {
  display: block;
}

.e {
  margin-right: 0;
}
</style>