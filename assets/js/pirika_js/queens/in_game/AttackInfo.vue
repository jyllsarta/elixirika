<template>
  <div class="attack_info" v-if="state">
    <div class="main">
      <div class="item target">
        <div class="label">このターンのカウントへのダメージ</div>
        <div class="big_value">{{state.enemy.estimatedAtk()}}</div>
      </div>
      <div class="item reduce">
        <div class="label">1コンボごとの減衰量</div>
        <div class="value">{{state.enemy.reduceAtkPerCombo}}</div>
      </div>
    </div>
    <div class="stun_cover" v-if="state.enemy.stunTurn > 0">
      <div class="bg" />
      <div class="stun" v-if="state.enemy.stunTurn === 1">
        スタン！
      </div>
      <div class="stun" v-if="state.enemy.stunTurn > 1">
        大スタン！
      </div>
    </div>
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    state: Object,
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.attack_info{
  width: 100%;
  height: 100%;
  border: 1px solid $white;

  .main{
    width: 100%;
    height: 100%;
    background-color: $bg2;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4px;

    .item{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      gap: 2px;
      .label{
        font-size: $font-size-mini;
        border-bottom: 1px solid $white;
        text-align: center;
        width: 80%;
        line-height: 100%;
      }
      .big_value{
        font-size: $font-size-xlarge;
        line-height: 100%;
      }
    }
  }

  .stun_cover{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    .bg{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: $bg2;
      opacity: 0.8;
    }
    .stun{
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $font-size-xlarge;
      color: $white;
    }
  }
}
</style>
