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

<style lang='scss'>
  @import "stylesheets/global_settings";

  // このリセットを効かせたいのでここだけ scoped を外している
  html, body, div, span, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  abbr, address, cite, code,
  del, dfn, em, img, ins, kbd, q, samp,
  small, strong, sub, sup, var,
  b, i,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    box-sizing: border-box;
  }

a {
    text-decoration: none;
    padding: 0px 0px;
  }

  #app {
    width: 100%;
    height: 100%;
    background-color: $frame-background;
    .game{
      width: 1200px;
      height: 600px;
      margin: auto;
    }
  }
</style>
