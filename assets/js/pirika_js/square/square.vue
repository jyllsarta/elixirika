<template lang="pug">
  #app
    h1
      | すくえあ！
    .title(v-if="gameState == 'title'")
      TitleScene(@characterSelected="onCharacterSelected")
    .game(v-if="gameState == 'inGame'")
      InGameScene(:characterId="characterId")
</template>

<script lang="typescript">
    import Vue from 'vue';
    import TitleScene from "./TitleScene.vue";
    import InGameScene from "./InGameScene.vue";

    export default Vue.extend({
    components: {
      TitleScene,
      InGameScene,
    },
    methods: {
      onCharacterSelected(characterId){
        this.startGame(characterId)
      },
      startGame(characterId){
        this.gameState = "inGame";
        this.characterId = characterId;
      },
    },
    data(){
      return {
        gameState: "title",
        characterId: -1,
      };
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
  body{
    margin: 20px;
  }
  h1 {
    font-size: 30px;
  }
</style>
