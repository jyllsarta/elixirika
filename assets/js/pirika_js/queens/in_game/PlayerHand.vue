<template>
  <div class="player_hand" v-if="state">
    <div class="hands">
      <div class="hand tentative_button" v-for="card in state.playerHand.cards" :key="card.id" @click="onCardClick(card.id)">
        {{card.n}}
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
    onCardClick(cardId){
      this.controller.selectCardByCardId(cardId);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.player_hand{
  height: 100%;
  width: 100%;
  .hands{
    height: 100%;
    width: 100%;
    padding: 4px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    gap: 8px;
    .hand{
      flex: 1;
      height: 100%;
      max-width: 200px;
    }
  }
}
</style>
