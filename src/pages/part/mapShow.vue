<template>
  <div class="map-box">
    <!-- @click="showChinaMap" -->
    <div class="myChart" ref="myEchart"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china";
import imgMap from "../../assets/imgs/marker.png";
import {
  staticProvinces,
  staticProvincesText,
} from "../../../static/utils/staticData";
import {
  areaTipImgBase64,
  scatterImgBase64,
  projectTipImgBase64,
} from "../../../static/utils/imgBase64Data";
import { allAreaData } from "../../../static/utils/allAreaData";

export default {
  name: "MapShow",
  props: ["regionCode", "project", "areaList"],
  data() {
    return {
      myChart: {},
      place: "china", // 当前地图类型
      chartSeries: [],
      geoCoordMap: [], // 项目经纬度点位
      selectedData: [], // 中国地图上选中区域
      staticProvinces, // 全部省份code
      staticProvincesText, // 全部省份name
      allAreaData, // 全部区域公司
      timer2: null,
      timer1: null, // 定时器
    };
  },
  watch: {
    regionCode(newD, oldD) {
      if (newD.indexOf("Area") > -1) {
        this.place = this.regionCode;
        this.getProvinceMap(this.place, "Area");
      } else if (newD != oldD) {
        this.place =
          this.regionCode.indexOf("china") > -1 ? "china" : this.regionCode;
        console.log("渲染中国地图", this.regionCode);
        this.selectedData = [];
        this.myChart.off("click");
        this.myChart.dispose();
        this.initMap();
        this.mapPointMove();
      }
    },
    project(newD, oldD) {
      console.log("渲染项目标点");
      if (this.myChart) {
        this.myChart.setOption(
          {
            series: [
              {
                name: "区域",
                type: "scatter",
                data: this.convertData(
                  this.selectedData
                    .sort(function (a, b) {
                      return b.value - a.value;
                    })
                    .slice(0, 6)
                ),
              },
            ],
          },
          { notMerge: false, lazyUpdate: false, silent: false }
        );
      }
    },
  },
  mounted() {
    this.place =
      this.regionCode.indexOf("china") > -1 ? "china" : this.regionCode;
    if (this.place.indexOf("china") < 0) {
      this.registerMap(this.place, "Area");
    }
    this.initMap();
    this.mapPointMove();
  },
  beforeDestroy() {
    window.clearInterval(this.timer1);
    window.clearTimeout(this.timer2);
    this.myChart.off("click");
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    // 初始化地图
    initMap() {
      this.myChart = echarts.init(this.$refs.myEchart);
      window.onresize = this.myChart.resize;

      let option = this.getMapOpt();
      if (option && typeof option === "object") {
        this.myChart.setOption(option, true);
      }

      let _this = this;
      this.myChart.off("click");
      this.myChart.on("click", (params) => {
        event.stopPropagation(); // 阻止冒泡
        var option = _this.myChart.getOption();
        // 找到省份名
        let provinceIndex = _this.staticProvincesText.findIndex((x) => {
          return params.name === x;
        });
        if (provinceIndex === -1) {
          // 没找到省份名,代表进入到了市图层
          return;
        } else {
          // 重新渲染各省份地图
          _this.getProvinceMap(
            _this.staticProvinces[provinceIndex],
            _this.staticProvincesText[provinceIndex]
          );
        }

        // 地图点击后传参到父页面
        try {
          this.allAreaData.forEach((element) => {
            element.areas.forEach((area) => {
              if (area.province == this.staticProvincesText[provinceIndex]) {
                this.$emit("func", element.id);
                throw "jumpout";
              }
            });
          });
        } catch (e) {}
      });
    },

    //显示各省地图
    getProvinceMap(province, _from) {
      window.clearInterval(this.timer1);
      window.clearTimeout(this.timer2);
      this.place = province;
      if (_from == "Area") {
        this.registerMap(province, _from);
      } else {
        this.registerMap(province, _from);
      }
      if (this.myChart) {
        this.myChart.setOption(this.getMapOpt(), {
          notMerge: false,
          lazyUpdate: false,
          silent: false,
        });
      }
    },

    // 注册地图
    registerMap(name, type) {
      if (type == "Area") {
        //注册区域地图
        echarts.registerMap(
          name,
          require("../../../static/utils/" + this.place + ".json")
        );
        // console.log("渲染区域地图", this.place);
      } else {
        //注册省级地图
        echarts.registerMap(
          name,
          require("../../../node_modules/echarts/map/json/province/" +
            name +
            ".json")
        );
        // console.log("渲染省份地图", this.place);
      }
    },

    //地图参数配置
    getMapOpt() {
      let option = {
        geo: {
          map: this.place ? this.place : "china",
          aspectScale: 0.75, //长宽比
          zoom: this.place != "china" ? 1.1 : 1.2,
          roam: false,
          itemStyle: {
            normal: {
              borderWidth: 3,
              borderColor: "#67D0FF",
              shadowColor: "#35447C",
              shadowOffsetX: -3,
              shadowOffsetY: 15,
              shadowBlur: 0,
            },
            emphasis: {},
          },
          regions: [
            {
              name: "南海诸岛",
              value: 0,
              itemStyle: {
                normal: {
                  opacity: 0,
                  label: {
                    show: false,
                  },
                },
              },
            },
          ],
        },
        series: this.configSeries(),
      };
      return option;
    },

    // 数据配置
    configSeries() {
      let _this = this;
      let chartSeries = [];
      chartSeries.push({
        name: "区域",
        type: "effectScatter",
        // symbol: areaTipImgBase64,
        // symbolSize: this.place != "china" ? [74, 99] : [107, 142],
        symbolSize:18,
        symbolOffset: [20, 0],
        rippleEffect: {
          color: "#0165BF",
          period: 6,
          scale: 2,
          brushType: "stroke",
        },
        itemStyle: {
          shadowOffsetY: 30,
        },
        symbolKeepAspect: true,
        coordinateSystem: "geo",
        data: this.convertData(
          this.selectedData
            .sort(function (a, b) {
              return b.value - a.value;
            })
            .slice(0, 6)
        ),
        encode: {
          value: 2,
        },
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke",
        },
        hoverAnimation: true,
        itemStyle: {
          color: "#00DFFF",
          shadowBlur: 10,
          shadowColor: "#333",
        },
        zlevel: 3,
      });

      chartSeries.push({
        type: "map",
        map: this.place ? this.place : "china",
        selectedMode: "multiple",
        zoom: this.place != "china" ? 1.1 : 1.2,
        geoIndex: 1,
        aspectScale: 0.75, //长宽比
        roam: false,
        emphasis: {
          label: {
            show: false,
            color: "#ffffff",
          },
          itemStyle: {
            areaColor: "#044B8A",
            borderWidth: 0,
            shadowBlur: 0,
            shadowColor: "rgba(73,170,223,1)",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
          },
        },
        itemStyle: {
          normal: {
            label: {
              show: this.place == "china" ? true : false,
              fontSize: 12,
              color: "#ffffff",
            },
            areaColor: this.place.indexOf("china") > -1 ? "#173261" : "#044B8A",
            borderColor: "#35447C", //省市边界线041460
            borderWidth: 1,
            shadowBlur: 0,
          },
        },
        data: this.selectedData, // this.getSelectedArea()
      });

      return chartSeries;
    },

    // 数据转换
    convertData(data) {
      if (this.place.indexOf("china") > -1) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          this.allAreaData.forEach((element) => {
            res.push({
              name: element.name,
              value: element.addressCoordinate
                .concat(0)
                .concat(0)
                .concat(0),
            });
          });
        }
        return res;
      } else {
        this.selectedData = [];
        this.geoCoordMap = [];
        if (this.project.length > 0) {
          this.project.forEach((element) => {
            this.geoCoordMap.push({
              name: element.projectName,
              value: [element.longitude, element.latitude, 100],
            });
          });
        }
        return this.geoCoordMap;
      }
    },

    // 动态移动地图标点以及选中区域
    mapPointMove() {
      window.clearTimeout(this.timer2);
      if (this.place.indexOf("china" > -1)) {
        this.renderPointArea();
      }
    },

    // 渲染区域
    renderPointArea() {
      this.selectedData = [];
      this.allAreaData.forEach((areas) => {
        areas.areas.forEach((area) => {
          this.selectedData.push({
            name: area.province,
            selected: true,
            code: areas.code,
            projectCount: 0,
            equipmentCount: 0,
            alarmCount: 0,
          });
        });
      });

      // let mark = Math.floor(Math.random() * 2); // 随机取一个区域
      // try {
      //   if (mark === 0) {
      //     this.selectedData.push({
      //       name: "重庆区域公司",
      //       selected: true,
      //       code: "chongqingArea",
      //       projectCount: 1,
      //       equipmentCount: 1,
      //       alarmCount: 1,
      //     });
      //   } else {
      //     this.selectedData.push({
      //       name: "中部区域公司",
      //       selected: true,
      //       code: "zhongbuArea",
      //       projectCount: 2,
      //       equipmentCount: 2,
      //       alarmCount: 2,
      //     });
      //   }
      // } catch (e) {}

      // this.myChart.off("click");
      // this.myChart.dispose();
      // console.log("渲染区域标点");
      // this.initMap();
      // let option = this.getMapOpt(this.place);
      if (this.myChart) {
        this.myChart.setOption(
          {
            series: this.configSeries(),
          },
          { notMerge: false, lazyUpdate: false, silent: false }
        );
      }
    },
  },
};
</script>
<style scoped>
.map-box {
  width: 100%;
  height: 100%;
  /* background-image: url(../../assets/imgs/map-bg.png); */
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: 50% 40px;
  position: relative;
}
.myChart {
  width: 100%;
  height: 100%;
}

