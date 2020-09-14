<template>
  <div class="module-record">
    <title-bar style="width:100%" text="上报记录" number="1" type="1"></title-bar>
    <div></div>
    <div class="top-title">
      <div>项目</div>
      <div style="width:25%">设备名称</div>
      <div>报警类型</div>
      <div>报警时间</div>
      <div style="width:15%">处理状态</div>
    </div>
    <div class="scrollDiv" ref="scrollDiv" style="position:relative; width:100%;overflow: hidden;">
      <div class="scrollContent" style="height:210px;position:absolute;width:100%">
        <div class="scroll-in">
          <div class="list-item" v-for="(item,index) in data" :key="index">
            <div>{{item.projectName}}</div>
            <div>{{item.equipmentName}}</div>
            <div>{{item.alarmType}}</div>
            <div>{{item.alarmTime ? item.alarmTime.split("T")[0]:''}}</div>
            <div>{{item.status==2?'已处理':(item.status=='1'?'处理中':'报警中')}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TitleBar from "../../components/titleBar";
export default {
  props: ["data"],
  components:{TitleBar},
  data() {
    return {
      timer1: null,
      timer2:null,
      sTab: "",
      speed: "",
      tbdh: ""
    };
  },
  watch: {
    data(newD, eldD) {
      if (newD) {
        if (this.data.length > 0) {
          console.log("2 watch");
          this.timer2 = window.setTimeout(() => {
            this.scrollList();
          }, 2000);
        }
      }
    }
  },
  mounted() {
    if (this.data.length > 0) {
      console.log("2 mounted");
      this.timer2 = window.setTimeout(() => {
        this.scrollList();
      }, 2000);
    }
  },
  beforeDestroy() {
    window.clearInterval(this.timer1);
    window.clearTimeout(this.timer2)
  },
  methods: {
    scrollList() {
      window.clearInterval(this.timer1);
      this.sTab = document.getElementsByClassName("scrollContent")[0]; //要滚动的表
      var tbody = this.sTab.getElementsByClassName("scroll-in")[0]; //要滚动表格的内容
      this.sTab.appendChild(tbody.cloneNode(true)); //追加一次滚动内容,以防滚动后可视区域无内容
      this.speed = 42; //每次滚动的距离
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
      }
    }
  }
};
</script>
<style scoped>
.module-record {
  width: 466px;
  height: 250px;
  /* margin-top: 27px; */
}
.title {
  width: 466px;
  height: 72px;
  background: url(../../assets/imgs/title-record.png) no-repeat center;
  background-size: 100% 100%;
}

.top-title {
  font-family: PingFangSC-Semibold;
  font-size: 12px;
  color: #6a88bc;
  letter-spacing: 1.12px;
  height: 30px;
  line-height: 30px;
  margin-top: 15px;
}

.top-title > div {
  width: 20%;
  float: left;
  text-align: center;
}

/* .top-title > div:nth-of-type(1) {
  width: 12%;
}

.top-title > div:nth-of-type(6) {
  width: 24%;
} */

.list-item {
  width: 100%;
  height: 42px;
  line-height: 42px;
  clear: both;
  overflow: hidden;
}

.list-item {
}

.list-item > div {
  font-family: PingFangSC-Semibold;
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 1.12px;
  text-align: center;
  float: left;
  width: 20%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list-item > div:nth-of-type(5) {
  width: 15%;
}

.list-item > div:nth-of-type(2) {
  width: 25%;
}

.scrollDiv {
  height: 200px;
  position: absolute;
  width: 100%;
}
</style>