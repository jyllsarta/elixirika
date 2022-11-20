<template>
    <div class="game" v-if="model">
        <div class="background">
            <div class="color" :style="styleBackground"></div>
            <div class="image" :style="styleBackgroundImage"></div>
        </div>
        <div class="center_board object">
            <CenterBoard :board="model.board" :model="model" @guiEvent="onGuiEvent"></CenterBoard>
        </div>
        <div class="support_character object">
            <SupportCharacter :model="model" :gameStarted="gameStarted" @guiEvent="onGuiEvent"></SupportCharacter>
        </div>
        <div class="support_character_message object">
            <SupportCharacterMessage :model="model" :gameStarted="gameStarted"></SupportCharacterMessage>
        </div>
        <div class="support_character_ability object">
            <SupportCharacterAbilityBase :model="model" :character="model.character" @guiEvent="onGuiEvent"></SupportCharacterAbilityBase>
        </div>
        <div class="staged_field object">
            <StagedField :stagedField="model.stagedField" :model="model"></StagedField>
        </div>
        <div class="star_palette object">
            <StarPalette :model="model"></StarPalette>
        </div>
        <div class="hand object">
            <Hand :hand="model.hand" @guiEvent="onGuiEvent" :model="model"></Hand>
        </div>
        <div class="black_board object">
            <BlackBoard :model="model"></BlackBoard>
        </div>
        <div class="card_game_panel object">
            <CardGamePanel :model="model" @guiEvent="onGuiEvent"></CardGamePanel>
        </div>
        <div class="star_palette_effect object">
            <StarPaletteEffect :model="model"></StarPaletteEffect>
        </div>
        <div class="in_game_menu object">
            <InGameMenu @guiEvent="onGuiEvent" :model="model"></InGameMenu>
        </div>
        <div class="game_end_popup object">
            <GameEndPopup :model="model" @guiEvent="onGuiEvent" v-if="isStalemate"></GameEndPopup>
        </div>
        <div class="challenge_clear_popup object">
            <ChallengeClearPopup :model="model"></ChallengeClearPopup>
        </div>
        <div class="keyboard_help_popup object">
            <KeyboardHelpPopup v-if="$store.state.showsKeyboardHelp"></KeyboardHelpPopup>
        </div>
        <div class="game_start_popup object">
            <GameStartPopup :model="model" @startGame="startGame" :gameStarted="gameStarted"></GameStartPopup>
        </div>
        <KeyHandler :controller="controller"></KeyHandler>
        <GuiHandler :controller="controller" @initiate="registerGuiHandler" @loadScene="loadScene"></GuiHandler>
        <InGameSoundManager :model="model"></InGameSoundManager>
    </div>
</template>

<script>
    
    import SupportCharacter from "./SupportCharacter.vue"
    import StarPalette from "./StarPalette.vue"
    import SupportCharacterMessage from "./SupportCharacterMessage.vue"
    import SupportCharacterAbilityBase from "./SupportCharacterAbilityBase.vue"
    import CenterBoard from "./CenterBoard.vue"
    import StagedField from "./StagedField.vue"
    import Hand from "./Hand.vue"
    import BlackBoard from "./BlackBoard.vue"
    import CardGamePanel from "./CardGamePanel.vue"
    import StarPaletteEffect from "./StarPaletteEffect.vue"
    import InGameMenu from "./InGameMenu.vue"
    import GameEndPopup from "./GameEndPopup.vue"
    import GameStartPopup from "./GameStartPopup.vue"
    import ChallengeClearPopup from "./ChallengeClearPopup.vue"
    import KeyboardHelpPopup from "./KeyboardHelpPopup.vue"
    import Controller from "./packs/controller"
    import KeyHandler from "./KeyHandler.vue"
    import GuiHandler from "./GuiHandler.vue"
    import InGameSoundManager from "./InGameSoundManager.vue"
    import store from "./packs/store"

    export default({
    store,
    components: {
      SupportCharacter,
      StarPalette,
      SupportCharacterMessage,
      SupportCharacterAbilityBase,
      CenterBoard,
      StagedField,
      Hand,
      BlackBoard,
      CardGamePanel,
      StarPaletteEffect,
      InGameMenu,
      GameEndPopup,
      GameStartPopup,
      ChallengeClearPopup,
      KeyboardHelpPopup,
      KeyHandler,
      GuiHandler,
      InGameSoundManager,
    },
    props: {
      sceneParameter: Object,
    },
    mounted(){
      this.controller = new Controller();
      this.controller.newGame(this.characterId, this.chapterId);
      this.$store.commit("updateBg", this.characterId);
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
      },
      startGame(){
        this.gameStarted = true;
      },
    },
    data(){
      return {
        controller: null,
        guiHandler: null,
        gameStarted: false,
      };
    },
    computed: {
      model(){
        return this.controller?.model;
      },
      isStalemate(){
        return this.model?.isStalemate();
      },
      characterId(){
         return this.sceneParameter.characterId;
      },
      chapterId(){
         return this.sceneParameter.chapterId;
      },
      styleBackgroundImage(){
        return {
          backgroundImage: `url(/images/square/svg/symbol_character${this.model.characterId}_small.svg`,
        };
      },
      styleBackground(){
        return {
          "background-color": `var(--bg3-${this.model.characterId})`,
        };
      },
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .game{
    width: 100%;
    height: 100%;
    color: $white;
    position: relative;
    overflow: hidden;
    .background{
      width: 100%;
      height: 100%;
      position: absolute;
      .color{
        width: 100%;
        height: 100%;
        position: absolute;
      }
      .image{
        width: 100%;
        height: 100%;
        position: absolute;
        background-size: 100px;
        opacity: 0.1;
      }
    }
    .object{
      position: absolute;
    }
    .support_character{
      height: 90%;
      bottom: -20px;
      left: 280px;
    }
    .star_palette{
      top: 0px;
      left: 0px;
    }
    .support_character_message{
      top: 110px;
      left: $space-m;
      pointer-events: none;
    }
    .support_character_ability{
      bottom: $space-m;
      left: $space-m;
    }
    .center_board{
      height: 100%;
      top: 20%;
      left: 200px;
    }
    .staged_field{
      bottom: 100px;
      left: calc((1200px - 160px) / 2);
    }
    .hand{
      bottom: 0px;
      left: 180px;
    }
    .black_board{
      height: 100%;
      top: unquote('max(100px, 20%)');
      right: $space-m;
      pointer-events: none;
    }
    .card_game_panel{
      bottom: $space-m;
      right: $space-m;
    }
    .star_palette_effect{
      top: 50px;
      left: calc((1200px - 200px) / 2);
    }
    .in_game_menu{
      top: $space-m;
      left: $space-m;
    }
    .game_end_popup{
      top: 0;
      left: 0;
    }
    .keyboard_help_popup{
      top: 0;
      left: 0;
    }
    .challenge_clear_popup{
      top: 50%;
      left: 0;
      pointer-events: none;
    }
    .game_start_popup{
      top: 0;
      left: 0;
    }
  }
</style>
