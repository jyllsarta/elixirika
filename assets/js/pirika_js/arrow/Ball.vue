<template>
    <!-- この文字列結合でtranslateするのもうちょいスマートにやりたいなあ-->
    <div class="ball" :style="{ transform: 'translate(' + x + 'px,' + y + 'px)'}" :class="[`color_${colorId}`]"></div>
</template>

<script lang="ts">
  export default {
    name: "Ball",
    props: [
      "x",
      "y",
      "colorId",
    ],
  }
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
  .ball{
    box-shadow: 0px 6px 4px -2px rgba(0, 0, 0, 0.4);
    will-change: transform;
    position: absolute;
    background-color: $main-color;
    width: $ball-size;
    height: $ball-size;
    border-radius: $ball-size * 0.5;
    top: -$ball-size * 0.5;
    left: -$ball-size * 0.5;
  }

</style>
