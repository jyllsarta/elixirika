<template>
  <div
    class="pointer"
    :style="{
      transform: 'translate(' + x + 'px,' + y + 'px)',
      pointerEvents: 'none',
    }"
  >
    <div class="player" :style="{ transform: 'scale(' + hpRate + ')' }"></div>
    <div class="discharge_circle effective" v-if="isCharging"></div>
    <div
      class="discharge_circle current"
      v-if="isCharging"
      :style="{ transform: 'scale(' + chargeRate + ')' }"
    ></div>
    <div class="hp_area">
      <span class="max_hp">{{ hp }}</span
      ><span class="sep">/</span><span class="energy">{{ energy }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pointer",
  props: [
    "x",
    "y",
    "hpRate",
    "hp",
    "initialHp",
    "energy",
    "charge",
    "isCharging",
    "chargeRate",
  ],
};
</script>

<style lang="scss" scoped>
@import "stylesheets/constants";
.pointer {
  pointer-events: none;
  will-change: transform;
  position: absolute;
  top: -$pointer-size * 0.5;
  left: -$pointer-size * 0.5;
  .player {
    position: absolute;
    will-change: transform;
    background-color: $accent-color;
    top: -$pointer-size * 0.5;
    left: -$pointer-size * 0.5;
    width: $pointer-size;
    height: $pointer-size;
    border-radius: $pointer-size * 0.5;
    box-shadow: 0px 6px 4px -2px rgba(0, 0, 0, 0.4);
  }
  .hp_area {
    position: absolute;
    font-family: "Cute Font", cursive;
    font-size: 20px;
    top: -20px;
    left: $pointer-size * 0.5;
  }
  .discharge_circle {
    border-radius: 10000px;
    position: absolute;
    top: -80;
    left: -80;
    width: 160px;
    height: 160px; // TODO: サイズを計算して出す
  }
  .effective {
    z-index: 1;
    border: 2px solid $blight;
  }
  .current {
    z-index: 2;
    border: 2px solid $accent-color;
  }
}
</style>
