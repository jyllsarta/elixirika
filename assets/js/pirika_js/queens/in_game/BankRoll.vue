<template>
  <div class="bankroll_area">
    <div class="enemy bankroll">
      <div class="coins tentative_panel">
        コイン
      </div>
      <div class="amount tentative_panel">
        192
      </div>
    </div>
    <div class="player bankroll">
      <div class="coins tentative_panel">
        コイン
      </div>
      <div class="amount tentative_panel">
        192
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
.bankroll_area{
  width: 100%;
  height: 100%;
  padding: 10px;
  .enemy{
    border-bottom: 1px dotted $white;
  }
  .bankroll{
    padding: 10px;
    display: flex;
    justify-content: space-around;
    height: 50%;
    .coins{
      width: 40%;
    }
    .amount{
      width: 50%;
    }
  }
}
</style>
