

<template>
  <div class="bg">
    <page-layout>
      <div slot="slotHeader" class="page-header">
        <dv-decoration-5 style="width:45%;height:100px;margin-left:27.5%;" :color="['#2E6099', '#2E6099']" />
        <dv-decoration-8 style="width:20%;height:50px;position: absolute;;top:0" :color="['#2E6099', '#2E6099']"  />
        <dv-decoration-8
          :reverse="true"
          style="width:20%;height:50px;position: absolute;;top:0;right:0" :color="['#2E6099', '#2E6099']" 
        />
        <div class="header-name" style="top:25%;color:#2E6099">IBMS</div>
      </div>
      <div slot="slotContent" class="wrap">
        <!-- 左侧区域 -->
        <div class="left">
          <title-bar text="项目工单"></title-bar>
          <div class="module" style="display:inline-block">
            <alarms-show :data="statisticsData"></alarms-show>
          </div>
          <record-show v-if="!showSmallMap" :data="recordList"></record-show>
        </div>
        <!-- 中间区域 -->
        <div class="center">
          <warn-box></warn-box>
          <map-show
            :regionCode="$store.state.activeRegionCode"
            :project="$store.state.projectList"
            :areaList="$store.state.regionList"
            @func="callbackMap"
          ></map-show>
        </div>
        <div></div>
        <!-- 右侧区域 -->
        <div class="right">
          <div class="module" style="margin:0">
            <circle-show :data="statisticsData.projectTotal"></circle-show>
          </div>

          <div style="width:340px;margin-left:auto;">
            <title-bar text="项目列表" style="width:100%"></title-bar>
            <dv-border-box-12 style="height:300px">
              <project-list :data="recordList" @func="projectHandler"></project-list>
              <!-- <record-show v-if="!showSmallMap" :data="recordList"></record-show> -->
            </dv-border-box-12>
          </div>
          <trend-show v-if="!showSmallMap" :data="equipmentAlarmList"></trend-show>
        </div>
      </div>
    </page-layout>
  </div>
</template>
<script>
import MapShow from "../part/mapShow";
import PageLayout from "../../components/pageLayout";
import TitleBar from "../../components/titleBar";
import FooterMenu from "../../components/footerMenu";
import CircleShow from "../part/circleShow";
import AlarmsShow from "../part/alarmsShow";
import SystemInfo from "../part/systemInfo";
import TrendShow from "../part/trendShow";
import RecordShow from "../part/recordShow";
import ProjectList from "../part/projectList";
import SmallMap from "../part/smallMap";
import WarnBox from "../part/warnBox";

export default {
  name: "Index",
  props: ["userJson"],
  components: {
    PageLayout,
    TitleBar,
    FooterMenu,
    CircleShow,
    AlarmsShow,
    SystemInfo,
    TrendShow,
    RecordShow,
    MapShow,
    ProjectList,
    SmallMap,
    WarnBox,
  },
  data() {
    return {
      showSmallMap: false,
      statisticsData: {}, // 统计数据
      recordList: [], // 告警设备记录
      equipmentAlarmList: [], // 近十二天每日报警设备数量
      timerIndex: null, // 页面数据更新定时器
    };
  },
  mounted() {
    if (this.$store.state.activeRegionCode.indexOf("china") < 0) {
      this.showSmallMap = true;
      this.$store.commit("changeProjectList", []);
      this.getProject(this.$store.state.activeRegionId);
    }

    if (!this.showSmallMap) {
      this.getRecord();
      this.getAlarmEquipment();
    }

    this.getStatistics();
    this.getRegion();
    this.timerInterval();
  },
  beforeDestroy() {
    window.clearInterval(this.timerIndex);
  },
  methods: {
    // 定时器获取最新数据（项目统计数据）
    timerInterval() {
      window.clearInterval(this.timerIndex);
      this.timerIndex = window.setInterval(() => {
        this.getStatistics();
      }, 30000);
    },

    // 查询已接入区域
    getRegion() {
      this.$axios({
        method: "get",
        url: this.$baseUrl + "/s/region",
      })
        .then(({ data, status }) => {
          if (status == 200 && data.success) {
            this.$store.commit("changeRegionList", data.data);
          }
        })
        .catch((resp) => {
          console.log("请求失败");
        });
    },

    // 查询告近一个月每日报警设备数量
    getAlarmEquipment() {
      this.$axios({
        method: "get",
        url: this.$baseUrl + "/s/alarm/equipment",
      })
        .then(({ data, status }) => {
          if (status == 200 && data.success) {
            this.equipmentAlarmList = data.data;
          }
        })
        .catch((resp) => {
          console.log("请求失败");
        });
    },

    // 查询告警设备记录
    getRecord() {
      this.$axios({
        method: "get",
        url:
          this.$baseUrl +
          "/s/record?Page=1&PageSize=60&End=&Begin=" +
          this.dateTimeParam(),
      })
        .then(({ data, status }) => {
          if (status == 200 && data.success) {
            this.recordList = data.data.list;
          }
        })
        .catch((resp) => {
          console.log("请求失败");
        });
    },
    // 查询统计数据
    getStatistics() {
      this.$axios({
        method: "get",
        url: this.$baseUrl + "/s",
      })
        .then(({ data, status }) => {
          if (status == 200 && data.success) {
            this.statisticsData = data.data;
          }
        })
        .catch((resp) => {
          console.log("请求失败");
        });
    },

    // 底部按钮
    funcMapClick({ code, regionId }) {
      if (code == "china") {
        this.showSmallMap = false;
        this.$store.commit("changeRegionId", 0);
        this.$store.commit(
          "changeRegionCode",
          "china" + Math.random().toString()
        );
        if (
          this.recordList.length <= 0 ||
          this.equipmentAlarmList.length <= 0
        ) {
          this.getRecord();
          this.getAlarmEquipment();
        }
      } else if (code.indexOf("Area") > -1) {
        this.$store.commit("changeRegionId", regionId);
        this.$store.commit("changeRegionCode", code);
        this.showSmallMap = true;
        this.getProject(regionId);
      }
    },

    // 查询项目
    getProject(id) {
      this.$axios({
        method: "get",
        url: this.$baseUrl + "/s/project?regionid=" + id,
      })
        .then(({ data, status }) => {
          if (status == 200 && data.success) {
            console.log(data.data);
            this.$store.commit("changeProjectList", data.data);
          }
        })
        .catch((resp) => {
          console.log("请求失败");
        });
    },

    // 点击项目
    projectHandler(params) {
      this.$router.push({
        path: "/detail",
        query: {
          projectId: params.projectId,
          projectName: params.projectName,
        },
      });
    },

    // 地图事件
    callbackMap(id) {
      this.showSmallMap = true;
      this.getProject(id);
    },

    // 时间转换
    dateTimeParam() {
      const date = new Date();
      let startDate = new Date(Date.parse(new Date()) - 1036800000);
      let newDate =
        startDate.getFullYear().toString() +
        "-" +
        (startDate.getMonth() + 1 < 10 ? "0" : "") +
        (startDate.getMonth() + 1).toString() +
        "-" +
        (startDate.getDate() < 10 ? "0" : "") +
        startDate.getDate().toString() +
        " 00:00:00";

      return newDate;
    },
  },
};
</script>
<style scoped>
.center {
  width: 51.2%;
  height: 100%;
  float: left;
  position: relative;
}

.left {
  width: 15.6%;
  float: left;
  margin: 0 2.5%;
  box-sizing: border-box;
}

.right {
  width: 23.2%;
  float: left;
  box-sizing: border-box;
  margin: 0 2.5%;
}

</style>


