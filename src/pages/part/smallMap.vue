<template>
  <div class="small-map">
    <div class="small-map-bg">
      <div class="myChart" ref="myEchart" ></div>
    </div>
    <div class="click-area"  @click="backMap"></div>
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

export default {
  data() {
    return {
      place: "china",
      originName: "重庆",
      chartSeries: [],
      selectedData: [
       // { name: "四川", selected: true } // 填充地图上重庆区域
      ],
      provinces: staticProvinces,
      provincesText: staticProvincesText,

      myChart: {},
      province: "" //记录进入的省级地图名称
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    backMap() {
      this.$emit("func", {code:"china"});
    },
    // 初始化地图
    initMap() {
      this.myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
      window.onresize = this.myChart.resize;

      let option = this.getMapOpt(this.place);
      if (option && typeof option === "object") {
        this.myChart.setOption(option, true);
      }
    },

    //地图参数配置
    getMapOpt() {
      let option = {
        // backgroundColor: "#050810",
        tooltip: {}, // 鼠标移到图里面的浮动提示框
        geo: {
          map: this.place ? this.place : "china",
          aspectScale: 0.75, //长宽比
          zoom: 0.88,
          roam: false,
          itemStyle: {
            normal: {
              borderWidth: 2,
              borderColor: "#43BAFF",
              shadowColor: "#061F3F",
              shadowOffsetX: -2,
              shadowOffsetY: 5,
              shadowBlur: 0
            },
            emphasis: {
              // color: "rgba(37, 43, 61, .5)" //悬浮背景
            }
          },
          regions: [
            {
              name: "南海诸岛",
              value: 0,
              itemStyle: {
                normal: {
                  opacity: 0,
                  label: {
                    show: false
                  }
                }
              }
            }
          ]
        },
        series: this.configSeries(this.place)
      };
      return option;
    },

    // 数据配置
    configSeries() {
      let chartSeries = [];
      chartSeries.push({
        type: "map",
        map: this.place ? this.place : "china",
        selectedMode: "multiple",
        zoom: 0.88,
        geoIndex: 1,
        aspectScale: 0.75, //长宽比
        roam: false,
        emphasis: {
          label: {
            show: true,
            color: "#ffffff",
            fontSize: 8
          },
          itemStyle: {
            areaColor: "#044B8A"
          }
        },
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            areaColor: "#002B51",
            borderColor: "#0F4494", //省市边界线041460
            borderWidth: 1
          }
        },
        data: this.selectedData
      });

      return chartSeries;
    },

    // 数据转换
    convertData(data) {
      let _this = this;
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = _this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    }
  }
};
</script>
<style scoped>
.small-map {
  width: 353px;
  height: 290px;
  float: right;
  margin-right: 25px;
  margin-top: 20px;
  background: url(../../assets/imgs/small-map-box.png) no-repeat center;
  background-size: 100% 100%;
  position: relative;
}

.click-area{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;

}

.small-map-bg {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/imgs/map-bg.png);
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  position: relative;
}

.myChart {
  width: 100%;
  height: 100%;
}
</style>