.map-legend {
  position: absolute;
  bottom: 7%;
  left: 4%;
}

.legend-item {
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #ffffff;
  letter-spacing: 0;
}

.legend-item > span:nth-of-type(1) {
  display: inline-block;
  width: 39px;
  height: 15px;
  background: #09579b;
  margin-right: 18px;
}

.legend-item {
  margin-bottom: 15px;
}

.legend-item:nth-of-type(2) > span:nth-of-type(1) {
  background: #002844;
}

.map-protocol {
  width: 275px;
  height: 67px;
  background: url(../../assets/imgs/icon-text-bg.png) no-repeat left;
  background-size: 100% 100%;
  position: relative;
}

.protocol-move1 {
  width: 151px;
  height: 3px;
  border: 1px solid #003480;
  position: absolute;
  top: 2px;
  left: 77px;
}

.protocol-move1::after {
  content: "";
  width: 2px;
  height: 3px;
  background: #ffffff;
  position: absolute;
  left: 0;
  top: 0px;
}

.protocol-move1::before {
  content: "";
  width: 2px;
  height: 3px;
  background: #ffffff;
  position: absolute;
  right: 0;
  top: 0px;
}

.protocol-move1-active {
  width: 60px;
  height: 3px;
  border: 1px solid #003480;
  background: rgba(255, 255, 255, 0.6);
  position: absolute;
  top: -1px;
  overflow: hidden;
  animation: protocolMove1 6s ease-in-out infinite alternate;
}

@keyframes protocolMove1 {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(140%);
  }
}

@keyframes protocolMove2 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes protocolMove3 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.protocol-move2 {
  position: absolute;
  top: 42px;
  left: 67px;
}

.protocol-move2 > img {
  width: 25px;
  height: 25px;
}

.protocol-move2 > img:nth-of-type(1) {
  animation: protocolMove2 9s linear infinite;
}

.protocol-move2 > img:nth-of-type(2) {
  animation: protocolMove3 9s linear infinite;
}
</style>