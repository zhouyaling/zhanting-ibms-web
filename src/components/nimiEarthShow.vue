<template>
  <div class="nimiearth-box">
    <img src="../assets/imgs/earth1.png" alt />
    <img src="../assets/imgs/earth2.png" alt />
    <img src="../assets/imgs/earth3.png" alt />
  </div>
</template>
<style scoped>
.nimiearth-box {
  width: 122px;
  height: 122px;
  position: relative;
  margin: 0 auto;
}

.nimiearth-box img,
.nimiearth-box > div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
}


.nimiearth-box img:nth-of-type(3) {
  animation: circlemove 15s linear infinite;
}

.nimiearth-box img:nth-of-type(1) {
  animation: circlemove1 23s linear infinite;
}

@keyframes circlemove {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes circlemove1 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
</style>