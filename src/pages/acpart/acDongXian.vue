<template>
  <canvas class="dongxian-box" id="myCanvas" ref="myCanvas"></canvas>
</template>
<script>
export default {
  props: ["selectedPointList", "monitorGroups"],
  data() {
    return {
      points: [], // 点位
      ctx: "",
      c: "",
      t: 1,
      q: 0
    };
  },
  watch: {
    selectedPointList(newD, oldD) {
      console.log("动线点", newD);
      this.c = this.$refs.myCanvas; //初始化
      this.ctx = this.c.getContext("2d");
      this.c.width = 1600 * 0.5625;
      this.c.height = 484;
      this.t = 1; // 动线点
      this.q = 0; // 头像点
      this.drawLine(newD);
    },
    monitorGroups(newD,oldD){
         console.log("全部监控点位", newD);
    }
  },
  mounted() {},
  methods: {
    // 渲染动线
    drawLine(cacheData) {
      var vertices = [];
      var htmls = ""; // 单处头像信息
      var pointHtmls = ""; // 单个点信息
    //   for (var i = 0; i < cacheData.length; i++) {
        this.monitorGroups.forEach((item, index) => {
          if (true) { // item.cameraName == cacheData[i].cameraName
            vertices.push({
              x: item.mainLeft * 0.5625 + 22,
              y: item.mainTop  * 0.5625 + 32
            });
          }
        });
    //   }

      if (vertices.length > 1) {
        this.points = this.calcWaypoints(vertices);
      }

      this.ctx.lineWidth = 2;
      this.ctx.shadowOffsetX = 0; // 设置水平位移
      this.ctx.shadowOffsetY = 0; // 设置垂直位移
      this.ctx.shadowBlur = 10; // 设置模糊度
      this.ctx.shadowColor = "rgba(4,168,233,0.8)"; // 设置阴影颜色
      this.ctx.strokeStyle = "rgba(55,105,254,1)";
      this.t = 1;
      this.animate();
    },

    // 分解点
    calcWaypoints(vertices) {
      var waypoints = [];
      var mark = 50;
      for (var i = 1; i < vertices.length; i++) {
        var pt0 = vertices[i - 1];
        var pt1 = vertices[i];
        var dx = pt1.x - pt0.x;
        var dy = pt1.y - pt0.y;

        if (Math.abs(dx) + Math.abs(dy) < 300) {
          mark = 30;
        } else {
          mark = 50;
        }

        for (var j = 0; j < mark; j++) {
          var x = pt0.x + (dx * j) / mark;
          var y = pt0.y + (dy * j) / mark;
          var zz = j == 0 ? i - 1 : false;
          waypoints.push({
            x: x,
            y: y,
            start: i == vertices.length - 1 && j == mark - 1 ? i : zz
          });
        }
      }
      return waypoints;
    },

    // 渲染点
    animate() {
      if (this.t < this.points.length) {
        if (
          this.t == 1 ||
          this.t == this.points.length - 1 ||
          this.points[this.t].start
        ) {
        }
        requestAnimationFrame(this.animate);
      } else {
        return;
      }
      this.ctx.beginPath();
      this.ctx.moveTo(this.points[this.t - 1].x, this.points[this.t - 1].y);
      this.ctx.lineTo(this.points[this.t].x, this.points[this.t].y);
      this.ctx.stroke();
      // ctx.restore();
      this.t++;
    }
  }
};
</script>
<style scoped>
.dongxian-box {
  width: 100%;
  position: absolute;
  top: 0;
}
</style>