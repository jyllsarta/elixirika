<template>
  <div class="stats">
    <div class="title">ENEMY</div>
    <div class="bar_area">
      <div class="skew">
        <div class="base"></div>
        <div
          class="ghost"
          :style="{ width: `${(model.hpEnemy / model.hpEnemyMax) * 100}%` }"
        ></div>
        <div
          class="bar"
          :style="{ width: `${(model.hpEnemy / model.hpEnemyMax) * 100}%` }"
        ></div>
      </div>
    </div>
    <div class="name">縛られない幻影 フェーティ</div>
  </div>
</template>

<script>
import Model from "./packs/model";

export default {
  props: {
    model: Model,
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-bottom: 1px solid rgba(229, 255, 188, 0.384);
  .title {
    line-height: 100%;
    font-size: 8px;
    width: 100%;
    text-align: center;
    color: rgb(229, 255, 188);
  }

  .bar_area {
    width: 800px;
    height: 16px;
    position: relative;
    .skew {
      transform: skewX(-20deg);
      width: 100%;
      height: 100%;
      .base {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgb(170, 54, 70);
      }
      .ghost {
        position: absolute;
        width: 40%;
        height: 100%;
        background-color: rgb(217, 255, 113);
        opacity: 0.6;
        transition: width 0.5s;
        transition-delay: 0.5s;
      }
      .bar {
        position: absolute;
        width: 40%;
        height: 100%;
        background-color: rgb(217, 255, 113);
      }
    }
  }
  .name {
    color: rgb(229, 255, 188);
  }
}
</style>
