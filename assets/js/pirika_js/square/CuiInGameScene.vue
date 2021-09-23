<template lang="pug">
  .game(v-if="model")
    StarPaletteStatus(:starPalette="model.starPalette")
    Position(v-for="field, index in model.board.fields" :field="field", :name="`Board(${index + 1})`", :nameBold="index == model.selectingBoardIndex", :key="field.id")
    hr
    Position(:field="model.hand.field", :name="'Hand'", :nameBold="false")
    hr
    Position(:field="model.deck.field", :name="'Deck'", :nameBold="false")
    Position(v-for="field in model.starPalette.fields" :field="field", :name="'StarPalette field(s)'", :key="field.id", :nameBold="false")
    Position(:field="model.graveyard.field", :name="'Grav'", :nameBold="false")
    GameEndPopup(:model="model")
    KeyHandler(:controller="controller")
    .end_game(@click="endGame")
      | ゲームをおわる
</template>

<script lang="typescript">
    // かつてあった CUI ... ていうかテキストベースでのインゲームシーンの跡地
    import Vue from 'vue';
    import Controller from "./packs/controller";
    import CUICard from "./CUICard.vue";
    import Position from "./Position.vue";
    import KeyHandler from "./KeyHandler.vue";
    import StarPaletteStatus from "./StarPaletteStatus.vue";
    import GameEndPopup from "./GameEndPopup.vue";
    import TitleScene from "./TitleScene.vue";

    export default Vue.extend({
    components: {
      CUICard,
      Position,
      KeyHandler,
      StarPaletteStatus,
      GameEndPopup,
      TitleScene,
    },
    props: {
      characterId: Number,
      chapterId: Number,
    },
    mounted(){
      this.startGame(this.characterId, this.chapterId);
    },
    methods: {
      startGame(characterId){
        this.controller = new Controller();
        this.controller.newGame(characterId, 1); //FIXME: CUIモードはチャプターをサポートしない
        this.controller.fillDraw();
        this.controller.selectHand(0);
      },
      endGame(){
        this.$emit("endGame");
      }
    },
    data(){
      return {
        controller: null,
      };
    },
    computed: {
      model(){
        return this.controller?.model;
      },
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
</style>
