<template>
  <div class="bankroll">
    <h2>バンクロール</h2>
    <div class="content">
      <div class="enemy line">
        <div class="name">
          トローズ
        </div>
        <div class="icon">
          ◆
        </div>
        <div class="value">
          82
        </div>
      </div>
      <div class="player line">
        <div class="name">
          プレイヤー
        </div>
        <div class="icon">
          ◆
        </div>
        <div class="value">
          82
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.bankroll{
  height: 100%;
  width: 100%;
  background-color: $bg3;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid $gray2;

  h2{
    height: 30%;
    border-bottom: 1px solid $gray3;
    padding: 4px;
  }

  .content{
    display: flex;
    flex-direction: column;
    height: 70%;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 4px;
    .line{
     display: flex;
       width: 100%;
       .name {
        width: 50%;
       } 
       .icon {
        width: 15%;
       }
       .value{
        width: 35%;
       }
    }
  }
}
</style>
