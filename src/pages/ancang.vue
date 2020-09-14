<template>
  <div class="ac-page">
    <!-- 顶部区域 -->
    <div class="ac-header">
      <div></div>
      <div class="header-right">
        <weather></weather>
      </div>
    </div>
    <div class="ac-content">
      <div class="left">
        <ac-title text="客流检测"></ac-title>
        <!-- 客流检测系统 -->
        <div class="module-card">
          <ac-customer :data="visitorFlow" :totalVisitor="totalVisitorFlow"></ac-customer>
        </div>
        <!-- 到访次数比例 -->
        <div class="module-card">
          <ac-visitor :data="visitorCount"></ac-visitor>
        </div>
        <!-- 驻客停留时长分布统计 -->
        <div class="module-card">
          <ac-staytime :data="timeGroup"></ac-staytime>
        </div>
        <!-- 区域客流数 -->
        <div class="module-card">
          <ac-area-customer :dataX="areaUserData.dataX" :dataY1="areaUserData.dataY1"></ac-area-customer>
        </div>
        <!-- 访客统计分析 -->
        <div class="module-card1">
          <ac-visitor-analysis :data="visitorHour"></ac-visitor-analysis>
        </div>
        <!-- 到访排行 -->
        <div class="module-card1" style="margin-top:40px">
          <ac-visitor-top :data="blackTopList"></ac-visitor-top>
        </div>
      </div>
      <div class="center">
        <!-- 动线轨迹 -->
        <ac-map
          v-if="!showLiudu"
          :projectId="projectId"
          :hotConfig="hotConfig"
          :areaVisitorAll="areaVisitorAll"
          :sexData="sexData"
          :ageVisitorGroup="ageVisitorGroup"
          :timeUserDataDetail="timeUserDataDetail"
          :timeUserData="timeUserData"
          :selectedPointList="selectedPointList"
        ></ac-map>
        <!-- 六度关系图 -->
        <ac-liudu v-if="showLiudu" :iframUrl="iframUrl"></ac-liudu>
        <!-- 车辆数据抓取 -->
        <ac-car-list></ac-car-list>
      </div>
      <div class="right">
        <!-- 人脸抓拍列表 -->
        <ac-user-list :data="userListData" @func="showCenterModule"></ac-user-list>
        <!-- 案场监控 -->
        <ac-monitor-list></ac-monitor-list>
      </div>
    </div>
  </div>
</template>
<script>
import AcTitle from "../components/acTitle";
import Weather from "./acpart/weather";
import AcCustomer from "./acpart/acCustomer";
import AcVisitor from "./acpart/acVisitor";
import AcStaytime from "./acpart/acStaytime";
import AcAreaCustomer from "./acpart/acAreaCustomer";
import AcVisitorAnalysis from "./acpart/acVisitorAnalysis";
import AcVisitorTop from "./acpart/acVisitorTop";
import AcMap from "./acpart/acMap";
import AcCarList from "./acpart/acCarList";
import AcUserList from "./acpart/acUserList";
import AcMonitorList from "./acpart/acMonitorList";
import AcLiudu from "./acpart/acLiudu";

