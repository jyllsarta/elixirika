<template>
  <div>
    <div v-if="state">
      <h2>state:</h2>
      <div>
        Deck: {{state.deck.cards}}
      </div>
      <div>
        Discard: {{state.discard.cards}}
      </div>
      <div>
        EnemyHand: {{state.enemyHand.cards}}
      </div>
      <div>
        EnemyBoard: {{state.enemyBoard.cards}}
      </div>
      <div>
        PlayerHand: {{state.playerHand.cards}}
      </div>
      <div>
        PlayerBoard: {{state.playerBoard.cards}}
      </div>
      <div>
        Board: {{state.board.cards}}
      </div>
      <div>
        BoardNext: {{state.boardNext.cards}}
      </div>
    </div>
  </div>
</template>

<script>
import State from "./packs/state";

export default {
  data(){
    return {
      state: null,
    }
  },
  mounted(){
    this.state = new State();
    window.state = this.state;
  }
};
</script>

<style lang="scss">
@import "stylesheets/global_settings";
</style>
