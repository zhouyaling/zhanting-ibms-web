<template>
  <div class="weather-nav">
    <div class="weather-yun"></div>
    <div class="module-weather-1">
      <div>{{weatherData.year}}</div>
      <div>
        <span>{{weatherData.week}}</span>
        <!-- <span>阴</span> -->
      </div>
    </div>

    <div class="weather-arrow"></div>
    <div class="module-weather">
      <div style="position:relative">
        <span>{{weatherData.time}}</span>
        <span class="weath-mark">{{weatherData.mark}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    weatherData: {
      type: Object,
      default: function() {
        return {
          year: "--",
          week: "--",
          time: "00:00:00",
          mark: "AM"
        };
      }
    },
    weeks: {
      type: Array,
      default: function() {
        return [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期天"
        ];
      }
    }
  },
  mounted() {
    // 天气
    var _this = this;
    setInterval(function() {
      _this.getWeather();
    }, 1000);
  },
  methods: {
    // 展示动线
    getWeather() {
      let nowDate = new Date();
      this.weatherData.time = nowDate.toTimeString().split(" ")[0];
      this.weatherData.mark =
        nowDate.toLocaleTimeString().indexOf("下午") > -1 ? "PM" : "AM";
      this.weatherData.year = nowDate
        .toLocaleDateString()
        .replace("/", ".")
        .replace("/", ".");
      this.weatherData.week = this.weeks[nowDate.getDay() - 1];
    }
  }
};
</script>
<style scoped>
.weather-nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.module-weather {
  width: 100px;
  background: #080b17;
  font-size: 27px;
  color: #ffffff;
  font-family: DIN;
}

.weath-mark {
  display: inline-block;
  font-size: 10px;
  position: absolute;
  top: 4px;
  right: -18px;
}

.module-weather-1 {
  width: 45px;
  background: #080b17;
  font-size: 10px;
  color: #ebebeb;
  margin-right: 20px;
}

.module-weather-1 > div:nth-of-type(1) {
  font-family: DIN;
}

.module-timer {
  width: 96px;
  height: 160px;
  background: #040714;
  position: absolute;
  top: 52px;
  left: 754px;
}

.module-timer div {
  text-align: right;
  font-size: 10px;
  color: #ffffff;
  margin-bottom: 25px;
  border-right: 2px solid #0061ea;
  padding-right: 10px;
}

.module-timer div:nth-of-type(1) {
  border-right: 2px solid #7dfeff !important;
}

.module-timer div p span {
  letter-spacing: 2px;
  font-weight: 500;
  font-size: 18px;
  font-family: din;
}

.weather-arrow {
  width: 33px;
  height: 23px;
  background: url(../../assets/imgs/ancang/icon-arrow.png) no-repeat left;
  background-size: auto 100%;
  margin-right: 36px;
}

.weather-yun {
  width: 29px;
  height: 26px;
  background: url(../../assets/imgs/ancang/icon-yun.png) no-repeat left;
  background-size: 100% 100%;
  margin-right: 10px;
}
</style>