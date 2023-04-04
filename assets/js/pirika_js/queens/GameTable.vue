<template>
<div class="table" v-if="state">
  <div class="area">
  <h2>EnemyBoard</h2>
    <div v-for="card in state.enemyBoard.cards" :key="card.id">
      {{card}}
    </div>
  </div>

  <div class="area">
    <h2>Target</h2>
    <div v-for="card in state.board.cards" :key="card.id">
      {{card}}
    </div>    
  </div>

  <div class="area">
    <h2>PlayerBoard</h2>
    <div v-for="card in state.playerBoard.cards" :key="card.id" @click="controller.unstage(card.id)">
      {{card}}
    </div>    
  </div>
</div>
</template>

<script>
import State from "./packs/model/state";
import Controller from './packs/service/controller';
export default {
  props: {
    state: State,
    controller: Controller,
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.table{
  display: flex;

}
</style>
