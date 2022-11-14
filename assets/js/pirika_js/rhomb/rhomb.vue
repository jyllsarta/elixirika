<template lang="pug">
  .__frame
    #app
      .game
        .title(v-if="sceneName == 'title'")
          TitleScene(:sceneParameter="sceneParameter.title", @loadScene="loadScene")
        .main_menu(v-if="sceneName == 'mainMenu'")
          MainMenuScene(:sceneParameter="sceneParameter.mainMenu", @loadScene="loadScene")
        .in_game(v-if="sceneName == 'inGame'")
          InGameScene(:sceneParameter="sceneParameter.inGame", @loadScene="loadScene")
        GlobalSoundManager
</template>

<script lang="javascript">
    import Vue from 'vue';
    import TitleScene from "./TitleScene.vue";
    import MainMenuScene from "./MainMenuScene.vue";
    import InGameScene from "./InGameScene.vue";
    import GlobalSoundManager from "./GlobalSoundManager.vue";
    import store from "./packs/store";

    export default Vue.extend({
      components: {
        TitleScene,
        MainMenuScene,
        InGameScene,
        GlobalSoundManager
      },
      methods: {
        loadScene(parameter){
          const {sceneName: sceneName, params: params} = parameter;
          this.sceneName = sceneName;
          this.sceneParameter[sceneName] = params || {};
        },
      },
      store,
      computed: {
      },
      data(){
        const defaultScene = "title";

        return {
          sceneName: defaultScene,
          sceneParameter: {
            title: {
            },
            mainMenu: {
            },
            inGame: {
            },
          }
        };
      },
    });
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

  body{
    background-color: $frame-background;
    color: $white;
    user-select: none;
  }

  .__frame{
    padding-top: 20px;
    padding-bottom: 100px;
    padding-left: 100px;
    padding-right: 100px;
    transition: background-color 1s;
    #app {
      .game{
        background-color: $frame-background;
        position: relative;
        width: $window-width;
        height: $window-height;
        min-width: $window-width;
        margin: auto;
        .play_guide{
          position: absolute;
          top: 0;
          left: 0;
          z-index: 5000;
        }
        .message{
          position: absolute;
          width: 80%;
          height: 80%;
          left: 10%;
          top: 10%;
          z-index: 5001;
        }
      }
      ::selection{
        background: none;
      }
    }
  }
</style>
