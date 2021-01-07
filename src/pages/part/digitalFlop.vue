<template>
  <div id="digital-flop">
    <div
      class="digital-flop-item"
      v-for="item in digitalFlopData"
      :key="item.title"
    >
      <div class="digital-flop-title">{{ item.title }}</div>
      <div class="digital-flop">
        <dv-digital-flop
          :config="item.number"
          style="width: 100px; height: 50px"
        />
        <div class="unit">{{ item.unit }}</div>
      </div>
    </div>

    <dv-decoration-10 />
  </div>
</template>

<script>
export default {
  name: "DigitalFlop",
  props: ["numbers"],
  data() {
    return {
      digitalFlopData: [],
    };
  },
  watch: {
    numbers(newD, oldD) {
      if (newD) {
        const { randomExtend } = this;
        this.digitalFlopData = [
          {
            title: "报警数",
            number: {
              number: [randomExtend(this.numbers[0], 30000, 1)],
              content: "{nt}",
              textAlign: "right",
              style: {
                fill: "#4d99fc",
                fontWeight: "bold",
              },
            },
            unit: "个",
          },
          {
            title: "工单数",
            number: {
              number: [randomExtend(this.numbers[1], 39, 2)],
              content: "{nt}",
              textAlign: "right",
              style: {
                fill: "#f46827",
                fontWeight: "bold",
              },
            },
            unit: "个",
          },
          {
            title: "通知公告",
            number: {
              number: [randomExtend(this.numbers[2], 30, 3)],
              content: "{nt}",
              textAlign: "right",
              style: {
                fill: "#40faee",
                fontWeight: "bold",
              },
            },
            unit: "条",
          },
          {
            title: "耗电数",
            number: {
              number: [randomExtend(this.numbers[3], 6578, 4)],
              content: "{nt}",
              textAlign: "right",
              style: {
                fill: "#4d99fc",
                fontWeight: "bold",
              },
            },
            unit: "KWH",
          },
          {
            title: "排水量",
            number: {
              number: [randomExtend(this.numbers[4], 3000, 5)],
              content: "{nt}",
              textAlign: "right",
              style: {
                fill: "#f46827",
                fontWeight: "bold",
              },
            },
            unit: "T",
          },
          {
            title: "门禁总数",
            number: {
              number: [randomExtend(this.numbers[5], 17, 6)],
              content: "{nt}",
              textAlign: "right",
              style: {
                fill: "#40faee",
                fontWeight: "bold",
              },
            },
            unit: "个",
          },
          {
            title: "巡更点",
            number: {
              number: [randomExtend(this.numbers[6], 55, 7)],
              content: "{nt}",
              textAlign: "right",
              style: {
                fill: "#4d99fc",
                fontWeight: "bold",
              },
            },
            unit: "个",
          },
        ];
      }
    },
  },
  methods: {
    createData() {
      const { randomExtend } = this;
      this.digitalFlopData = [
        {
          title: "报警数",
          number: {
            number: [randomExtend(this.numbers[0], 30000, 1)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#4d99fc",
              fontWeight: "bold",
            },
          },
          unit: "个",
        },
        {
          title: "工单数",
          number: {
            number: [randomExtend(this.numbers[1], 39, 2)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#f46827",
              fontWeight: "bold",
            },
          },
          unit: "个",
        },
        {
          title: "通知公告",
          number: {
            number: [randomExtend(this.numbers[2], 30, 3)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#40faee",
              fontWeight: "bold",
            },
          },
          unit: "条",
        },
        {
          title: "耗电数",
          number: {
            number: [randomExtend(this.numbers[3], 6578, 4)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#4d99fc",
              fontWeight: "bold",
            },
          },
          unit: "KWH",
        },
        {
          title: "排水量",
          number: {
            number: [randomExtend(this.numbers[4], 3000, 5)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#f46827",
              fontWeight: "bold",
            },
          },
          unit: "T",
        },
        {
          title: "门禁总数",
          number: {
            number: [randomExtend(this.numbers[5], 17, 6)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#40faee",
              fontWeight: "bold",
            },
          },
          unit: "个",
        },
        {
          title: "巡更点",
          number: {
            number: [randomExtend(this.numbers[6], 55, 7)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#4d99fc",
              fontWeight: "bold",
            },
          },
          unit: "个",
        },
      ];
    },
    randomExtend(minNum, maxNum, type) {
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var mm = date.getMinutes();
      var s = date.getSeconds();
      var dd = date.valueOf();
      var _d =
        y.toString() +
        "-" +
        (m < 10 ? "0" : "") +
        m.toString() +
        "-" +
        (d < 10 ? "0" : "") +
        d.toString();
      var ddd = new Date(_d).valueOf();
      switch (type) {
        case 1:
          return minNum + (dd - ddd) / 6000 + Math.ceil(Math.random() * 2);
          break;
        case 2:
        case 3:
          return minNum + (dd - ddd) / 600000 + Math.ceil(Math.random() * 2);
          break;
        case 4:
        case 5:
          return minNum + (dd - ddd) / 60000 + Math.ceil(Math.random() * 3);
          break;
        case 6:
        case 7:
          return minNum + (dd - ddd) / 6000000 + Math.ceil(Math.random() * 2);
          break;
        default:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
      }
    },
  },
  mounted() {
    const { createData } = this;
    createData();
    setInterval(createData, 30000);
  },
};
</script>

<style scoped>
#digital-flop {
  position: relative;
  height: 15%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(6, 30, 93, 0.5);
}

.dv-decoration-10 {
  position: absolute;
  width: 95%;
  left: 2.5%;
  height: 5px;
  bottom: 0px;
}

.digital-flop-item {
  width: 11%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: 3px solid rgb(6, 30, 93);
  border-right: 3px solid rgb(6, 30, 93);
}

.digital-flop-title {
  font-size: 20px;
  margin-bottom: 20px;
}

.digital-flop {
  display: flex;
}

.unit {
  margin-left: 10px;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  padding-bottom: 13px;
}
</style>
