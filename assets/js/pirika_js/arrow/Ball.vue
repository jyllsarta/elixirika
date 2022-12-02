<template>
  <!-- この文字列結合でtranslateするのもうちょいスマートにやりたいなあ-->
  <div
    class="ball"
    :style="{
      transform:
        'translate(' +
        ball.x * constants.gameWindowPixelSizeY +
        'px,' +
        ball.y * constants.gameWindowPixelSizeX +
        'px)',
    }"
    :class="[
      `color_${ball.colorId}`,
      `${ball.removedAt !== null ? 'removed' : ''}`,
    ]"
  ></div>
</template>

<script>
export default {
  name: "Ball",
  props: ["ball", "constants"],
};
</script>

<style lang="scss" scoped>
@import "stylesheets/constants";
.ball {
  box-shadow: 0px 6px 4px -2px rgba(0, 0, 0, 0.4);
  will-change: transform;
  position: absolute;
  background-color: $main-color;
  width: $ball-size;
  height: $ball-size;
  border-radius: $ball-size * 0.5;
  top: -$ball-size * 0.5;
  left: -$ball-size * 0.5;
  &.removed {
    transition: opacity 1s;
    background-color: $blight;
    opacity: 0;
  }
  animation: delay 0.6s;
  @keyframes delay {
    0% {
      background-color: $blight;
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
