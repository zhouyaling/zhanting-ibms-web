<template>
  <div class="liudu-box">
    <iframe
     class="iframe"
      :src="iframUrl"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script>
export default {
  props:["iframUrl"],
};
</script>
<style scoped>
.liudu-box {
  width: 95%;
  margin: 10px 2.5% 10px 2.5%;
  height: 740px;
}

.liudu-box iframe {
  border: none;
  width: 100%;
  height: 100%;
}
</style>