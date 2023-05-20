<template>
  <div class="character_area">
    <div class="character tentative_panel">
      キャラ！
    </div>
    <div class="enemy_hands tentative_panel">
      エネミーハンド
    </div>
    <div class="baloon tentative_panel">
      ふきだし
    </div>
    <div class="challenge_board tentative_panel">
      チャレンジボード
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
.character_area{
  position: relative;
  height: 100%;
  width: 100%;

  .character{
    position: absolute;
    width: 60%;
    height: 100%;
    left: 5%;
    z-index: 100;
  }
  .enemy_hands{
    position: absolute;
    left: 20%;
    width: 70%;
    height: 20%;
    bottom: 0;
    z-index: 400;
  }
  .baloon{
    position: absolute;
    width: 30%;
    height: 30%;
    top: 45%;
    right: 20%;
    z-index: 400;
  }
  .challenge_board{
    position: absolute;
    width: 30%;
    height: 40%;
    right: 5%;
    z-index: 400;
  }
}
</style>
