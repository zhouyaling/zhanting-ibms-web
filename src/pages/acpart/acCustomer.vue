<template>
  <div>
    <!-- <ac-title text="客流检测"></ac-title> -->
    <ac-sub-title text="客流检测系统"></ac-sub-title>
    <div class="chart1">
      <div class="p1">
        <div>{{data && data.length>0?data[0].percentage:0}}%</div>
        <div>{{data && data.length>0?data[0].user_type:"老客户"}}</div>
        <div>{{data && data.length>0?data[0].count_users:0}}人</div>
      </div>
      <div class="p2">
        <div>{{data && data.length>1?data[1].percentage:0}}%</div>
        <div>{{data && data.length>1?data[1].user_type:"新客户"}}</div>
        <div>{{data && data.length>1?data[1].count_users:0}}人</div>
      </div>
      <div class="p3">
        <div>总用户量</div>
        <div>{{totalVisitor}}人</div>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
import AcTitle from "../../components/acTitle";
import AcSubTitle from "../../components/acSubTitle";
export default {
  props:["data","totalVisitor"],
  components: {
    AcSubTitle,
    AcTitle
  },
  data() {
    return {
    };
  }
};
</script>
<style scoped>
.chart1 {
  width: 76px;
  height: 101px;
  background: url(../../assets/imgs/ancang/yuanzhu.png);
  background-size: 76px 101px;
  margin-top: 30px;
}

.chart1 .p1 {
  position: relative;
  top: 33px;
  left: 29px;
  background: url(../../assets/imgs/ancang/line-purple.png);
  background-size: 32px 3px;
  background-repeat: no-repeat;
  background-position-x: 33px;
  background-position-y: 8px;
  width: 65px;
  height: 15px;
}

.p1 > div {
  font-family: DIN;
  color: #ffffff;
  letter-spacing: 1.01px;
  width: 65px;
  height: 15px;
  font-size: 12px;
  transform: scale(0.65);
  left: -8px;
  position: relative;
}

.p1 > div:nth-of-type(2) {
  position: absolute;
  top: 0;
  left: 70px;
}

.p1 > div:nth-of-type(3) {
  position: absolute;
  top: 0;
  left: 110px;
}

.chart1 .p2 {
  position: relative;
  top: 48px;
  left: 29px;
  background: url(../../assets/imgs/ancang/line-green.png);
  background-size: 42px 3px;
  background-repeat: no-repeat;
  background-position-x: 23px;
  background-position-y: 6px;
  width: 65px;
  height: 15px;
}

.p2 div {
  font-family: DIN;
  color: #ffffff;
  letter-spacing: 1.01px;
  width: 65px;
  height: 15px;
  font-size: 12px;
  transform: scale(0.65);
  left: -8px;
  position: relative;
}

.p2 > div:nth-of-type(2) {
  position: absolute;
  top: 0;
  left: 70px;
}

.p2 > div:nth-of-type(3) {
    
  position: absolute;
  top: 0;
  left: 110px;
}

.chart1 .p3 {
  position: relative;
  top: -33px;
  left: 93px;
}

.p3 div {
  font-family: DIN;
  color: #56b1ff;
  letter-spacing: 1.01px;
  height: 15px;
  font-size: 12px;
  left: -8px;
  position: relative;
  transform: scale3d(0.9);
}

.p3 > div:nth-of-type(2) {
  font-family: DIN;
  position: absolute;
  top: 0;
  left: 56px;
  min-width: 61px;
}
</style>