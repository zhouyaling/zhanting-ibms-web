<template>
  <div class="bg-earth">
    <page-layout>
      <div slot="slotHeader" class="page-header">
        <div class="header-name">{{projectName}}</div>
      </div>

      <div slot="slotContent" class="wrap">
        <!-- 顶部区域 -->
        <project-text-info :data="statisticsData"></project-text-info>
        <!-- 卡片区域  @click="getUrl1('IBMS010101')"-->
        <div class="card monitor-card">
          <a :href="getUrl('IBMS010101')" target="_blank">
            <monitor-box :data="subSystemData.videoMonitor"></monitor-box>
          </a>
        </div>
        <div class="card" v-bind:class="delay1?'car-card':''">
          <a :href="getUrl('ParkIndex')"  target="_blank">
            <car-box :data="subSystemData.parking"></car-box>
          </a>
        </div>
        <div class="card" v-bind:class="delay2?'xungeng-card':''">
          <a :href="getUrl('IBMS010104')"  target="_blank">
            <xunggeng-box :data="subSystemData.patrol"></xunggeng-box>
          </a>
        </div>
        <div
          class="card menjin-card"
          v-bind:class="showProject?'block-opacity':''"
          style="display:block"
        >
          <a :href="getUrl('Card')"  target="_blank">
            <menjin-box :data="subSystemData.door"></menjin-box>
          </a>
        </div>
        <div class="card" v-bind:class="delay1?'xiaofang-card':''">
          <a :href="getUrl('IBMS010106')"  target="_blank">
            <xiaofang-box :data="subSystemData.fire"></xiaofang-box>
          </a>
        </div>
        <div class="card" v-bind:class="delay2?'shequ-card':''">
          <a :href="getUrl('FaceCardIndex')"  target="_blank">
            <shequ-box :data="subSystemData.communitySecurity"></shequ-box>
          </a>
        </div>
        <div class="circle-btn-box">
          <div class="project-circle-btn" @click="showProjectHandler"></div>
          <div v-if="showProject" class="project-box">
            <project-list :data="$store.state.projectList" @func="projectHandler"></project-list>
          </div>
        </div>
        <!-- 呼吸灯 -->
        <div class="breath-box">
          <breath-light></breath-light>
        </div>
        <div class="breath-box1">
          <breath-light></breath-light>
        </div>
        <!-- 按钮区域 -->
        <div class="action-btn">
          <action-bottom :projectId ="projectId"></action-bottom>
        </div>
        <!-- 飞线效果 -->
        <div class="earth-animate">
          <dv-flyline-chart-enhanced :config="config" style="width:100%;height:100%;" />
        </div>
      </div>
      <!-- 底部区域 -->
      <div slot="slotFooter" class="footer-content">
        <footer-menu
          @func="funcMapClick"
          :data="$store.state.regionList"
          :activeRegionId="$store.state.activeRegionId"
        ></footer-menu>
      </div>
    </page-layout>
    <!-- 弹窗 -->
    <div class="ibms-modal" v-show="showModal">
      <iframe :src="ibmsUrl" frameborder="0"></iframe>
      <div class="modal-back-btn" @click="backPage"></div>
    </div>
  </div>
</template>
<script>
import merge from 'webpack-merge';
import population from "../../static/utils/population";
import PageLayout from "../components/pageLayout";
import FooterMenu from "../components/footerMenu";
import BreathLight from "../components/breathLight";
import ProjectTextInfo from "./part/projectTextInfo";
import MonitorBox from "./part/monitorBox";
import CarBox from "./part/carBox";
import XunggengBox from "./part/xungengBox";
import XiaofangBox from "./part/xiaofangBox";
import ShequBox from "./part/shequBox";
import MenjinBox from "./part/menjinBox";
import ActionBottom from "./part/actionBottom";
import ProjectList from "./part/projectList";

