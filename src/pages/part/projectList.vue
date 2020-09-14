<template>
  <div class="pro-box">
    <div class="top-title">
      <div>项目名称</div>
      <div style="width:50%">所在区域</div>
    </div>
    <div class="scrollDiv" ref="scrollDiv" style="position:relative; width:100%;overflow: hidden;">
      <div class="scrollContent" style="height:210px;position:absolute;width:100%">
        <div class="scroll-in">
          <div class="list-item" v-for="(item,index) in data" :key="index" @click="show(item)">
            <div>{{item.projectName}}</div>
            <div>{{item.equipmentName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data", "regionId"],
  data() {
    return {
      currIndex: "-1",
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
    show(item){
      this.$emit('func',item)
    },
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
.pro-box {
  /* width: 398px; */
  height: 100%;
  padding-top: 2%;
  box-sizing: border-box;
}
.project-title {
  width: 398px;
  height: 105px;
  background: url(../../assets/imgs/project-title.png) no-repeat center;
  background-size: 100% 100%;
  margin: 25px auto 0 auto;
}

.projectlist {
  width: 270px;
  height: 216px;
  overflow-x: hidden;
  /* overflow-y: scroll; */
  float: right;
  margin-right: 14px;
  padding-right: 12px;
}

.projectlist {
  scrollbar-arrow-color: #0f4565; /**/ /*三角箭头的颜色*/
  scrollbar-face-color: #0f4565; /**/ /*立体滚动条的颜色*/
  scrollbar-3dlight-color: #0f4565; /**/ /*立体滚动条亮边的颜色*/
  scrollbar-highlight-color: #0f4565; /**/ /*滚动条空白部分的颜色*/
  scrollbar-shadow-color: #0f4565; /**/ /*立体滚动条阴影的颜色*/
  scrollbar-darkshadow-color: #0f4565; /**/ /*立体滚动条强阴影的颜色*/
  scrollbar-track-color: #0f4565; /**/ /*立体滚动条背景颜色*/
  scrollbar-base-color: #0f4565; /**/ /*滚动条的基本颜色*/
}

.project-item {
  width: 100%;
  height: 51px;
  background: url(../../assets/imgs/project-box.png) no-repeat center;
  background-size: 100% 100%;
  color: #0f4565;
  font-size: 17px;
  margin-bottom: 3px;
  font-family: PingFangSC-Semibold;
  text-align: center;
  line-height: 53px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
}

.project-item.active {
  background: url(../../assets/imgs/project-box-active.png) no-repeat center;
  background-size: 100% 100%;
  color: #30b1fe;
}

.project-item:hover {
  background: url(../../assets/imgs/project-box-active.png) no-repeat center;
  background-size: 100% 100%;
  color: #30b1fe;
  cursor: pointer;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  height: 40px;
  width: 7px;
  background-color: transparent;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 4px;
  background-image: linear-gradient(
    left,
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
  width: 7px;
  border-radius: 4px;
  height: 40px;
  background: #276e97;
}
/*定义最上方和最下方的按钮*/
::-webkit-scrollbar-button {
  display: none;
  background-color: transparent;
  border: 0px solid transparent;
}

.module-record {
  width: 466px;
  height: 250px;
  /* margin-top: 67px; */
}
.title {
  width: 466px;
  height: 72px;
  background: url(../../assets/imgs/title-record.png) no-repeat center;
  background-size: 100% 100%;
}

.top-title {
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #6a88bc;
  letter-spacing: 1.12px;
  height: 40px;
  line-height: 40px;
  margin: 0 atuo;
  width: 96%;
  border-bottom: 1px solid rgba(46,96,153,1);
}

.top-title > div {
  width: 50%;
  float: left;
  text-align: center;
}

.list-item {
  width: 90%;
  height: 42px;
  line-height: 42px;
  clear: both;
  overflow: hidden;
  margin: 0 auto;
  border-bottom: 1px solid rgba(46,96,153,0.5);
}

.list-item > div {
  font-family: PingFangSC-Semibold;
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 1.12px;
  text-align: center;
  float: left;
  width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* .list-item > div:nth-of-type(5) {
  width: 15%;
}

.list-item > div:nth-of-type(2) {
  width: 25%;
} */

.scrollDiv {
  height: 220px;
  position: absolute;
  width: 100%;
}
</style>