<template>
  <div class="ranking-board">
    <div class="ranking-board-title">给排水比例</div>
    <dv-scroll-ranking-board :config="config" />
  </div>
</template>

<script>
export default {
  name: "RankingBoard",
  props: ["waterList"],
  watch:{
    waterList(newD,oldD){
      debugger
      this.config ={
        data:this.waterList,
        rowNum:8
      }
    }
  },
  data() {
    return {
      config: {
        data: [],
        rowNum: 8
      }
    };
  }
};
</script>

<style scoped>
.ranking-board {
  width: 100%;
  height: 730px;
  /*box-shadow: 0 0 3px blue;*/
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, 0.5);
  box-sizing: border-box;
  padding: 0px 30px;
  margin-top: 30px;
}

.ranking-board-title {
  font-weight: bold;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 20px;
}

.dv-scroll-ranking-board {
  flex: 1;
}
</style>
