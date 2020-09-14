<template>
  <div class="title-bar" style="widht:100%">
    <span v-bind:class="type=='1'?'spec':''">{{text}}</span>
  </div>
</template>
<script>
export default {
  props: ["text", "type"]
};
</script>
<style scoped>
.title-bar {
  width: 300px;
  height: 45px;
  line-height: 45px;
  background: url(../assets/imgs/title-bar.png);
  background-size: 100% 8px;
  background-repeat: no-repeat ;
  background-position: bottom;
  margin: 0 auto;
}

.title-bar span {
  font-family: PARaDOS;
  font-size: 16px;
  color: #b9e2e8;
  padding-left: 14px;
  letter-spacing: 0;
}

.spec{
  opacity: 1!important;
  font-family: PingFangSC-Semibold!important;
}
</style>