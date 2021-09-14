<template lang="pug">
  #app
    Header
    .game
      .title(v-if="gameState == 'title'")
        TitleScene(@characterSelected="onCharacterSelected")
      .in_game(v-if="gameState == 'inGame'")
        InGameScene(:characterId="characterId", @endGame="onEndGame")
</template>

<script lang="typescript">
    import Vue from 'vue';
    import Header from "./Header.vue";
    import TitleScene from "./TitleScene.vue";
    import InGameScene from "./InGameScene.vue";

    export default Vue.extend({
    components: {
      Header,
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
      onEndGame(){
        this.backToTitle();
      },
      backToTitle(){
        this.gameState = "title";
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
    margin: 0;
  }
  #app {
    width: 100%;
    height: 100%;
    background-color: rgb(44, 44, 59);
    .game{
      width: 1024px;
      margin: auto;
    }
  }
</style>
