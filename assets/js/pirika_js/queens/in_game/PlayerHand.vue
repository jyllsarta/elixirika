<template>
  <div class="player_hand">
    <div class="hands">
      <div class="hand tentative_panel">1</div>
      <div class="hand tentative_panel">2</div>
      <div class="hand tentative_panel">3</div>
      <div class="hand tentative_panel">7</div>
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
  .hands{
    height: 100%;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    gap: 10px;
    .hand{
      flex: 1;
      height: 80%;
      max-width: 200px;
    }
  }
}
</style>
