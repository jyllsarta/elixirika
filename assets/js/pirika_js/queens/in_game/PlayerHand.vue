<template>
  <div class="player_hand">
    <div class="hand_area tentative_panel">
      ハンド
    </div>
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.player_hand{
  height: 100%;
  width: 100%;
  .hand_area{
    height: 100%;
    width: 100%;
  }
}
</style>
