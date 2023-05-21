<template>
  <div class="challenge_board">
    <div class="label_area">
      <div class="main">チャレンジ</div>
      <div class="description">条件を満たすとMP獲得</div>
    </div>
    <div class="challenges">
      <div class="challenge">
        <div class="requirement">
          8で勝利する
        </div>
        <div class="reward">
          ◯◯
        </div>
      </div>
      <div class="challenge">
        <div class="requirement">
          バーストせずに敗北する
        </div>
        <div class="reward">
          ◯◯
        </div>
      </div>
      <div class="challenge">
        <div class="requirement">
          ペアを出す
        </div>
        <div class="reward">
          ◯◯
        </div>
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
.challenge_board{
  width: 100%;
  height: 100%;
  border: 1px dotted $white;
  padding: 8px;
  display: flex;
  flex-direction: column;
  .label_area{
    width: 100%;
    text-align: center;
    border-bottom: 1px dotted $white;
    .description{
      font-size: $font-size-mini;
    }
  }
  .challenges{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .challenge{
      width: 100%;
      padding: 4px;
      .requirement{
        display: inline-block;
        width: 80%;
      }
      .reward{
        display: inline-block;
        width: 20%;
        text-align: center;
      }
    }
  }
}
</style>
