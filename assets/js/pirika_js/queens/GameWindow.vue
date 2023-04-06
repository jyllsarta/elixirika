<template>
  <div class="game_window">
    <div class="menu component">メニュー</div>
    <div class="enemy_image component">
      <enemy-image :state="state" />
    </div>
    <div class="enemy_hand component">
      <enemy-hand :state="state" />
    </div>
    <div class="enemy_message component">ふきだし</div>
    <div class="bankroll component">バンクロール</div>
    <div class="game_table component">
      <game-table :state="state" :controller="controller" />
    </div>
    <div class="player_hand component">
      <player-hand :state="state" :controller="controller"/>
    </div>
    <div class="side_pane component">
      <side-pane :state="state" />
    </div>
    <debug-state class="debug_state" :state="state" :controller="controller"></debug-state>
    <phase-mover :state="state" :controller="controller" />
  </div>
</template>

<script>
import State from "./packs/model/state";
import DebugState from "./DebugState.vue";
import Controller from "./packs/service/controller";
import EnemyHand from "./EnemyHand.vue";
import EnemyImage from "./EnemyImage.vue";
import PlayerHand from "./PlayerHand.vue";
import GameTable from "./GameTable.vue";
import SidePane from './SidePane.vue';
import PhaseMover from './PhaseMover.vue';

export default {
  components: {
    DebugState,
    PlayerHand,
    EnemyHand,
    EnemyImage,
    GameTable,
    SidePane,
    PhaseMover,
  },
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
    window.controller = this.controller;
  },
  methods: {
    setup(){
      this.controller.setup();
    },
    nextPhase(){
      this.controller.nextPhase();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.game_window{
  width: 1200px;
  height: 600px;
  border: 1px solid cyan;
  position: relative;
  background-color: #121232;
  color: azure;
  overflow: hidden;

  .component{
    border: 1px solid cyan;
    position: absolute;
  }
  .menu{
    top: 10px;
    left: 10px;
    width: 50px;
    height: 50px;
  }
  .enemy_image{
    top: 0px;
    left: 30px;
    width: 400px;
    height: 200px;
  }
  .enemy_hand{
    top: 220px;
    left: 10px;
    width: 500px;
    height: 80px;
  }
  .enemy_message{
    top: 60px;
    left: 300px;
    width: 450px;
    height: 120px;
  }
  .bankroll{
    top: 10px;
    right: 320px;
    width: 200px;
    height: 100px;
  }
  .game_table{
    top: 330px;
    left: 10px;
    width: 870px;
    height: 250px;
  }
  .player_hand{
    bottom: 10px;
    left: 10px;
    width: 870px;
    height: 100px;
  }
  .side_pane{
    top: 10px;
    right: 10px;
    width: 300px;
    height: 580px;
  }
  .debug_state{
    position: absolute;
    top: 600px;
    background-color: #121232;
  }
}
</style>
