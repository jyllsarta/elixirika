
<template lang="pug">
  .scene
    .screen
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model";
  import Controller from "./packs/controller";
  import store from "./packs/store";

  export default Vue.extend({
    store,
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
    .enemies{
      position: absolute;
      pointer-events: none;
      width: 100%;
      height: 100%;
      .enemy_locator{
        position: absolute;
      }
    }
    .locks{
      position: absolute;
      pointer-events: none;
      width: 100%;
      height: 100%;
      .lock{
        position: absolute;
      }
    }
    .sight{
      position: absolute;
    }
    .line{
      position: absolute;
      background-color: antiquewhite;
      width: 100%;
      height: 1px;
      top: 600px;
    }
    .buttons{
      position: absolute;
      right: 0;
      width: 200px;
      .button{
        width: 200px;
        height: 100px;
        background-color: rgb(157, 222, 135);
      }
    }
  }

  .show-enter-active {
    transition: all .3s;
  }
  .show-leave-active {
    transition: all .3s;
  }
  .show-enter{
    opacity: 0;
  }
  .show-leave-to{
    opacity: 0;
  }
</style>
