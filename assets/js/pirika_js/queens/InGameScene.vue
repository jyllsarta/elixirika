<template>
  <div class="in_game_scene">
    <div class="floating_menu tentative_panel">
      三
    </div>
    <div class="content">
      <div class="main_area">
        <character-area-vue class="character_area"/>
        <table-area-vue class="table_area"/>
        <player-hand-vue class="player_hand"/>
      </div>
        <right-area-vue class="right_area"/>
    </div>
  </div>
</template>

<script>
import PlayerHandVue from './in_game/PlayerHand.vue';
import CharacterAreaVue from './in_game/CharacterArea.vue';
import TableAreaVue from './in_game/TableArea.vue';
import RightAreaVue from './in_game/RightArea.vue';
import State from "./packs/model/state";
import Controller from "./packs/service/controller";

export default {
  components: {
    CharacterAreaVue,
    PlayerHandVue,
    TableAreaVue,
    RightAreaVue
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
    top: 10px;
    left: 10px;
    width: 80px;
    height: 80px;
  }

  .content{
    width: 100%;
    height: 100%;
    display: flex;
    .main_area{
      height: 100%;
      width: 70%;
      .character_area{
        height: 50%;
      }
      .table_area{
        height: 30%;
      }
      .player_hand{
        height: 20%;
      }
    }
    .right_area{
      height: 100%;
      width: 30%;
    }
  }
}
</style>
