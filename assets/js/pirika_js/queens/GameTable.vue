<template>
<div class="table" v-if="state">
  <h2>EnemyBoard</h2>
  <div class="hand" v-for="hand in state.enemyBoard.cards" :key="hand.id">
    {{hand}}
  </div>
  <h2>Target</h2>
  <div class="hand" v-for="hand in state.board.cards" :key="hand.id">
    {{hand}}
  </div>
  <h2>PlayerBoard</h2>
  <div class="hand" v-for="hand in state.playerBoard.cards" :key="hand.id">
    {{hand}}
  </div>
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

<style lang="scss">
@import "stylesheets/global_settings";
</style>
