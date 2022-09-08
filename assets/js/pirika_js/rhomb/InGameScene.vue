
<template lang="pug">
  .scene
    #screen.screen(ref="screen")
      .enemies
        Enemy(v-for="enemy in model.enemies" :enemy="enemy", :key="enemy.id")
      Sight.sight(:model="model", :screen="$refs")
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
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model";
  import Enemy from "./Enemy.vue";
  import Sight from "./Sight.vue";

  export default Vue.extend({
    components: {
      Enemy,
      Sight
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
        const rand = Math.floor(Math.random() * 100000000)
        this.model.initialize(rand);
      }
    },
    created(){
      this.model = new Model();
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
