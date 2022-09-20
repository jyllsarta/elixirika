
<template lang="pug">
  .scene
    .screen
      EnemyStats.enemy_stats
      .enemy_commands.component
        .content
          | コマンド
      .bullets.component
        .content
          | 弾幕
      .enemy.component
        img(src="/images/rhomb/enemy.png")
      .player.component
        img(src="/images/rhomb/player_back.png")
      .player_ui.component
        .content
          | プレイヤーUI
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model";
  import Controller from "./packs/controller";
  import store from "./packs/store";
  import EnemyStats from "./EnemyStats.vue"

  export default Vue.extend({
    store,
    components: {
      EnemyStats
    },
    data(){
      return {
        model: null,
      };
    },
    methods: {
      proceed(){
        this.$emit("loadScene", {sceneName: "title"});
      },
      backToMenu(){
        this.$emit("loadScene", {sceneName: "mainMenu"});
      },
      startGame(){
        if(this.model.isGameStarted){
          return;
        }
        const rand = Math.floor(Math.random() * 100000000);
        this.model.initialize(rand);
        // 今後は演出のあとにstartGameする
        this.model.startGame();
        this.$store.commit("playSound", {key: "ok"});
        this.$store.commit("playBgm", "bgm3");
      },
    },
    created(){
      this.model = new Model();
      this.controller = new Controller(this.model);
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
    .component{
      position: absolute;
      border: 1px dashed #defdef;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .enemy_stats{
      width: 100%;
      height: 100px;
      top: 0;
      left: 0;
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
      img{
        height: 100%;
      }
    }
    .player{
      width: 30%;
      height: 400px;
      bottom: 0;
      left: 0;
      img{
        height: 100%;
      }
    }
    .player_ui{
      width: 50%;
      height: 200px;
      bottom: 0;
      left: 0;
    }
  }
</style>
