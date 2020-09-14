<template>
  <div>
    <ac-sub-title text="到访排行"></ac-sub-title>
    <div class="top-title">
      <div>排名</div>
      <div>抓拍图</div>
      <div>类型</div>
      <div>到访次数</div>
      <div>年龄</div>
      <div>首次到访时间</div>
    </div>
    <div class="scrollDiv" ref="scrollDiv" style="position:relative; width:100%;overflow: hidden;">
      <div class="scrollContent" style="height:200px;position:absolute;width:100%">
        <div class="scroll-in">
          <div class="list-item" v-for="(item,index) in data" :key="index">
            <div>{{index + 1}}</div>
            <div>
              <div class="img">
                <img :src="item.face_url" alt />
              </div>
            </div>
            <div>访客</div>
            <div>{{item.ids}}</div>
            <div>--</div>
            <div>--</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AcSubTitle from "../../components/acSubTitle";
export default {
  props: ["data"],
  components: {
    AcSubTitle
  },
  data() {
    return {
      timer1: null,
      timer2: null,
      sTab: "",
      speed: "",
      tbdh: ""
    };
  },
  watch: {
    data() {
      if (this.data.length > 2) {
        this.timer2 = window.setTimeout(() => {
          this.scrollList();
        }, 2000);
      }
    }
  },
  mounted() {
    if (this.data.length > 2) {
      this.timer2 = window.setTimeout(() => {
        this.scrollList();
      }, 2000);
    }
  },
  methods: {
    scrollList() {
      window.clearInterval(this.timer1);
      this.sTab = document.getElementsByClassName("scrollContent")[0]; //要滚动的表
      var tbody = this.sTab.getElementsByClassName("scroll-in")[0]; //要滚动表格的内容
      this.sTab.appendChild(tbody.cloneNode(true)); //追加一次滚动内容,以防滚动后可视区域无内容
      this.speed = 48; //每次滚动的距离
      this.tbdh = tbody.offsetHeight - 1; //整个表的高度,-1是因为上边的边不算滚动
      this.timer1 = window.setInterval(() => {
        this.scrollTop();
      }, 3000);
    },
    scrollTop() {
      var t = this.sTab.offsetTop; //获取要滚动表的位置
      this.sTab.style.transition = "1s"; //把过渡动画设为一秒
      this.sTab.style.top = t - this.speed + "px"; //改变表的top值
      if (-this.tbdh >= t) {
        //比较    如果第二个(追加上的)表的位置已经到了第一个表的位置(追加的表top为0)即第一个表完全不见
        this.sTab.style.transition = "0s"; //过渡动画设为0秒
        this.sTab.style.top = "0px"; //位置设为初始位置
        console.log("滚动");
        // this.scrollTop(); //因为偷梁换柱消耗了一次过程,所以把这一次过程补回来
      }
    }
  },
  beforeDestroy() {
    window.clearInterval(this.timer1);
    window.clearTimeout(this.timer2);
  }
};
</script>
<style scoped>
.top-title {
  font-family: PingFangSC-Semibold;
  font-size: 10px;
  color: #6683b7;
  letter-spacing: 1.12px;
  height: 20px;
  line-height: 20px;
  margin-top: 15px;
}

.top-title > div {
  width: 16%;
  float: left;
  text-align: center;
}

.top-title > div:nth-of-type(1) {
  width: 12%;
}

.top-title > div:nth-of-type(6) {
  width: 24%;
}

.list-item {
  width: 100%;
  height: 34px;
  margin-top: 14px;
  line-height: 34px;
  clear: both;
}

.list-item {
}

.list-item > div {
  font-family: PingFangSC-Semibold;
  font-size: 10px;
  color: #8da5ff;
  letter-spacing: 1.12px;
  text-align: center;
  float: left;
  width: 16%;
}

.list-item > div:nth-of-type(1) {
  width: 12%;
}

.list-item > div:nth-of-type(6) {
  width: 24%;
}

.list-item.active {
  background: url(../../assets/imgs/ancang/visitor-bg.png) no-repeat center;
  background-size: 100% 28px;
}

.list-item.active > div {
  color: #ffffff;
}

.img {
  width: 32px;
  height: 32px;
  border: 1px solid #6683b7;
  box-sizing: border-box;
  margin: 0 auto;
}

.img > img {
  width: 100%;
  height: 100%;
}

.scrollDiv {
  height: 200px;
  position: absolute;
  width: 100%;
}

.scrollContent {
}
</style>