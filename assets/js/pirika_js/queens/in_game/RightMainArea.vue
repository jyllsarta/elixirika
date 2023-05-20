<template>
  <div class="right_main_area_frame">
    <div class="content">
      <div class="enemy_status tentative_panel">
        敵スタッツ
      </div>
      <div class="round_status tentative_panel">
        ラウンド
      </div>
      <div class="player_status tentative_panel">
        プレイヤースタッツ
      </div>
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
.right_main_area_frame{
  height: 100%;
  width: 100%;
  padding: 10px;
  .content{
    border: 1px dotted $white;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .enemy_status{
      width: 80%;
      height: 20%;
    }
    .round_status{
      width: 80%;
      height: 40%;
    }
    .player_status{
      width: 80%;
      height: 20%;
    }
  }
}
</style>
