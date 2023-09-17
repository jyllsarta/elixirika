<template>
  <div class="in_game_scene">
    <floating-menu-vue class="floating_menu"/>
    <background-vue class="background"/>
    <div class="content">
      <div class="main_area">
        <div class="field">
          <left-area-vue class="left_area" :state="state" :controller="controller"/>
          <div class="character_and_table">
            <character-area-vue class="character_area" :state="state" :controller="controller"/>
            <table-area-vue class="table_area" :state="state" :controller="controller"/>
          </div>
        </div>
        <player-hand-vue class="player_hand" :state="state" :controller="controller"/>
      </div>
      <right-area-vue class="right_area" :state="state" :controller="controller"/>
    </div>
    <fragment-vue class="fragments" :state="state"/>
    <gameset-dialog-vue class="dialog component" v-if="state?.isGameEnd()" :state="state" />
    <game-start-dialog-vue class="dialog component" v-if="state?.phase === 'unstarted'" :quest="quest" @start-game="startGame"/>
    <debug-state-vue :state="state" :controller="controller" v-if="false"/>
    <phase-mover-vue :state="state" :controller="controller"/>
  </div>
</template>

<script>
import PlayerHandVue from "./in_game/PlayerHand.vue";
import CharacterAreaVue from "./in_game/CharacterArea.vue";
import TableAreaVue from "./in_game/TableArea.vue";
import RightAreaVue from "./in_game/RightArea.vue";
import LeftAreaVue from "./in_game/LeftArea.vue";
import State from "./packs/model/state";
import Controller from "./packs/service/controller";
import DebugStateVue from "./DebugState.vue";
import PhaseMoverVue from "./PhaseMover.vue";
import FloatingMenuVue from "./in_game/FloatingMenu.vue";
import GamesetDialogVue from "./in_game/GamesetDialog.vue";
import GameStartDialogVue from "./in_game/GameStartDialog.vue";
import BackgroundVue from "./in_game/Background.vue";
import FragmentVue from "./in_game/Fragments.vue";
import Savedata from "./packs/savedata";
import Masterdata from "./packs/masterdata";

export default {
  components: {
    CharacterAreaVue,
    PlayerHandVue,
    TableAreaVue,
    RightAreaVue,
    LeftAreaVue,
    DebugStateVue,
    PhaseMoverVue,
    FloatingMenuVue,
    GamesetDialogVue,
    GameStartDialogVue,
    BackgroundVue,
    FragmentVue,
  },
  data() {
    return {
      state: null,
      controller: null,
      quest: null,
    };
  },
  mounted() {
    const questId = this.$store.state.scene.params.questId;
    const playerParams = Savedata.playerParams();
    this.quest = Masterdata.get("quests", questId);
    this.state = new State(questId, playerParams);
    window.state = this.state;
    this.controller = new Controller(this.state);
    window.controller = this.controller;
  },
  methods: {
    startGame() {
      this.controller.operate("nextPhase");
    },
  },
};
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
    z-index: 2000;
  }

  .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .content{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1000;
    .main_area{
      height: 100%;
      width: 100%;
      .field{
        height: 90%;
        width: 100%;
        display: flex;
        .left_area{
          height: 100%;
          width: 20%;
        }
        .character_and_table{
          height: 100%;
          width: 80%;
          .character_area{
            height: 50%;
            z-index: 100;
          }
          .table_area{
            position: relative;
            height: 50%;
            z-index: 200;
            border: 3px solid $accent1;
            // transforms to trapezoid
            transform: perspective(100px) rotateX(2deg) translateY(-10px);
          }
        }
      }
      .player_hand{
        position: relative;
        z-index: 300;
        height: 10%;
      }
    }
    .right_area{
      height: 100%;
      width: 30%;
    }
  }
  .fragments{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2000;
  }
  .dialog{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3000;
  }
}
</style>
