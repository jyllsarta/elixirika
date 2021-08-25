<template lang="pug">
  #app
    h1
      | すくえあ！
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

    export default Vue.extend({
    components: {
      Card,
      Position,
      KeyHandler,
      StarPaletteStatus,
    },
    mounted(){
      this.initiate();
    },
    methods: {
      initiate(){
        this.controller = new Controller();
        this.controller.startGame();
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
      }
    }
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
