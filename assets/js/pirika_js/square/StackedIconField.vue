<template lang="pug">
  .fields
    .field(v-if="emphasisTopCards")
      .card.top(v-for="card in topCards", :class="card.category !== 'normal' ? card.suit : ''")
      .card(v-for="card in notTopCards", :class="card.category !== 'normal' ? card.suit : ''")
    .field(v-if="!emphasisTopCards")
      .card(v-for="card in field.cards", :class="card.category !== 'normal' ? card.suit : ''")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Field from './packs/field';

  export default Vue.extend({
    props: {
      field: Field,
      emphasisTopCards: Boolean,
    },
    computed: {
      topCards(){
        return this.field.cards.slice(0, 4);
      },
      notTopCards(){
        return this.field.cards.slice(4, Math.inf);
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
        &.h{
          background-color: $red2;
        }
        &.s{
          background-color: $blue2;
        }
        &.X{
          background-color: $yellow1;
        }
      }
    }
  }
</style>
