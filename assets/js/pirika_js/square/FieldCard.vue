<template lang="pug">
  .card(:class="card.viewClass()")
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
    box-sizing: border-box;
    width: 100%;
    @include centering($height: 20px);
    border: 1px solid $main-color;
    pointer-events: none;
    &.h{
      border: 1px solid $red2;
    }
    &.s{
      border: 1px solid $blue2;
    }
    &.j{
      border: 1px solid $purple2;
    }
    &.special{
      border: 1px solid $yellow2;
    }
  }
</style>