export default {
  data() {
    return {
      delay1: false,
      delay2: false,
      projectId: "",
      projectName: "",
      statisticsData: {}, // 统计信息
      subSystemData: {}, // 子系统模块信息数据
      mapChart: {},
      showProject: false,
      showModal: false,
      ibmsUrl: "",
      config: {
        curvature: 4,
        points: [
          {
            name: "a",
            coordinate: [0.165, 0.28],
            halo: {
              show: true,
              color: "#37a2da",
            },
          },
          {
            name: "b",
            coordinate: [0.82, 0.23],
          },
          {
            name: "c",
            coordinate: [0.74, 0.715],
            halo: {
              show: true,
              color: "#3F3B50",
            },
          },
          {
            name: "d",
            coordinate: [0.253, 0.69],
            halo: {
              show: true,
              color: "rgba(255,255,255,0.6)",
            },
          },
        ],
        lines: [
          {
            source: "a",
            target: "b",
            color: "#ffffff",
          },
          {
            source: "c",
            target: "a",
            color: "#ffffff",
          },
          {
            source: "a",
            target: "d",
            color: "#ffffff",
          },
        ],
      },
    };
  },
  components: {
    PageLayout,
    FooterMenu,
    ProjectTextInfo,
    MonitorBox,
    CarBox,
    XunggengBox,
    XiaofangBox,
    ShequBox,
    MenjinBox,
    ActionBottom,
    BreathLight,
    ProjectList,
  },
  mounted() {
    this.projectId = this.$route.query.projectId;
    this.projectName = this.$route.query.projectName;
    this.getSubStstemData();
    this.getStatistics();
    this.showCard();
  },
  methods: {
    // 返回页面
    backPage() {
      this.showModal = false;
    },
    // 获取地址
    getUrl(moduleName) {
      let strUrl =
        this.$ibmsAdminUrl +
        "/Home/Dashboard?close=1&module=" +
        moduleName +
        "&projectid=" +
        this.projectId;
      return strUrl;
    },
    getUrl1(moduleName) {
      this.ibmsUrl = "http://39.107.224.254:8100/Home/Dashboard";
      this.showModal = true;
    },
    // 查询子系统统计数据
    getStatistics() {
      this.$axios({
        method: "get",
        url: this.$baseUrl + "/s?projectId=" + this.projectId,
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

    // 加载子系统数据
    getSubStstemData() {
      this.$axios({
        method: "get",
        url: this.$baseUrl + "/s/subsystem?ProjectId=" + this.projectId,
      })
        .then(({ data, status }) => {
          if (status == 200 && data.success) {
            this.subSystemData = data.data;
          }
        })
        .catch((resp) => {
          console.log("请求失败");
        });
    },

    // 加载卡片
    showCard() {
      window.setTimeout(() => {
        this.delay1 = true;
      }, 500);
      window.setTimeout(() => {
        this.delay2 = true;
      }, 1000);
    },

    // 点击圆圈展开项目
    showProjectHandler() {
      this.showProject = !this.showProject;
    },

    // 点击项目
    projectHandler(params) {
      this.projectId = params.projectId;
      this.projectName = params.projectName;
      this.getSubStstemData();
      this.getStatistics();
      debugger
      this.$router.push({
        query: merge(this.$route.query, {
          projectId: this.projectId,
          projectName: this.projectName,
        }),
      });
    },

    // 点击地图
    funcMapClick1(params) {
      this.$router.push("/");
    },

    // 底部按钮
    funcMapClick({ code, regionId }) {
      this.$store.commit("changeRegionCode", code);
      this.$store.commit("changeRegionId", regionId);
      this.$router.push("/");
    },
  },
};
</script>

<style>
.earthmap {
  width: 100%;
  height: 100%;
  background: #050810;
}

.card {
  position: absolute;
  left: 50%;
  top: 50%;
  display: none;
}

.action-btn {
  position: absolute;
  left: 50%;
  top: 87%;
  width: 22%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.breath-box {
  position: absolute;
  left: 49px;
  top: 50%;
  transform: translateY(-56px);
}

.breath-box1 {
  position: absolute;
  right: 58.5px;
  top: 50%;
  transform: translateY(368px);
}

.circle-btn-box {
  top: 0;
  right: 60px;
  position: absolute;
}

.project-circle-btn {
  width: 100px;
  height: 100px;
  background: url(../assets/imgs/circle-g.png) no-repeat center;
  background-size: 100% 100%;
  animation: moveshow1 7s linear infinite;
}

@keyframes moveshow1 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.project-box {
  position: absolute;
  right: 136px;
  top: 0px;
}

.earth-animate {
  width: 800px;
  height: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  /* border: 1px solid #050810; */
  transform: translate(-50%, -50%);
}

.monitor-card {
  display: block;
  transform: translate(-219%, -306%);
  animation: show1 0.5s linear 1;
}

.car-card {
  display: block;
  transform: translate(-228%, -73%);
  animation: show2 0.5s linear 1;
}

.xungeng-card {
  display: block;
  transform: translate(-302%, 88%);
  animation: show3 0.5s linear 1;
}

.menjin-card {
  display: block;
  transform: translate(142%, -139%);
  animation: show4 0.5s linear 1;
}

.xiaofang-card {
  display: block;
  transform: translate(163%, -7%);
  animation: show5 0.5s linear 1;
}

.shequ-card {
  display: block;
  transform: translate(81%, 198%);
  animation: show6 0.5s linear 1;
}

@keyframes show6 {
  0% {
    opacity: 0.5;
    transform: translate(81%, 198%) scale3d(0.4, 0.4, 1);
  }

  100% {
    opacity: 1;
    transform: translate(81%, 198%) scale3d(1, 1, 1);
  }
}

@keyframes show5 {
  0% {
    opacity: 0.5;
    transform: translate(163%, -7%) scale3d(0.4, 0.4, 1);
  }

  100% {
    opacity: 1;
    transform: translate(163%, -7%) scale3d(1, 1, 1);
  }
}

@keyframes show4 {
  0% {
    opacity: 0.5;
    transform: translate(142%, -139%) scale3d(0.4, 0.4, 1);
  }

  100% {
    opacity: 1;
    transform: translate(142%, -139%) scale3d(1, 1, 1);
  }
}

@keyframes show3 {
  0% {
    opacity: 0.5;
    transform: translate(-302%, 88%) scale3d(0.4, 0.4, 1);
  }

  100% {
    opacity: 1;
    transform: translate(-302%, 88%) scale3d(1, 1, 1);
  }
}

@keyframes show2 {
  0% {
    opacity: 0.5;
    transform: translate(-228%, -73%) scale3d(0.4, 0.4, 1);
  }

  100% {
    opacity: 1;
    transform: translate(-228%, -73%) scale3d(1, 1, 1);
  }
}

@keyframes show1 {
  0% {
    opacity: 0.5;
    transform: translate(-219%, -306%) scale3d(0.4, 0.4, 1);
  }

  100% {
    opacity: 1;
    transform: translate(-219%, -306%) scale3d(1, 1, 1);
  }
}

.ibms-modal {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: #000;
}

.ibms-modal iframe {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.modal-back-btn {
  width: 65px;
  height: 65px;
  background: url(../assets/imgs/back-btn.png) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  right: 30px;
  bottom: 100px;
}
</style>