<template>
  <div class="cards" v-if="state">
    <div class="card tentative_panel" v-for="card in state.enemy.hand.cards" :key="card.id">{{ card.stringRepresentation() }}</div>
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
.cards{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
  .card{
    width: 60px;
    height: 60px;
  }
}
</style>
