<template lang="pug">
  #app
    h1
      | すくえあ！
    p(v-for="card in model.deck.cards")
      | {{ card.number }} | {{ card.suit }}

</template>

<script lang="typescript">
    import Vue from 'vue';
    import Initiator from "./packs/initiator";
    import Model from "./packs/model";

    export default Vue.extend({
    components: {
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
</style>
