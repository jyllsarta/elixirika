<template lang="pug">
  .area
    .hand
      Card(v-for="card in cards" :key="card.id", :card="card")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Card from "./Card.vue"
  import Hand from "./packs/hand"

  export default Vue.extend({
    props: {
      hand: Hand,
    },
    components: {
      Card
    },
    computed: {
      cards(){
        return this.hand.field.cards;
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 900px;
    height: 200px;
    .hand{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: $space-m;
    }
  }
</style>
