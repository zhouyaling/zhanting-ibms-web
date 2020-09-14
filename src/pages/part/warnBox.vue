<template>
  <div class="warn-top" v-bind:class="(showAlarm && alarmList.length>0)?'':'hide'">
    <div class="scrollContent1">
      <div class="scroll-in1">
        <div v-for="(alarm,index) in alarmList" :key="index">{{alarm.projectId}}{{alarm.AlarmText}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      connection: null,
      showAlarm: true,
      alarmList: [
        // {
        //   projectId: "金科十年城",
        //   AlarmText: "发生设备告警",
        // },
        // {
        //   projectId: "信达国际",
        //   AlarmText: "发生设备告警",
        // },
      ],
      timer1: null,
      sTab: "",
      speed: "",
      tbdh: "",
      counter: 0,
    };
  },
  mounted() {
  },
  methods: {
    // 开始连接
    start() {
      try {
        this.connection.start();
        console.log("connected");
      } catch (err) {
        console.log(err);
        setTimeout(() => this.start(), 5000);
      }
    },
    scrollList() {
      window.clearInterval(this.timer1);
      this.sTab = document.getElementsByClassName("scrollContent1")[0]; //要滚动的表
      var tbody = this.sTab.getElementsByClassName("scroll-in1")[0]; //要滚动表格的内容
      this.sTab.appendChild(tbody.cloneNode(true)); //追加一次滚动内容,以防滚动后可视区域无内容
      this.speed = 37; //每次滚动的距离
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
        this.scrollTop(); //因为偷梁换柱消耗了一次过程,所以把这一次过程补回来
        this.counter++;
        if (this.counter >= 5) {
          window.clearInterval(this.timer1);
          this.alarmList = [];
          this.showAlarm = false;
        }
      }
    },
  },
  beforeDestroy() {
    window.clearInterval(this.timer1);
  },
};
</script>
<style scoped>
.warn-top {
  min-width: 250px;
  height: 38px;
  background-image: url(../../assets/imgs/warn.png);
  background-size: auto 106%;
  background-repeat: no-repeat;
  background-position: -1px -1px;
  border: 1px solid #b21625;
  font-family: PingFangSC-Semibold;
  font-size: 12px;
  color: #cf283a;
  letter-spacing: 0;
  text-align: left;
  box-sizing: border-box;
  padding-left: 100px;
  position: absolute;
  left: 20px;
  top: 0;
  line-height: 38px;
  font-weight: 700;
  z-index: 99999;
  overflow: hidden;
}

.scrollContent1 {
  /* position: absolute; */
  position: absolute;
  height: 37px;
}

.hide {
  opacity: 0;
  transition: 0.5s;
  animation: show 1s linear;
}

/* .scroll-in {
  position: absolute;
} */
</style>