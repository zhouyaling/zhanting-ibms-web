<template>
  <div class="menus">
    <div class="menus-nav">
      <div
        class="menus-item"
        v-for="(item,index) in data"
        :key="index"
        v-bind:class="item.regionId==currRegionId?'active':''"
        @click="areaClick(item,index)"
      >{{item.regionName}}</div>
    </div>
    <div class="back-btn" @click="backHome"></div>
  </div>
</template>
<script>
import { allAreaData } from "../../static/utils/allAreaData.js";
export default {
  props: ["soucrce", "activeRegionId", "data"], //  ,""
  data() {
    return {
      currRegionId: "",
      // data: [
      //   { regionName: "重庆区域公司", regionId: 235 },
      //   // { regionName: "北部区域公司", regionId: 1 },
      //   // { regionName: "云广区域公司", regionId: 2 },
      //   // { regionName: "东南区域公司", regionId: 3 },
      //   // { regionName: "湖南区域公司", regionId: 4 },
      //   // { regionName: "西部区域公司", regionId: 5 },
      //   // { regionName: "贵州区域公司", regionId: 6 },
      //   // { regionName: "新疆区域公司", regionId: 7 },
      //   // { regionName: "中部区域公司", regionId: 8 },
      //   // { regionName: "东部区域公司", regionId: 9 },
      //   // { regionName: "山东区域公司", regionId: 0 },
      //   // { regionName: "渝西区域公司", regionId: 1 },
      //   // { regionName: "南部区域公司", regionId: 2 }
      // ],
      allAreaData,
    };
  },
  mounted() {
    if (this.activeRegionId) {
      this.currRegionId = this.activeRegionId;
    }
  },
  methods: {
    // 回到首页地图
    backHome() {
      this.$emit("func", { code: "china" });
    },

    // 点击区域菜单
    areaClick(item, index) {
      this.currRegionId = item.regionId;
      this.allAreaData.forEach((element) => {
        if (element.name == item.regionName) {
          this.$emit("func", { code: element.code, regionId: item.regionId });
        }
      });
    },
  },
};
</script>
<style scoped>
.menus {
  position: absolute;
  bottom: 10px;
  /* top: auto;
  display: flex;
  align-items: center;
  justify-content: center; */
  width: 970px;
  left: 50%;
  transform: translateX(-50%);
}

.menus-nav {
  width: 900px;
  overflow-y: hidden;
  overflow-x: scroll;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  float: left;
}

.menus-nav {
  scrollbar-arrow-color: #0F4565; /**/ /*三角箭头的颜色*/
  scrollbar-face-color: #0F4565; /**/ /*立体滚动条的颜色*/
  scrollbar-3dlight-color: #0F4565; /**/ /*立体滚动条亮边的颜色*/
  scrollbar-highlight-color: #0F4565; /**/ /*滚动条空白部分的颜色*/
  scrollbar-shadow-color: transparent; /**/ /*立体滚动条阴影的颜色*/
  scrollbar-darkshadow-color: transparent; /**/ /*立体滚动条强阴影的颜色*/
  scrollbar-track-color: transparent; /**/ /*立体滚动条背景颜色*/
  scrollbar-base-color: transparent; /**/ /*滚动条的基本颜色*/
}

.menus .menus-item {
  float: left;
  padding: 0 50px;
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #ffffff;
  letter-spacing: 0;
  height: 65px;
  line-height: 65px;
  position: relative;
  min-width: 82px;
  max-width: 82px;
}

.menus-item::before {
  position: absolute;
  right: 0;
  top: 16px;
  content: "";
  width: 2px;
  height: 32px;
  border-radius: 32px;
  background-image: linear-gradient(
    top,
    rgba(16, 118, 206, 0) 0%,
    rgba(16, 118, 206, 1) 50%,
    rgba(16, 118, 206, 1) 70%,
    rgba(16, 118, 206, 0) 100%
  );
}

.menus-item.active {
  background-image: url(../assets/imgs/footer-btn.png);
  background-size: 133px 52px;
  background-repeat: no-repeat;
  background-position: center;
  color: #43baff;
}

/* .menus .menus-item::before {
  position: absolute;
  right: 0;
  top: 16px;
  content: "";
  width: 0px;
  height: 32px;
  border-radius: 32px;
  background-image: linear-gradient(
    top,
    rgba(16, 118, 206, 0) 0%,
    rgba(16, 118, 206, 1) 50%,
    rgba(16, 118, 206, 1) 70%,
    rgba(16, 118, 206, 0) 100%
  );
} */

.menus-item:hover {
  background-image: url(../assets/imgs/footer-btn.png);
  background-size: 133px 52px;
  background-repeat: no-repeat;
  background-position: center;
  color: #43baff;
  cursor: pointer;
}

.back-btn {
  width: 65px;
  height: 65px;
  background: url(../assets/imgs/back-btn.png) no-repeat center;
  background-size: 100% 100%;
  float: left;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  height: 5px;
  background-color: transparent;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);   */
  border-radius: 4px;
  background-image: linear-gradient(
    bottom,
    transparent 0%,
    transparent 29%,
    #0f4565 30%,
    #0f4565 50%,
    #0f4565 70%,
    transparent 71%,
    transparent 100%
  );
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  height: 5px;
  border-radius: 4px;
  /* -webkit-box-shadow: inset 0 0 6px rgba(255,255,255,.3);   */
  background-color: #1076ce;
}
/*定义最上方和最下方的按钮*/
::-webkit-scrollbar-button {
  display: none;
  background-color: transparent;
  border: 0px solid transparent;
}
</style>