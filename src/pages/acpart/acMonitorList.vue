<template>
  <div class="monitor-list-box">
    <ac-title text="案场监控"></ac-title>
    <div class="monitorlist" v-bind:class="showAllmonitor?'display-block':'display-none' ">
      <div
        v-for="(item,index) in monitorUrls"
        v-show="monitorPage=='page1'"
        class="monitor-a"
        :key="index"
      >
        <div class="click-area" v-on:click="showMonitor(item.cameraChannelNum)"></div>
        <div class="ck-video">
          <div v-bind:id="'employee_video'+(item.cameraChannelNum)"></div>
        </div>
        <div class="ck-video-name">
          <div>
            <img src="../../assets/imgs/ancang/icon-monitor.png" alt />
            <span>{{item.cameraName}}</span>
          </div>
          <div>• {{item.onLineStatus==1?'在线':'离线'}}</div>
        </div>
      </div>
      <div class="monitor-paging">
        <div v-bind:class="monitorPage=='page1'?'active':''" @click="pagingShow(1)">上一页</div>
        <div v-bind:class="monitorPage=='page2'?'active':''" @click="pagingShow(2)">下一页</div>
      </div>
    </div>
    <!-- 案场监控单点监控 -->
    <div class="module-monitor" v-bind:class="!showAllmonitor?'display-block':'display-none' ">
      <div class="big-monitor-box">
        <div class="icon-circle-close" @click="closeBigMointor()"></div>
        <div id="employee_videobig"></div>
      </div>
      <div class="big-monitor-name">
        <div>
          <img src="../../assets/imgs/ancang/icon-monitor.png" alt />
          <span>{{currentMonitorInfo?currentMonitorInfo.cameraName:'大厅入口'}}</span>
        </div>
        <div>• {{currentMonitorInfo && currentMonitorInfo.onLineStatus==1?'在线':'离线'}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import AcTitle from "../../components/acTitle";
export default {
  props: ["currentMonitorInfo"],
  components: {
    AcTitle
  },
  data() {
    return {
      showAllmonitor: false,
      monitorPage: "page1",
      monitorUrls: [
        {
          cameraChannelNum: "1",
          cameraName: "名称",
          onLineStatus: 1
        },
        {
          cameraChannelNum: "1",
          cameraName: "名称",
          onLineStatus: 1
        },
        {
          cameraChannelNum: "1",
          cameraName: "名称",
          onLineStatus: 1
        },
        {
          cameraChannelNum: "1",
          cameraName: "名称",
          onLineStatus: 1
        },
        {
          cameraChannelNum: "1",
          cameraName: "名称",
          onLineStatus: 1
        },
        {
          cameraChannelNum: "1",
          cameraName: "名称",
          onLineStatus: 1
        },
        {
          cameraChannelNum: "1",
          cameraName: "名称",
          onLineStatus: 1
        },
        {
          cameraChannelNum: "1",
          cameraName: "名称",
          onLineStatus: 1
        },
        {
          cameraChannelNum: "1",
          cameraName: "名称",
          onLineStatus: 1
        }
      ]
    };
  },
  methods: {
    // 关闭监控大视频
    closeBigMointor() {
      this.showAllmonitor = true;
    }
  }
};
</script>
<style scoped>
.monitor-list-box {
  margin-top: 18px;
}

.monitorlist video {
  width: 132px;
  height: 74px;
  object-fit: fill;
  /*  width: 173px;
        height: 142px */
}

.monitor-a {
  background-color: #1B213A;
  position: absolute;
  width: 144px;
  height: 88px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  /*  border: 1px solid #1B213A; */
}

.monitor-a .click-area {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  cursor: pointer;
}

.monitor-a:nth-child(1) {
  top: 677px;
  left: 1406px;
}

.monitor-a:nth-child(2) {
  top: 677px;
  left: 1571px;
}

.monitor-a:nth-child(3) {
  top: 677px;
  left: 1738px;
}

.monitor-a:nth-child(4) {
  top: 801px;
  left: 1406px;
}

.monitor-a:nth-child(5) {
  top: 801px;
  left: 1571px;
}

.monitor-a:nth-child(6) {
  top: 801px;
  left: 1738px;
}

.monitor-a:nth-child(7) {
  top: 923px;
  left: 1406px;
}

.monitor-a:nth-child(8) {
  top: 923px;
  left: 1571px;
}

.monitor-a:nth-child(9) {
  top: 923px;
  left: 1738px;
}

.monitor-a:nth-child(10) {
  top: 677px;
  left: 1406px;
}

.monitor-a:nth-child(11) {
  top: 677px;
  left: 1571px;
}

.monitor-a:nth-child(12) {
  top: 677px;
  left: 1738px;
}

.monitor-a:nth-child(13) {
  top: 801px;
  left: 1406px;
}

.monitor-a:nth-child(14) {
  top: 801px;
  left: 1571px;
}

.monitor-paging {
  position: absolute;
  top: 1045px;
  left: 1570px;
  width: 150px;
}

.monitor-paging div {
  width: 40%;
  margin: 0 5px;
  font-size: 12px;
  text-align: center;
  padding: 2px 0;
  float: left;
  color: #fff;
  border: 1px solid rgba(53, 107, 180, 0.3);
  border-radius: 4px;
  cursor: pointer;
}

.monitor-paging .active {
  background: rgba(53, 107, 180, 0.3);
  border: 1px solid rgba(53, 107, 180, 1);
}

.ck-video {
  width: 130px;
  height: 74px;
  background-color: #041149;
  /*  border: 1px solid rgba(61, 142, 255, 0.7); */
  border-radius: 6px;
  overflow: hidden;
}

.ck-video div:first-child {
  /* top: -38px; */
  height: 74px;
}

.ck-video-name {
  position: absolute;
  bottom: -22px;
  left: 0;
  width: 100%;
  font-size: 10px;
  color: #d5edff;
}

.ck-video-name div:nth-of-type(1) {
  float: left;
}

.ck-video-name div:nth-of-type(2) {
  float: right;
  color: rgba(61, 142, 255, 0.8);
}

.module-monitor .big-monitor-box {
  width: 470px;
  height: 298px;
  background: url(../../assets/imgs/ancang/monitor-box.png) no-repeat center;
  background-size: 100% auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  margin-top: 18px;
}

.module-monitor .big-monitor-box video {
  object-fit: fill;
}

.module-monitor .icon-circle-close {
  width: 36px;
  height: 36px;
  background: url(../../assets/imgs/ancang/icon-circle-colse.png) no-repeat
    center;
  background-size: 100%;
  position: absolute;
  top: 12px;
  right: 10px;
  z-index: 1;
  cursor: pointer;
}

.module-monitor .big-monitor-box :first-child {
  overflow: hidden !important;
}

.module-monitor .big-monitor-name {
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #ffffff;
  letter-spacing: 0.9px;
  margin: 0 auto;
  margin-top: 20px;
}

.module-monitor .big-monitor-name img {
  margin-right: 6px;
  width: 32px;
  height: 20px;
}

.module-monitor .big-monitor-name > div {
  width: 50%;
  float: left;
  color: #d5edff;
  font-size: 22px;
  letter-spacing: 2px;
  font-family: PingFangSC-Semibold;
}

.module-monitor .big-monitor-name > div:nth-of-type(2) {
  text-align: right;
  color: #3d8eff;
  font-size: 18px;
  padding-right: 20px;
}

.display-none {
  display: none;
}

.display-block {
  display: block !important;
}
</style>