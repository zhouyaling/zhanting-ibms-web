<template>
  <div style="position:relative">
    <ac-sub-title text="驻客停留时长分布统计"></ac-sub-title>
    <div class="chart-center"></div>
    <div ref="chart3" style=" width:250px;height: 170px;z-index:99999" class="chart3"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import AcSubTitle from "../../components/acSubTitle";
export default {
  props: ["data"],
  components: {
    AcSubTitle
  },
  data() {
    return {
      // data:[
      //   { value: 1, name: 1 + "人\n" },
      //    { value: 2, name: 2 + "人\n" }
      // ],
    };
  },
  watch: {
    data() {
      this.chart = echarts.init(this.$refs.chart3, "k2");
      this.chart.setOption(this.initChart());
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart3, "k2");
    this.chart.setOption(this.initChart());
  },
  methods: {
    initChart() {
      var option = {
        title: {
          x: "center"
        },
        calculable: true,
        color: ["#00A485", "#5E50E4", "#1341EE", "#14BFC5", "#5E50E4"],
        series: [
          {
            type: "pie",
            radius: [30, 50],
            center: ["50%", "50%"],
            roseType: "area",
            data: this.coverData(this.data),
            label: {
              fontSize: 8
            },
            labelLine: {
              /*  length: 4,
                 length2: 10 */
            }
          }
        ]
      };

      return option;
    },
    coverData(data) {
      let res = [];
      data.forEach(element => {
        res.push({ value: element.user_count, name: element.user_count + "人\n" + element.text + "min"});
      });
      return res;
    }
  }
};
</script>
<style scoped>
.chart-center {
  width: 89px;
  height: 85px;
  background: url(../../assets/imgs/ancang/icon-zhuke.png) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  top: 59.5%;
  left: 59.5%;
  transform: translate(-50%, -50%);
}
</style>