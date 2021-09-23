<template lang="pug">
  .game(v-if="model")
    .support_character.object
      SupportCharacter(:characterId="characterId")
    .star_palette.object
      StarPalette(:starPalette="model.starPalette")
    .support_character_message.object
      SupportCharacterMessage(:characterId="characterId")
    .center_board.object
      CenterBoard(:board="model.board")
    .hand.object
      Hand(:hand="model.hand" @guiEvent="onGuiEvent")
    .black_board.object
      BlackBoard
    .card_game_panel.object
      CardGamePanel(:controller="controller")
    KeyHandler(:controller="controller")
    GuiHandler(:controller="controller" @initiate="registerGuiHandler")
</template>

<script lang="typescript">
    import Vue from 'vue';
    import SupportCharacter from "./SupportCharacter.vue"
    import StarPalette from "./StarPalette.vue"
    import SupportCharacterMessage from "./SupportCharacterMessage.vue"
    import CenterBoard from "./CenterBoard.vue"
    import Hand from "./Hand.vue"
    import BlackBoard from "./BlackBoard.vue"
    import CardGamePanel from "./CardGamePanel.vue"
    import Controller from "./packs/controller"
    import KeyHandler from "./KeyHandler.vue"
    import GuiHandler from "./GuiHandler.vue"

    export default Vue.extend({
    components: {
      SupportCharacter,
      StarPalette,
      SupportCharacterMessage,
      CenterBoard,
      Hand,
      BlackBoard,
      CardGamePanel,
      KeyHandler,
      GuiHandler,
    },
    props: {
      sceneParameter: Object,
    },
    mounted(){
      this.controller = new Controller();
      this.controller.newGame(this.characterId);
    },
    methods: {
      endGame(){
        this.$emit("loadScene", {sceneName: "title"});
      },
      registerGuiHandler(guiHandler){
        this.guiHandler = guiHandler;
      },
      onGuiEvent(args){
        console.log(args)
        this.guiHandler[args.type](args);
      },
    },
    data(){
      return {
        controller: null,
        guiHandler: null,
      };
    },
    computed: {
      model(){
        return this.controller?.model;
      },
      characterId(){
         return this.sceneParameter.characterId;
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  * {
    outline: 1px solid #d8d08b;
  }
  .game{
    width: 100%;
    height: 100%;
    color: $white;
    background-color: $ingame-background;
    position: relative;
    .object{
      position: absolute;
    }
    .support_character{
      top: 100px;
      left: 0px;
    }
    .star_palette{
      top: 0px;
      left: 0px;
    }
    .support_character_message{
      top: 100px;
      left: 20px;
    }
    .center_board{
      top: 80px;
      left: 200px;
    }
    .hand{
      bottom: 0px;
      left: 150px;
    }
    .black_board{
      top: 100px;
      right: 0px;
    }
    .card_game_panel{
      top: 400px;
      right: 0px;
    }
  }
</style>
