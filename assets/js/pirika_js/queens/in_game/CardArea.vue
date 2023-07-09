<template>
  <div class="card_area" v-if="state">
    <div class="cards">
      <div 
        v-for="card in state.board.cards"
        :key="card.id"
        class="card tentative_panel"
      >
        {{ card.stringRepresentation() }}
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
    controller: Object,
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.card_area{
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .cards{
    width: 100%;
    height: 100%;
    border: 1px solid $white;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 8px;
    .card{
      width: 100px;
      height: 100px;
      border: 1px solid $white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $font-size-large;
    }
  }
}
</style>
