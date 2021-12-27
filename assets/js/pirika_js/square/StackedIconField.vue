<template lang="pug">
  .fields
    .field(v-if="emphasisTopCards")
      .card.top(v-for="card in topCards", :style="colorSchemedStyle(card)")
      .card(v-for="card in notTopCards", :style="colorSchemedStyle(card)")
    .field(v-if="!emphasisTopCards")
      .card(v-for="card in field.cards", :style="colorSchemedStyle(card)")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Field from './packs/field';

  export default Vue.extend({
    props: {
      field: Field,
      emphasisTopCards: Boolean,
      characterId: Number,
    },
    computed: {
      topCards(){
        return this.field.cards.slice(0, 4);
      },
      notTopCards(){
        return this.field.cards.slice(4, Math.inf);
      },
    },
    methods: {
      colorSchemedStyle(card){
        if(card.category === 'normal'){
          return {
            opacity: 0.8,
          }
        }
        return {
          backgroundColor: `var(--color-${card.suit}2-${this.characterId})`
        };
      },
    }
  })
</script>

<style lang="scss" scoped>
  @import "stylesheets/global_settings";
  .fields{
    width: 100%;
    height: 100%;
    .field{
      width: 100%;
      display: flex;
      gap: $space-s;
      flex-wrap: wrap;
      align-items: center;
      padding: $space-m;
      .card{
        background-color: $white;
        width: $space-s;
        height: 20px;
        border-radius: $radius;
        &.top{
          width: $space-s;
          height: 25px;
        }
      }
    }
  }
</style>
