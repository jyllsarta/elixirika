<template>
  <div class="table_area">
    <div class="bankroll_area tentative_panel">
      バンクロール
    </div>
    <div class="targets_area tentative_panel">
      ターゲット
    </div>
    <div class="cards_area tentative_panel">
      カードs
    </div>
    <div class="decide_area tentative_panel">
      OKボタン
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
.table_area{
  height: 100%;
  width: 100%;
  display: flex;

  .bankroll_area{
    width: 20%;
    height: 100%;
  }
  .targets_area{
    width: 20%;
    height: 100%;
  }
  .cards_area{
    width: 40%;
    height: 100%;
  }
  .decide_area{
    width: 20%;
    height: 100%;
  }
}
</style>