export default {
  name: "Index",
  components: {
    Weather,
    AcCustomer,
    AcTitle,
    AcVisitor,
    AcStaytime,
    AcAreaCustomer,
    AcVisitorAnalysis,
    AcVisitorTop,
    AcMap,
    AcCarList,
    AcUserList,
    AcMonitorList,
    AcLiudu
  },
  data() {
    return {
      projectId: "a57283b342a74efa9369f24b37a32e68",
      currentDate: "",
      currentChart1Tab: "DAY",
      visitorFlow: [], // 客流检测数据
      totalVisitorFlow: 0,
      areaUserData: {
        dataX: ["入口2", "出口1", "接待室", "人脸", "入口2", "出口2"],
        dataY1: [0, 0, 0, 0, 0, 0]
      }, // 区域客流数
      visitorCount: {}, // 到访次数比例
      areaVisitorAll: {}, // 访问总人数、总停留时长统计
      timeGroup: [], // 停留时长分布统计
      visitorHour: {}, // 访客统计分析
      blackTopList: [], // 到访排行
      sexData: [], // 性别
      ageVisitorGroup: [], // 年龄段
      timeUserData: {
        dataX: [1, 2, 3, 4],
        dataY: [11, 22, 44, 66, 77, 88]
      }, // 分时客流量
      timeUserDataDetail: {
        days: 0,
        yesterday: 0,
        per: 0,
        todayTop: "0:00",
        yestodayTop: "0:00",
        dataX: [1, 2, 3, 4],
        todayDataY: [11, 22, 44, 66, 77, 88],
        yesDataY: [11, 22, 44, 66, 77, 88]
      }, // 分时客流量详细
      carListData: [], // 车辆数据列表
      userListData: [], // 人脸数据列表
      iframUrl: "", // 六度地址
      hotConfig: {}, // 地图配置
      selectedPointList: [], // 动线点位
      monitorUrls:[], // 摄像头列表
      currentMonitorInfo:{}, // 当前摄像头信息
      showLiudu: false
    };
  },
  beforeDestroy() {},
  mounted() {
    this.currentDate = this.getCurrentDate();
    this.queryVisitorFlow(); // 客流检测
    this.queryVisitorProportion(); // 获取到访次数比例
    this.queryTimeGroup(); // 停留时长分布统计
    this.queryVisitorHour(); // 访客统计分析
    this.queryBlackTop(); // 到访排行
    this.getHotArea(); // 获取停留总时长，以及区域客流数
    this.getSex(); // 获取性别
    this.ageGroup(); // 获取年龄段
    this.getTimerUser(); // 分时客流量
    this.getCarData(); // 车辆数据抓取
    this.getUserData(); // 人脸数据抓取
    this.initHotAreaConfig(); // 地图基本配置
    this.getMonitorList(); // 获取摄像头列表
    // this.queryAreaFlow(); // 获取区域客流
  },
  methods: {
    // 获取人脸数据抓取
    getUserData() {
      this.$axios({
        method: "post",
        url:
          this.$acUserBaseUrl +
          "/api/faceRecord/getUserList?projectId=" +
          this.projectId
      })
        .then(({ data, status }) => {
          if (data.code == 200) {
            console.log("人脸数据列表", data.data.data);
            this.userListData = data.data.data;
          }
        })
        .catch(resp => {
          console.log("请求失败");
        });
    },

    // 获取车辆数据抓取
    getCarData() {
      this.$axios
        .post(this.$acBaseUrl + "/api/car/query/list", {
          projectId: this.projectId
        })
        .then(response => {
          console.log("车辆数据抓取", response.data.data);
          if (response.data.errcode == 200 && response.data.data.length > 0) {
            this.allCarListData = response.data.data;
            var carListData = [];
            this.allCarListData.forEach((element, index) => {
              element.showBig = false;
              if (index < 2) {
                carListData.push(element);
              }
            });
            this.carListData = carListData;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 分时客流量
    getTimerUser() {
      //  this.$axios({
      //   method: "post",
      //   url: this.$acBaseUrl + "/api/visitor/query/hourVisitor?projecId=" + this.projectId
      // })

      this.$axios
        .post(this.$acBaseUrl + "/api/visitor/query/hourVisitor", {
          projectId: this.projectId
        })
        .then(response => {
          console.log("分时客流量", response.data.data);
          var result = response.data.data;
          var mark = 1,
            mark2 = 1,
            top2 = 2;
          var cacheResult = { dataX: [], dataY: [] },
            cacheResult2 = { dataX: [], todayDataY: [] };
          var cacheHeights = 0,
            cacheHeights2 = 0;
          result.forEach((element, index) => {
            if (index < 24) {
              // 4个小时一个时间段
              if (mark <= 4) {
                cacheHeights = cacheHeights + element.count_user;
              }

              if (mark == 4) {
                cacheResult.dataX.push(element.HOUR + ":00");
                cacheResult.dataY.push(cacheHeights);
                mark = 1;
                cacheHeights = 0;
              } else {
                mark++;
              }

              // 2个小时一个时间段
              if (mark2 <= 2) {
                cacheHeights2 = cacheHeights2 + element.count_user;
              }

              if (mark2 == 2) {
                if (cacheHeights2 >= top2) {
                  top2 = cacheHeights2;
                  this.timeUserDataDetail.todayTop = element.HOUR + ":00";
                }
                cacheResult2.dataX.push(element.HOUR + ":00");
                cacheResult2.todayDataY.push(cacheHeights2);
                mark2 = 1;
                cacheHeights2 = 0;
              } else {
                mark2++;
              }
            }
          });

          this.timeUserData = cacheResult;
          this.timeUserDataDetail.dataX = cacheResult2.dataX;
          this.timeUserDataDetail.todayDataY = cacheResult2.todayDataY;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 年龄
    ageGroup() {
      this.$axios
        .post(this.$acBaseUrl + "/api/visitor/query/ageVisitor", {
          projectId: this.projectId
        })
        .then(response => {
          if (response.data.errcode == 200 && response.data.data.length > 0) {
            console.log("客户年龄分组", response.data.data);
            this.ageVisitorGroup = response.data.data;
            // this.ageGroupList = response.data.data;
            // this.visitorStayTimeChart = [];
            // var resultD = [];
            // response.data.data.forEach(element => {
            //   resultD.push({
            //     value: element.user_count + 1,
            //     name: element.user_count + "人\n" + element.ages
            //   });
            // });
            // this.visitorStayTimeChart = resultD;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 获取性别比例
    getSex() {
      this.$axios
        .post(this.$acBaseUrl + "/api/visitor/query/genderVisitor", {
          projectId: this.projectId
        })
        .then(response => {
          if (response.data.errcode == 200) {
            console.log("性别", response.data.data);
            this.sexData = response.data.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 获取停留总时长、访问总数
    getHotArea() {
      this.$axios
        .post(this.$acBaseUrl + "/api/visitor/query/nowVisitor", {
          projectId: this.projectId
        })
        .then(response => {
          console.log("获取停留总时长，区域客流", response.data.data);
          if (response.data.errcode == 200) {
            this.areaVisitorAll = response.data.data.minUserCount;
            let dataX = [],
              dataY1 = [];
            response.data.data.point.forEach(element => {
              dataY1.push(element.userCount);
              dataX.push(element.cameraName);
            });
            this.areaUserData = { dataX, dataY1 };
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 到访次数比例
    queryVisitorProportion() {
      this.$axios
        .post(this.$acBaseUrl + "/api/visitor/query/scaleVisitor", {
          projectId: this.projectId
        })
        .then(response => {
          if (response.data.errcode == 200) {
            var dataX = [];
            var dataY = [];
            response.data.data.forEach((element, index) => {
              dataY.push(element.percentage);
              if (index >= 4) {
                dataX.push(element.groups + "次以上");
              } else {
                dataX.push(
                  (element.groups == 1 ? "首" : element.groups) + "次"
                );
              }
            });
            this.visitorCount = { dataX, dataY };
          }
          console.log("客户到访比例：", response.data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 区域客流数
    // queryAreaFlow() {
    //   this.$axios
    //     .post(this.$acBaseUrl + "/api/visitor/query/areaVisitor", {
    //       projectId: this.projectId
    //     })
    //     .then(response => {
    //       console.log("区域客流数", response.data.data);
    //       if (response.data.errcode == 200 && response.data.data.length > 0) {
    //         let dataX = [],
    //           dataY1 = [];
    //         response.data.data.forEach(function(item, index) {
    //           dataY1.push(item.countVisitor);
    //           dataX.push(item.cameraName);
    //         });
    //         this.areaUserData = { dataX, dataY1 };
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },

    // 客流检测
    queryVisitorFlow() {
      this.$axios({
        method: "post",
        url:
          this.$acBaseUrl +
          "/statisticsRestService/queryVisitorGroup?projectId=" +
          this.projectId +
          "&startTimeStr=" +
          this.currentDate
      })
        .then(({ data, status }) => {
          if (data.code == 200) {
            this.visitorFlow = data.data.result;
            data.data.result.forEach(element => {
              this.totalVisitorFlow += element.count_users;
            });
          }
        })
        .catch(resp => {
          console.log("请求失败");
        });
    },

    // 停留时长分布统计
    queryTimeGroup() {
      this.$axios({
        method: "post",
        url:
          this.$acBaseUrl +
          "/statisticsRestService/queryTimeGroup?projectId=" +
          this.projectId +
          "&startTimeStr=" +
          this.currentDate
      })
        .then(({ data, status }) => {
          if (data.code == 200) {
            this.timeGroup = data.data.result;
          }
        })
        .catch(resp => {
          console.log("请求失败");
        });
    },

    // 访客统计分析
    queryVisitorHour() {
      this.$axios({
        method: "post",
        url:
          this.$acBaseUrl +
          "/statisticsRestService/queryVisitorHour?projectId=" +
          this.projectId +
          "&startTimeStr=" +
          this.currentDate
      })
        .then(({ data, status }) => {
          if (data.code == 200) {
            let dataX = [],
              dataY1 = [],
              dataY2 = [],
              dataY3 = [];
            data.data.result.forEach(element => {
              dataX.push(element.HOUR + ":00");
              dataY1.push(element.count_user);
              dataY2.push(element.count_user_white);
              dataY3.push(element.count_user_black);
            });
            this.visitorHour = { dataX, dataY1, dataY2, dataY3 };
          }
        })
        .catch(resp => {
          console.log("请求失败");
        });
    },

    // 到访排行
    queryBlackTop() {
      this.$axios({
        method: "post",
        url:
          this.$acBaseUrl +
          "/statisticsRestService/queryBlackTop?projectId=" +
          this.projectId +
          "&startTimeStr=" +
          this.currentDate
      })
        .then(({ data, status }) => {
          if (data.code == 200) {
            this.blackTopList = data.data.result;
          }
        })
        .catch(resp => {
          console.log("请求失败");
        });
    },

    // 切换中间部分显示 展示六度关系图或者动线图
    showCenterModule(param) {
      this.showLiudu = param.tab == 2 ? true : false;
      if (param.tab == 2) {
        this.iframUrl =
          "http://digital.tq-service.com/tqdata/template/relationsMap.html?_modulePartId_=ea7615046b6f4b36a1d8041f540ddf66&faceUrl=" +
          param.face_url +
          "&visitorId=" +
          param.visitor_id +
          "&time=" +
          param.happen_time +
          "&projectId=" +
          this.projectId;
      } else {
        // 查询动线图
        this.getUserDxs(param.visitor_id, param.happen_time);
      }
    },

    // 初始化热力图配置
    initHotAreaConfig() {
      // 获取缓存中的热力图配置
      /* var cacheData = window.localStorage.getItem("hotConfig");
            if (cacheData) {
                this.hotConfig = JSON.parse(cacheData);
                return;
            } */
      this.hotConfig = {};
      this.$axios
        .post(this.$acBaseUrl + "/api/hot/query/json", {
          projectId: "26b64bb23b5145168fef7821cf62f2b1" //this.projectId // '26b64bb23b5145168fef7821cf62f2b1' //  // "" //
        })
        .then(response => {
          if (
            response.data.errcode == 200 &&
            response.data.data != null &&
            response.data.data.hotJson !== ""
          ) {
            //window.localStorage.setItem("hotConfig", response.data.data.hotJson);
            let cache = JSON.parse(response.data.data.hotJson);
            console.log("获取地图配置", cache);
            this.hotConfig = cache;
          }
        })
        .catch(function(error) {
          console.log("获取地图配置失败");
        });
    },

    // 获取动线
    getUserDxs(userId, time) {
      this.$axios({
        method: "post",
        url:
          this.$acUserBaseUrl +
          "/api/faceRecord/getUserDxs?userId=" +
          userId +
          "&snapTime=" +
          time
      })
        .then(({ data, status }) => {
          if (data.code == 200) {
            console.log("获取动线", data.data.data);
            this.selectedPointList = data.data.data;
          }
        })
        .catch(function(error) {
          console.log("获取动线失败");
        });
    },

    // 获取摄像头列表
    getMonitorList() {
      this.$axios
        .post(this.$acBaseUrl + "/api/hk/query/video", {
          projectId: this.projectId
        })
        .then(response => {
          if (response.data.errcode == 200 && response.data.data.length > 0) {
            let cacheList = [];
            response.data.data.forEach((element, index) => {
              cacheList.push({
                ...element,
                url: element.playUrl,
                cameraChannelNum: index + 1
              });
            });
            this.monitorUrls = cacheList;
            console.log("摄像头列表：", this.monitorUrls);
            this.currentMonitorInfo.playUrl = this.monitorUrls[0].playUrl;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    getCurrentDate() {
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1;
      let day = nowDate.getDate();
      return (
        year.toString() +
        "-" +
        (month < 10 ? "0" : "") +
        month.toString() +
        "-" +
        (day < 10 ? "0" : "") +
        day.toString()
      );
    }
  }
};
</script>
<style scoped>
.ac-page {
  width: 100%;
  height: 100%;
  font-family: PingFangSC-Semibold;
}

.ac-header {
  width: 100%;
  height: 109px;
  background-image: url(../assets/imgs/ancang/ac-header.png);
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}

.ac-content {
  margin: 0 50px;
}

.header-right {
  position: absolute;
  right: 73px;
  top: 37px;
}

.center {
  width: 50%;
  height: 100%;
  float: left;
  position: relative;
}

.left {
  width: 25%;
  float: left;
  /* margin: 0 2.5%; */
  box-sizing: border-box;
}

.right {
  width: 25%;
  float: left;
  box-sizing: border-box;
  /* margin: 0 2.5%; */
}
</style>