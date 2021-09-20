<template lang="pug">
  .card(:id="`card-${card.id}`")
    | {{card.stringExpression()}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Card from "./packs/card"

  export default Vue.extend({
    props: {
      card: Card,
    },
    computed: {
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .card{
    width: 100%;
    @include centering($height: 50px);
    border: 1px solid $main-color;
    &:hover{
      transition: transform 0.15s;
      transform: scale(1.3);
      transform-origin: bottom;
    }
  }
</style>
