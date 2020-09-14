<template>
  <div class="btns">
    <a v-for="(item ,index) in list" :key="index"  :href="getUrl(item.code)" target="_blank">
      <div class="btn-item">{{item.name}}</div>
    </a>
  </div>
</template>
<script>
export default {
  props:["projectId"],
  data() {
    return {
      list: [
        {
          name: "周界防护",
          code: "IBMS010105",
        },
        {
          name: "一氧化碳",
          code: "IBMS010201",
        },
        {
          name: "BA",
          code: "BASystem",
        },
      ],
    };
  },
  methods: {
    // 获取地址
    getUrl(moduleName) {
      let strUrl =
        this.$ibmsAdminUrl +
        "/Home/Dashboard?close=1&module=" +
        moduleName +
        "&projectid=" +
        this.projectId;
      return strUrl;
    },
  },
};
</script>
<style scoped>
.btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
.btn-item {
  width: 78px;
  height: 78px;
  background: url(../../assets/imgs/action-btn.png) no-repeat center;
  background-size: 100% 100%;
  font-family: PingFangSC-;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 78px;
}

.btns > a {
  width: 78px;
  height: 78px;
}
</style>