<template>
  <div class="page">
    <slot name="slotHeader"></slot>
    <div class="page-content">
      <slot name="slotContent"></slot>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.page {
  width: 100%;
  height: 100%;
  position: relative;
}


.page-content {
  width: 100%;
  height: calc(100% - 210px);
}

</style>