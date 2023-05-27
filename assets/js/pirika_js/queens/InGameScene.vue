<template>
  <div class="in_game_scene">
    <floating-menu-vue class="floating_menu"/>
    <div class="content">
      <div class="main_area">
        <character-area-vue class="character_area"/>
        <table-area-vue class="table_area" :state="state" :controller="controller"/>
        <player-hand-vue class="player_hand" :state="state" :controller="controller"/>
      </div>
        <right-area-vue class="right_area" :state="state" :controller="controller"/>
    </div>
    <debug-state-vue :state="state" :controller="controller"/>
    <phase-mover-vue :state="state" :controller="controller"/>
  </div>
</template>

<script>
import PlayerHandVue from './in_game/PlayerHand.vue';
import CharacterAreaVue from './in_game/CharacterArea.vue';
import TableAreaVue from './in_game/TableArea.vue';
import RightAreaVue from './in_game/RightArea.vue';
import State from "./packs/model/state";
import Controller from "./packs/service/controller";
import DebugStateVue from './DebugState.vue';
import PhaseMoverVue from './PhaseMover.vue';
import FloatingMenuVue from "./in_game/FloatingMenu.vue";

export default {
  components: {
    CharacterAreaVue,
    PlayerHandVue,
    TableAreaVue,
    RightAreaVue,
    DebugStateVue,
    PhaseMoverVue,
    FloatingMenuVue,
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
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.in_game_scene{
  width: 100%;
  height: 100%;
  background-color: $bg4;

  .floating_menu{
    position: absolute;
    top: 8px;
    left: 8px;
    width: 80px;
    height: 200px;
  }

  .content{
    width: 100%;
    height: 100%;
    display: flex;
    .main_area{
      height: 100%;
      width: 70%;
      .character_area{
        height: 45%;
      }
      .table_area{
        height: 40%;
      }
      .player_hand{
        height: 15%;
      }
    }
    .right_area{
      height: 100%;
      width: 30%;
    }
  }
}
</style>
