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
      <div>
        phase: {{state.phase}}
      </div>

      <h3>なんでもボタン</h3>
      <button @click="setup">setup</button>
      <button @click="nextPhase">nextPhase</button>
    </div>
  </div>
</template>

<script>
import State from "./packs/model/state";
import Controller from "./packs/service/controller";

export default {
  data(){
    return {
      state: null,
      controller: null,
    }
  },
  mounted(){
    this.state = new State();
    window.state = this.state;
    this.controller = new Controller(state);
  },
  methods: {
    setup(){
      this.controller.setup();
    },
    nextPhase(){
      this.controller.nextPhase();
    }
  }
};
</script>

<style lang="scss">
@import "stylesheets/global_settings";
</style>
