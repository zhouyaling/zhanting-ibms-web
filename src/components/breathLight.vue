<template>
  <div class="breath"></div>
</template>
<script>
export default {};
</script>
<style scoped>
.breath {
  width: 53px;
  height: 25px;
  border-radius: 1px;
  border: 1.2px solid #13243c;
  /* box-shadow:0 1px 2px rgba(0,0,0,.3) inset; */
  animation: breathLamp 2700ms ease-in-out alternate infinite;
}

@keyframes breathLamp {
	0% {
    opacity:0.6;
    border: 1.2px solid #13243c;
	box-shadow: 0 1px 2px rgba(255,255,255,0.2) inset;
}
100% {
	opacity:1;
	 border: 1.2px solid #13243c;
	box-shadow:0 1px 20px rgba(58,120,223,0.9) inset;
}
}
</style>