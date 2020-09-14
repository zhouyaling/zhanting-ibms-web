<template>
  <div class="user-content-box">
    <div class="u-title">出入口</div>
    <div class="u-big-img">
      <img :src="info.bkg_url" alt />
    </div>
    <div class="u-info-box">
      <div class="u-info-left">
        <ac-sub-title text="当前人脸"></ac-sub-title>
        <div class="user-detail-infos">
          <div class="active-people-header">
            <div class="active-header-img" id="active-header">
              <img :src="info?info.face_url:''" alt />
            </div>
          </div>
          <div class="active-people-info1">
            <p>
              <span>年龄段</span>
              <span id="active-age">{{currentUser.age_group}}</span>
            </p>
            <p>
              <span>性别</span>
              <span id="active-sex">{{currentUser.gender==1?'男':'女'}}</span>
            </p>
            <p>
              <span>戴眼镜</span>
              <span id="active-car">{{currentUser.glass==2?'否':'是'}}</span>
            </p>
            <p>
              <span>累计到访</span>
              <span id="active-glass">{{currentUser.tag3}}</span>
            </p>
            <p>
              <span>进入时间</span>
              <span id="active-yezhu">{{info.happen_time?info.happen_time.split(' ')[1]:''}}</span>
            </p>
          </div>
          <div class="active-people-action">
            <div v-bind:class="currentTab==1?'active':''" @click="change(1)">动线轨迹</div>
            <div v-bind:class="currentTab==2?'active':''" @click="change(2)">六度空间</div>
          </div>
        </div>
      </div>
      <div class="u-info-right">
        <ac-sub-title text="抓拍记录"></ac-sub-title>
        <div>
          <ul class="people-list" id="people-list">
            <li
              class="2020-08-09 14:05:06"
              v-for="(item,index) in data"
              :key="index"
              @click="showDetail(item)"
            >
              <div class="list-item-left">
                <div class="list-item-img-box">
                  <img class="h_img" :src="item.face_url" alt />
                </div>
              </div>
              <div class="list-item-right">
                <p>进入时间:</p>
                <p>{{item.happen_time?item.happen_time.split(' ')[1]:''}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AcSubTitle from "../../components/acSubTitle";
export default {
  props: ["data","currentInfo"],
  components: {
    AcSubTitle
  },
  data() {
    return {
      currentUser: {},
      currentTab: 0,
      info: {}
    };
  },
  watch: {
    data(newD, oldD) {
      if (!this.currentUser.visitor_id && newD.length > 0) {
        this.getUserDetail(newD[0].visitor_id);
        this.info = newD[0];
      }
    }
  },
  methods: {
    // 点击按钮事件
    change(tab) {
      this.currentTab = tab;
      this.$emit("func", {
        tab: this.currentTab,
        face_url: this.info.face_url,
        happen_time: this.info.happen_time,
        visitor_id: this.info.visitor_id
      });
    },

    // 点击列表事件
    showDetail(item) {
      this.info = item;
      this.getUserDetail(item.visitor_id);
      this.$emit("func", {
        tab: this.currentTab,
        face_url: this.info.face_url,
        happen_time: this.info.happen_time,
        visitor_id: this.info.visitor_id
      });
    },

    // 获取详情
    getUserDetail(id) {
      this.$axios({
        method: "post",
        url: this.$acUserBaseUrl + "/api/faceRecord/getUserDit?userId=" + id
      })
        .then(({ data, status }) => {
          if (data.code == 200 && data.data.data.length > 0) {
            this.currentUser = data.data.data[0];
          }
        })
        .catch(resp => {
          console.log("请求失败");
        });
    }
  }
};
</script>
<style scoped>
.u-title {
  width: 183px;
  height: 30px;
  font-family: PingFangSC-Semibold;
  font-size: 14.01px;
  background: url(../../assets/imgs/ancang/u-title.png) no-repeat center;
  background-size: 100% 100%;
  padding-left: 12px;
  color: #e9f1ff;
  line-height: 30px;
}

.u-big-img {
  width: 100%;
  height: 235px;
  border: 1px solid #151f42;
  box-sizing: border-box;
}

.u-big-img > img {
  width: 100%;
  height: 100%;
}

.u-info-box {
  width: 100%;
  height: 238px;
  background: url(../../assets/imgs/ancang/u-info-bg.png) no-repeat center;
  background-size: 100% 100%;
  margin-top: 10px;
  padding-top: 10px;
  box-sizing: border-box;
}

.u-info-left {
  width: 59%;
  float: left;
  padding-left: 10px;
  padding-right: 15px;
  box-sizing: border-box;
}

.u-info-right {
  width: 41%;
  float: left;
  padding-left: 10px;
  box-sizing: border-box;
}

.user-detail-infos {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}

.active-people-header {
  width: 48%;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 20px;
  float: left;
}

.active-people-info1 {
  width: 52%;
  height: 100%;
  float: left;
}

.active-people-info1 p {
  font-size: 8px;
  margin-bottom: 10px;
}

.active-people-info1 p span:nth-of-type(1) {
  color: #e9f1ff;
  display: inline-block;
  width: 60px;
}

.active-people-info1 p span:nth-of-type(2) {
  color: #8ba5ff;
  font-weight: bold;
}

.active-people-header p {
  margin-top: 4px;
  font-family: din;
  font-size: 20px;
  color: #e9f1ff;
}

.active-header-img {
  width: 94px;
  height: 94px;
  background-size: 100% 100%;
  background: url(../../assets/imgs/ancang/face-box.png) no-repeat center;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
}

.active-header-img img {
  width: 74%;
  height: 74%;
  border-radius: 5px;
  /* border: 1px solid #196df7; */
}

.active-people-action {
  width: 100%;
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
}

.active-people-action > div {
  width: 113px;
  height: 43px;
  background: url(../../assets/imgs/ancang/action-bg.png) no-repeat center;
  background-size: 100% 100%;
  font-family: PingFangSC-Semibold;
  font-size: 9px;
  color: #ffffff;
  text-align: center;
  line-height: 43px;
}

.active-people-action .active {
  background: url(../../assets/imgs/ancang/action-bg-active.png) no-repeat
    center;
  background-size: 100% 100%;
}

.people-list {
  width: 95%;
  height: 186px;
  overflow-x: hidden;
  overflow-y: scroll;
}

/* .people-list::-webkit-scrollbar {
  display: none;
} */

.people-list li {
  list-style: none;
  padding: 8px 0;
  clear: both;
  display: flex;
}

.people-list li.active {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: left;
}

.list-item-left {
  width: 50%;
  float: left;
  /*  display: flex;
    align-items: center;
    justify-content: center; */
}

.list-item-left img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  /* border: 1px solid #8BA5FF; */
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}

.list-item-img-box {
  width: 49px;
  height: 49px;
  position: relative;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}

.list-item-right {
  font-family: PingFangSC-Semibold;
  font-size: 8.96px;
  color: #e9f1ff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
}
.list-item-right > p:nth-of-type(2) {
  font-family: DIN;
  font-weight: 600;
  font-size: 10.08px;
  color: #829dff;
  margin-top: 5px;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  height: 40px;
  width: 4px;
  background-color: transparent;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 4px;
  background-image: linear-gradient(
    left,
    transparent 0%,
    transparent 29%,
    #293e67 30%,
    #293e67 50%,
    #293e67 70%,
    transparent 71%,
    transparent 100%
  );
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  width: 4px;
  border-radius: 4px;
  height: 40px;
  background: #334c7e;
}
/*定义最上方和最下方的按钮*/
::-webkit-scrollbar-button {
  display: none;
  background-color: transparent;
  border: 0px solid transparent;
}
</style>