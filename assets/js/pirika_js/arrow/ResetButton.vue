<template>
  <div class="game_start_button" @click="$emit('resetGame')"></div>
</template>
<script>
export default {
  name: "ResetButton",
};
</script>

<style lang="scss" scoped>
@import "stylesheets/constants";
.game_start_button {
  transform: rotateZ(45deg);
  background-color: $accent-color;
  border-radius: $ball-size * 0.5;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
    opacity: 0.3;
  }
}
</style>
