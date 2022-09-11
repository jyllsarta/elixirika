
<template lang="pug">
  .scene
    #screen.screen(ref="screen")
      .enemies
        Enemy(v-for="enemy in model.enemies" :enemy="enemy", :key="enemy.id")
      .locks
        Lock(v-for="lock in model.locks" :lock="lock", :key="lock.id")
      Sight.sight(:model="model", :controller="controller" :screen="$refs")
      .buttons
        .button(@click="proceed")
          | インゲームです
        .button(@click="backToMenu")
          | メニューに戻るです
        .button(@click="startGame")
          | スタートします
        .value
          | {{model.seed}}
        .value
          | {{model.enemies}}
        .value
          | {{model.locks}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model";
  import Enemy from "./Enemy.vue";
  import Lock from "./Lock.vue";
  import Sight from "./Sight.vue";
  import Controller from "./packs/controller";
  import store from "./packs/store";

  export default Vue.extend({
    components: {
      Enemy,
      Sight,
      Lock
    },
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
        const rand = Math.floor(Math.random() * 100000000);
        this.model.initialize(rand);
        this.$store.commit("playSound", {key: "ok"});
        this.$store.commit("playBgm", "bgm3");
      }
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
      .enemy{
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
</style>
