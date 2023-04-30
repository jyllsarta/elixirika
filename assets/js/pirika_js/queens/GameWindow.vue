<template>
  <div class="game_window">
    <enemy-image class="enemy_image component" :state="state" />
    <enemy-hand class="enemy_hand component" :state="state" />
    <enemy-message class="enemy_message component" :state="state" />
    <bankroll class="bankroll component" :state="state" />
    <game-table class="game_table component" :state="state" :controller="controller" />
    <turn-end-button class="turn_end_button component" :state="state" :controller="controller" />
    <player-hand class="player_hand component" :state="state" :controller="controller"/>
    <side-pane class="side_pane component" :state="state" :controller="controller"/>
    <option-menu class="menu component" @click="showTutorial = true"/>
    <tutorial-dialog class="dialog component" v-if="showTutorial" @close="showTutorial = false"/>
    <first-break-dialog class="dialog component" v-if="showFirstBreak" @close="showFirstBreak = false"/>
    <second-break-dialog class="dialog component" v-if="showSecondBreak" @close="showSecondBreak = false"/>
    <gameset-dialog class="dialog component" v-if="state?.phase == 'game_end'" @close="setup" :state="state" />
    <debug-state class="debug_state" :state="state" :controller="controller" />
    <phase-mover :state="state" :controller="controller" />
  </div>
</template>

<script>
import State from "./packs/model/state";
import DebugState from "./DebugState.vue";
import Controller from "./packs/service/controller";
import EnemyHand from "./EnemyHand.vue";
import EnemyImage from "./EnemyImage.vue";
import EnemyMessage from "./EnemyMessage.vue";
import PlayerHand from "./PlayerHand.vue";
import GameTable from "./GameTable.vue";
import SidePane from './SidePane.vue';
import PhaseMover from './PhaseMover.vue';
import OptionMenu from './OptionMenu.vue';
import Bankroll from './Bankroll.vue';
import TutorialDialog from './TutorialDialog.vue';
import FirstBreakDialog from './FirstBreakDialog.vue';
import SecondBreakDialog from './SecondBreakDialog.vue';
import GamesetDialog from './GamesetDialog.vue';
import TurnEndButton from './TurnEndButton.vue';

export default {
  components: {
    DebugState,
    PlayerHand,
    EnemyHand,
    EnemyImage,
    EnemyMessage,
    GameTable,
    SidePane,
    PhaseMover,
    OptionMenu,
    Bankroll,
    TutorialDialog,
    FirstBreakDialog,
    SecondBreakDialog,
    GamesetDialog,
    TurnEndButton
  },
  data(){
    return {
      state: null,
      controller: null,
      showTutorial: false,
      showFirstBreak: false,
      showSecondBreak: true,
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
  position: relative;
  background-color: $bg4;
  color: $white;

  .component{
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
    top: 170px;
    left: 10px;
    width: 500px;
    height: 80px;
  }
  .enemy_message{
    top: 60px;
    left: 300px;
    width: 250px;
    height: 80px;
  }
  .bankroll{
    top: 10px;
    right: 320px;
    width: 200px;
    height: 100px;
  }
  .turn_end_button{
    top: 200px;
    right: 320px;
    width: 200px;
    height: 100px;
  }
  .game_table{
    top: 260px;
    left: 10px;
    width: 870px;
    height: 220px;
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
  .dialog{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .debug_state{
    position: absolute;
    top: 600px;
    background-color: $bg4;
  }
}
</style>
