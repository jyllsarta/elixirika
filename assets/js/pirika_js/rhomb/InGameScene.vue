
<template lang="pug">
  .scene
    .screen
      GUIHandler(:model="model", :controller="controller")
      EnemyStats.enemy_stats.component
      EnemyCommands.enemy_commands.component
      Bullets.bullets.component
      EnemyImage.enemy.component
      PlayerImage.player.component
      PlayerUI.player_ui.component
      GameStartDialog.full_screen.component(v-if="currentPhase == 'START'", :model="model")
      DebugUI.debug_ui.component(:model="model")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model";
  import Controller from "./packs/controller";
  import store from "./packs/store";
  import Bullets from "./Bullets.vue";
  import DebugUI from "./DebugUI.vue";
  import EnemyCommands from "./EnemyCommands.vue";
  import EnemyImage from "./EnemyImage.vue";
  import EnemyStats from "./EnemyStats.vue";
  import GameStartDialog from "./GameStartDialog.vue";
  import GUIHandler from "./GUIHandler.vue";
  import PlayerImage from "./PlayerImage.vue";
  import PlayerUI from "./PlayerUI.vue";

  export default Vue.extend({
    store,
    components: {
      Bullets,
      DebugUI,
      EnemyCommands,
      EnemyImage,
      EnemyStats,
      GameStartDialog,
      GUIHandler,
      PlayerImage,
      PlayerUI,
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
    .bullets{
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .enemy{
      width: 40%;
      height: 600px;
      top: 100px;
      right: 0;
    }
    .player{
      width: 30%;
      height: 400px;
      bottom: 0;
      left: 0;
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
