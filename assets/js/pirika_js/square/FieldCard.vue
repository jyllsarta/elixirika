<template lang="pug">
  .card
    | {{card.stringExpression()}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Card from "./packs/card"

  export default Vue.extend({
    props: {
      card: Card
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .card{
    box-sizing: border-box; // こいつの危機が怪しい
    width: 100%;
    @include centering($height: 20px);
    border: 1px solid $main-color;
  }
</style>
