<template>
  <div class="module-sub-title">
    <span>{{text}}</span>
  </div>
</template>
<script>
export default {
  props: ["text"]
};
</script>
<style scoped>
.module-sub-title {
  width: 159px;
  height: 17px;
  background: url(../assets/imgs/ancang/sub-title-box.png) no-repeat center;
  background-size: 159px 100%;
  display: flex;
  align-items: center;
  font-size: 10px;
  color: #ffffff;
}

.module-sub-title span {
  padding-left: 15px;
  opacity: 0.6;
  letter-spacing: 1.2px;
}
</style>