<template>
  <div class="combo_area" v-if="state">
    <div class="label_area">
      <div class="label">
        Combo
      </div>
      <div class="description">
        現在のカード数
      </div>
    </div>
    <div class="combo">
      <div class="combo_number">
        {{state.board.currentComboCount(turnActor())}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: Object,
  },
  methods: {
    turnActor(){
      // enemyが含まれるphaseの場合のみstate.enemy, そうでない場合はstate.playerを返す
      return this.state.phase.includes("enemy") ? this.state.enemy : this.state.player;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.combo_area{
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .label_area{
    width: 100%;
    height: 10%;
    padding: 8px;
    .label{
      width: 100%;
      text-align: center;
    }
    .description{
      width: 100%;
      text-align: center;
      font-size: $font-size-mini;
      border-bottom: 1px solid $white;
    }
  }

  .combo{
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    .combo_number{
      font-size: $font-size-xlarge;
      color: $white;
    }
  }
}
</style>
