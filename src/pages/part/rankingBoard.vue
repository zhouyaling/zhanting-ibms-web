<template>
  <div class="ranking-board">
    <div class="ranking-board-title">给排水记录数量</div>
    <dv-scroll-ranking-board :config="config" />
  </div>
</template>

<script>
export default {
  name: "RankingBoard",
  data() {
    return {
      config: {
        data: [
          {
            name: "生活水泵总数",
            value: 55,
          },
          {
            name: "生活水箱总数",
            value: 120,
          },
          {
            name: "排水泵总数",
            value: 78,
          },
          {
            name: "积水坑总数",
            value: 66,
          },
          {
            name: "积水坑总数",
            value: 66,
          },
          {
            name: "积水坑总数",
            value: 66,
          },
          {
            name: "积水坑总数",
            value: 66,
          },
          {
            name: "积水坑总数",
            value: 66,
          }
          
        ],
        rowNum: 8,
      },
    };
  },
};
</script>

<style scoped>
.ranking-board {
  width: 100%;
  height: 730px;
  box-shadow: 0 0 3px blue;
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
