<template lang="pug">
  .field
    .card(v-for="card in field.cards", :class="card.category !== 'normal' ? card.suit : ''")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Field from './packs/field';

  export default Vue.extend({
    props: {
      field: Field
    },
    methods: {
    }
  })
</script>

<style lang="scss" scoped>
  @import "stylesheets/global_settings";
  .field{
    width: 100%;
    display: flex;
    gap: $space-s;
    flex-wrap: wrap;
    padding: $space-m;
    .card{
      background-color: $white;
      width: $space-s;
      height: 20px;
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
</style>
