<template>
<div class="enemy_image" v-if="state">
  <img src="/images/queens/characters/queens1.png" alt="" class="enemy">
</div>
</template>

<script>
import State from "./packs/model/state";
export default {
  props: {
    state: State
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.enemy{
  position: relative;
  width: 350px;
  top: -50px;
}
</style>
