<template lang="pug">
  #app
    h1
      | すくえあ！
    .field(v-if="model")
      Card(v-for="card in model.deck.cards", :number="card.number", :suit="card.suit", :key="card.id")
        

</template>

<script lang="typescript">
    import Vue from 'vue';
    import Initiator from "./packs/initiator";
    import Model from "./packs/model";
    import Card from "./Card.vue";

    export default Vue.extend({
    components: {
      Card,
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
  h1 {
    background-color: aquamarine;
  }
</style>
