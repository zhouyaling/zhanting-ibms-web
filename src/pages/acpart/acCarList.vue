<template>
  <div class="module-center-2">
      <ac-sub-title text="车辆数据抓取"></ac-sub-title>
    <div
      class="more-info"
      style="top:-12px!important;right:222px!important"
      @click="showPanel('car')"
    ></div>
    <div class="module-carinfo">
      <div class="car-list-wrap">
        <div class="car-box" v-for="(item,index) in carlist" :key="index">
          <div style="position: relative;">
            <div class="car-img-box" @click="clickImg(true,item.carNum)">
              <img class="car-img" v-bind:src="item.carImg" alt />
              <!-- <div v-if="item.showBig==true  && modulename==1" class="icon-scale-hide">
                <img src="../../assets/imgs/ancang/icon-scale-small.png" />
              </div>
              <div v-if="item.showBig==false  && modulename==1" class="icon-scale-show">
                <img src="../../assets/imgs/ancang/icon-scale-big.png" />
              </div> -->
            </div>
            <div class="car-mark">{{item.carCount==1?'首':item.carCount}}次</div>
          </div>
          <div>
            <p>车牌</p>
            <p>{{item.carNum}}</p>
          </div>
          <div>
            <p>品牌</p>
            <p>{{item.carBrands}}</p>
          </div>
          <div>
            <p>颜色</p>
            <p>{{item.carColor}}</p>
          </div>
          <div>
            <p>到访时间</p>
            <p>{{item.insertTimes}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AcSubTitle from '../../components/acSubTitle'
export default {
  props: {
    carlist: {
      type: Array,
      default: function() {
        return [
          {
            carImg: "",
            carNum: "--",
            carBrands: "--",
            carColor: "--",
            insertTimes: "--",
            carCount: "1"
          },
           {
            carImg: "",
            carNum: "--",
            carBrands: "--",
            carColor: "--",
            insertTimes: "--",
            carCount: "2"
          }
        ];
      }
    },
    modulename: {
      type: Number,
      default: function() {
        return 0;
      }
    }
  },
  components:{
      AcSubTitle
  },
  watch:{
    carlist(newD,oldD){
      if(newD.length>0){

      }
    }
  }
};
</script>
<style scoped>

.module-center-2 {
  position: relative;
  left: 105px;
  top: 0px;
  /* width: 70%; */
}

.car-list-wrap {
  overflow-x: hidden;
  overflow-y: scroll;
  width: 104%;
  height: 100%;
}

.module-carinfo {
  width: 700px;
  /* height: 100px; */
  position: absolute;
  top: 20px;
  /* left: 20px; */
  overflow: hidden;
}

.module-carinfo .car-box {
  opacity: 0.7;
}

.car-box {
  width: 100%;
  height: 66px;
  background: url(../../assets/imgs/ancang/car-info-box.png) no-repeat center;
  background-size: 100% 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.car-box p {
  padding: 0 !important;
  margin: 0 !important;
  height: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.car-box div {
  display: inline-block;
  float: left;
  font-size: 12px;
  color: #ffffff;
  width: 19%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 65%;
}

.car-box div p:nth-of-type(1) {
  font-size: 12px;
  color: #a6c8ff;
}

.car-box .car-img-box {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #044bb4;
  cursor: pointer;
}

.car-box .car-img-box .car-img {
  width: 40px;
  height: 40px;
  border-radius: 2px;
}

.car-box .car-img-box .icon-scale-show {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.car-box .car-img-box .icon-scale-show img {
  width: 18px;
  height: 18px;
}

.car-box .car-img-box .icon-scale-hide {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.car-box .car-img-box .icon-scale-hide img {
  width: 18px;
  height: 18px;
}

.car-box .car-mark {
  position: absolute;
  top: -18px;
  left: 20px;
  width: 30px;
  height: 30px;
  background: url(../../assets/imgs/ancang/ico-mark.png) no-repeat center;
  background-size: 30px auto;
  text-align: center;
  font-size: 10px !important;
}

.module-carinfo .car-box:nth-of-type(2) {
  transform: scale3d(0.9, 0.9, 1);
}
</style>