<template lang="pug">
  #app
    h1
      | すくえあ！
    .game(v-if="model")
      Position(:field="model.deck.field", :name="'Deck'")
      Position(v-for="field in model.board.fields" :field="field", :name="'Board'")
      Position(:field="model.graveyard.field", :name="'Grav'")
      Position(:field="model.hand.field", :name="'Hand'")
      Position(:field="model.selecting.field", :name="'Selecting'")
      Position(v-for="field in model.starPalette.fields" :field="field", :name="'StarPalette'")

</template>

<script lang="typescript">
    import Vue from 'vue';
    import Initiator from "./packs/initiator";
    import Model from "./packs/model";
    import Card from "./Card.vue";
    import Position from "./Position.vue";

    export default Vue.extend({
    components: {
      Card,
      Position,
    },
    mounted(){
      this.initiate();
    },
    methods: {
      initiate(){
        const initiator = new Initiator();
        this.model = initiator.getModel();
      }
    },
    data(){
      return {
        model: null,
      };
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
  body{
    margin: 0;
  }
  h1 {
    font-size: 30px;
  }
</style>
