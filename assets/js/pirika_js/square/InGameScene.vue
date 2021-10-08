<template lang="pug">
  .game(v-if="model")
    .support_character.object
      SupportCharacter(:character="model.character")
    .star_palette.object
      StarPalette(:starPalette="model.starPalette")
    .support_character_message.object
      SupportCharacterMessage(:character="model.character")
    .center_board.object
      CenterBoard(:board="model.board")
    .staged_field.object
      StagedField(:stagedField="model.stagedField", :model="model")
    .hand.object
      Hand(:hand="model.hand" @guiEvent="onGuiEvent")
    .black_board.object
      BlackBoard(:score="controller.model.starPalette.score()")
    .card_game_panel.object
      CardGamePanel(:model="model" @guiEvent="onGuiEvent")
    .game_end_popup.object
      GameEndPopup(:model="model" @guiEvent="onGuiEvent")
    KeyHandler(:controller="controller")
    GuiHandler(:controller="controller" @initiate="registerGuiHandler"  @loadScene="loadScene")
</template>

<script lang="typescript">
    import Vue from 'vue';
    import SupportCharacter from "./SupportCharacter.vue"
    import StarPalette from "./StarPalette.vue"
    import SupportCharacterMessage from "./SupportCharacterMessage.vue"
    import CenterBoard from "./CenterBoard.vue"
    import StagedField from "./StagedField.vue"
    import Hand from "./Hand.vue"
    import BlackBoard from "./BlackBoard.vue"
    import CardGamePanel from "./CardGamePanel.vue"
    import GameEndPopup from "./GameEndPopup.vue"
    import Controller from "./packs/controller"
    import KeyHandler from "./KeyHandler.vue"
    import GuiHandler from "./GuiHandler.vue"

    export default Vue.extend({
    components: {
      SupportCharacter,
      StarPalette,
      SupportCharacterMessage,
      CenterBoard,
      StagedField,
      Hand,
      BlackBoard,
      CardGamePanel,
      GameEndPopup,
      KeyHandler,
      GuiHandler,
    },
    props: {
      sceneParameter: Object,
    },
    mounted(){
      this.controller = new Controller();
      this.controller.newGame(this.characterId, this.chapterId);
    },
    methods: {
      endGame(){
        this.$emit("loadScene", {sceneName: "title"});
      },
      registerGuiHandler(guiHandler){
        this.guiHandler = guiHandler;
      },
      onGuiEvent(args){
        this.guiHandler[args.type](args);
      },
      loadScene(args){
        this.$emit("loadScene", args);
      }
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
      },
      chapterId(){
         return this.sceneParameter.chapterId;
      },
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
    .staged_field{
      bottom: 100px;
      left: calc((1200px - 160px) / 2);
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
    .game_end_popup{
      top: 200px;
      left: 300px;
    }
  }
</style>
