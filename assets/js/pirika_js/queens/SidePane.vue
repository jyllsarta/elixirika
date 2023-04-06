<template>
<div class="table" v-if="state">
  <div>phase: {{state.phase}}</div>
  <div>round: {{state.round}}</div>
  <div>pot: {{state.pot}}</div>
  <div>EnemyScore: {{state.enemyScore}}</div>
  <div>EnemySP: {{state.enemySpecialPoint}}</div>
  <div>PlayerScore: {{state.playerScore}}</div>
  <div>PlayerSP: {{state.playerSpecialPoint}}</div>
</div>
</template>

<script>
import State from "./packs/model/state";
export default {
  props: {
    state: State
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
</style>
