<template>
  <div class="player_hand">
    <div class="hands">
      <div class="hand tentative_button disabled">1</div>
      <div class="hand tentative_button disabled">2</div>
      <div class="hand tentative_button disabled">3</div>
      <div class="hand tentative_button disabled">7</div>
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
    padding: 4px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    gap: 8px;
    .hand{
      flex: 1;
      height: 100%;
      max-width: 200px;
    }
  }
}
</style>
