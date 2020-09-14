<template>
  <div class="module-big-title" >
    <span>{{text}}</span>
  </div>
</template>
<script>
export default {
  props:["text"]
};
</script>
<style scoped>
.module-big-title {
  font-size: 18px;
  color: #fff;
  padding-left: 30px;
  display: flex;
  align-items: center;
  position: relative;
}

.module-big-title span {
}

.module-big-title::after {
  content: "";
  width: 22px;
  height: 15px;
  background: url(../assets/imgs/ancang/icon-title.png) no-repeat center;
  background-size: 100%;
  position: absolute;
  left: 0;
}
</style>