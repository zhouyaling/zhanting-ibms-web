<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: "ScrollBoard",
  data() {
    return {
      config: {
        header: ["时间", "信息", "数量", "位置"],
        data: [
          [this.jsonDateFormatM(1), "路面危害-松散", "5", "--"],
          [this.jsonDateFormatM(1), "路面危害-路面油污清理", "13", "--"],
          [this.jsonDateFormatM(2), "交安设施-交通标志牌结构", "6", "--"],
          [this.jsonDateFormatM(2), "路基危害-防尘网", "2", "--"],
          [this.jsonDateFormatM(3), "路面危害-松散", "3", "--"],
          [this.jsonDateFormatM(3), "路基危害-防尘网", "4", "--"],
          [this.jsonDateFormatM(4), "路面危害-路面油污清理", "2", "--"],
          [this.jsonDateFormatM(5), "交安设施-交通标志牌结构", "5", "--"],
          [this.jsonDateFormatM(5), "路基危害-防尘网", "3", "--"]
        ],
        index: true,
        columnWidth: [50, 170, 300],
        align: ["center"],
        rowNum: 7,
        headerBGC: "#1981f6",
        headerHeight: 45,
        oddRowBGC: "rgba(0, 44, 81, 0.8)",
        evenRowBGC: "rgba(10, 29, 50, 0.8)"
      }
    };
  },
  methods: {
    //json日期格式转换为正常格式
    jsonDateFormatM(num) {
      try {
        var date = new Date(new Date().getTime() - num * 86400000);
        var month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return date.getFullYear() + "-" + month + "-" + day;
      } catch (ex) {
        return "";
      }
    }
  }
};
</script>

<style  scoped>
#scroll-board {
  width: 50%;
  box-sizing: border-box;
  margin-left: 20px;
  height: 440px;
  overflow: hidden;
}
</style>
