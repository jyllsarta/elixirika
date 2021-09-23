<template lang="pug">
  #app
    Header
    .game
      .title(v-if="sceneName == 'title'")
        TitleScene(@loadScene="loadScene")
      .in_game(v-if="sceneName == 'inGame'")
        InGameScene(:sceneParameter="sceneParameter.inGame", @loadScene="loadScene")
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
      loadScene(parameter){
        const {sceneName: sceneName, params: params} = parameter;
        this.sceneName = sceneName;
        this.sceneParameter[sceneName] = params || {};
      },
    },
    data(){
      return {
        sceneName: "title",
        sceneParameter: {
          inGame: {
            characterId: -1,
            chapterId: -1,
          }
        }
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
