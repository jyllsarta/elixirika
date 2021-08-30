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
    KeyHandler(:controller="controller")
</template>

<script lang="typescript">
    import Vue from 'vue';
    import Controller from "./packs/controller";
    import Card from "./Card.vue";
    import Position from "./Position.vue";
    import KeyHandler from "./KeyHandler.vue";
    import StarPaletteStatus from "./StarPaletteStatus.vue";
    import TitleScene from "./TitleScene.vue";

    export default Vue.extend({
    components: {
      Card,
      Position,
      KeyHandler,
      StarPaletteStatus,
      TitleScene,
    },
    props: {
      characterId: Number,
    },
    mounted(){
      this.startGame(this.characterId);
    },
    methods: {
      startGame(characterId){
        this.controller = new Controller();
        this.controller.newGame(characterId);
      },
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
  @import "stylesheets/constants";
</style>
