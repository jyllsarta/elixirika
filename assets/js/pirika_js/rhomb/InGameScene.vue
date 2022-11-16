<template>
    <div class="scene">
        <div class="screen">
            <GUIHandler :model="model" :controller="controller"></GUIHandler>
            <EnemyStats class="enemy_stats component" :model="model"></EnemyStats>
            <EnemyCommands class="enemy_commands component" :model="model"></EnemyCommands>
            <EnemyImage class="enemy component"></EnemyImage>
            <PlayerImage class="player component"></PlayerImage>
            <LockScreen class="lock_screen component" :model="model"></LockScreen>
            <Pointer class="pointer component" :model="model"></Pointer>
            <Bullets class="bullets component" :model="model"></Bullets>
            <PlayerUI class="player_ui component" :model="model"></PlayerUI>
            <DamageNumber class="damage_number component" v-if="currentPhase == 'LOCK'" :model="model"></DamageNumber>
            <GameStartDialog class="full_screen component" v-if="currentPhase == 'START'" :model="model"></GameStartDialog>
            <GameEndDialog class="full_screen component" v-if="model.isGameOver" :model="model"></GameEndDialog>
            <DebugUI class="debug_ui component" :model="model"></DebugUI>
            <InGameSoundManager :model="model"></InGameSoundManager>
        </div>
    </div>
</template>

<script>
  
  import Model from "./packs/model";
  import Controller from "./packs/controller";
  import store from "./packs/store";
  import Bullets from "./Bullets.vue";
  import DebugUI from "./DebugUI.vue";
  import DamageNumber from "./DamageNumber.vue";
  import EnemyCommands from "./EnemyCommands.vue";
  import EnemyImage from "./EnemyImage.vue";
  import EnemyStats from "./EnemyStats.vue";
  import GameEndDialog from "./GameEndDialog.vue";
  import GameStartDialog from "./GameStartDialog.vue";
  import GUIHandler from "./GUIHandler.vue";
  import InGameSoundManager from "./InGameSoundManager.vue"
  import LockScreen from "./LockScreen.vue";
  import PlayerImage from "./PlayerImage.vue";
  import PlayerUI from "./PlayerUI.vue";
  import Pointer from "./Pointer.vue";

  export default({
    store,
    components: {
      Bullets,
      DebugUI,
      DamageNumber,
      EnemyCommands,
      EnemyImage,
      EnemyStats,
      GameEndDialog,
      GameStartDialog,
      GUIHandler,
      InGameSoundManager,
      LockScreen,
      PlayerImage,
      PlayerUI,
      Pointer,
    },
    data(){
      return {
        model: null,
        controller: null,
      };
    },
    methods: {
      proceed(){
        this.$emit("loadScene", {sceneName: "title"});
      },
      backToMenu(){
        this.$emit("loadScene", {sceneName: "mainMenu"});
      },
    },
    computed: {
      currentPhase(){
        return this.model?.phaseStateMachine.phase.name;
      }
    },
    created(){
      this.model = new Model();
      this.controller = new Controller(this.model);
      this.controller.prepare();
      // デバッグ用バックドア
      window.model = this.model;
      window.controller = this.controller;
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .scene{
    position: relative;
    color: $white;
    width: 100%;
    height: 100%;
    border: 1px solid white;
  }

  .screen{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(40, 43, 68);
    .component{
      position: absolute;
    }
    .enemy_stats{
      width: 70%;
      height: 80px;
      top: 0;
      left: 15%;
    }
    .enemy_commands{
      width: 20%;
      height: 200px;
      top: 100px;
      left: 0;
    }
    .enemy{
      width: 40%;
      height: 600px;
      top: 100px;
      right: 0;
    }
    .player{
      width: 300px;
      height: 300px;
      bottom: 0;
      left: 0;
    }
    .lock_screen{
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .damage_number{
      width: 30%;
      height: 100px;
      top: 0;
      left: 35%;
    }
    .player_ui{
      width: 50%;
      height: 200px;
      bottom: 0;
      left: 0;
    }
    .debug_ui{
      width: 30%;
      top: 0;
      right: 0;
    }
    .full_screen{
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;  
    }
  }
</style>
