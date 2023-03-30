<template>
  <div class="game_window">
    <div class="menu component">メニュー</div>
    <div class="enemy_image component">敵画像</div>
    <div class="enemy_hand component">敵手札</div>
    <div class="enemy_message component">ふきだし</div>
    <div class="bankroll component">バンクロール</div>
    <div class="table component">テーブル</div>
    <div class="player_hand component">
      <player-hand :state="state" />
    </div>
    <div class="side_pane component">サイドパネル</div>
    <debug-state class="debug_state" :state="state" :controller="controller"></debug-state>
  </div>
</template>

<script>
import State from "./packs/model/state";
import DebugState from "./DebugState.vue";
import Controller from "./packs/service/controller";
import PlayerHand from "./PlayerHand.vue";

export default {
  components: {
    DebugState,
    PlayerHand,
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

<style lang="scss">
@import "stylesheets/global_settings";
.game_window{
  width: 1200px;
  height: 800px;
  border: 1px solid cyan;
  position: relative;
  background-color: #121232;
  color: azure;
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
    height: 300px;
  }
  .enemy_hand{
    top: 250px;
    left: 10px;
    width: 500px;
    height: 100px;
  }
  .enemy_message{
    top: 100px;
    left: 300px;
    width: 450px;
    height: 140px;
  }
  .bankroll{
    top: 10px;
    right: 320px;
    width: 200px;
    height: 100px;
  }
  .table{
    top: 330px;
    left: 10px;
    width: 870px;
    height: 300px;
  }
  .player_hand{
    bottom: 10px;
    left: 10px;
    width: 870px;
    height: 150px;
  }
  .side_pane{
    top: 10px;
    right: 10px;
    width: 300px;
    height: 780px;
  }
  .debug_state{
    position: absolute;
    top: 800px;
    background-color: #121232;
  }
}
</style>
