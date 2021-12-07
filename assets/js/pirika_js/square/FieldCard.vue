<template lang="pug">
  .card(:class="card.viewClass() + last")
    | {{card.stringExpression()}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Card from "./packs/card"

  export default Vue.extend({
    props: {
      card: Card,
      isLast: Boolean,
    },
    computed: {
      last(){
        return this.isLast ? " last" : "";
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .card{
    box-sizing: border-box;
    width: 100%;
    @include centeringWithBorder($height: 20px, $border: 2px);
    border: 2px solid $main-color;
    pointer-events: none;
    &.h{
      border: 2px solid $red2;
    }
    &.s{
      border: 2px solid $blue2;
    }
    &.j{
      border: 2px solid $purple2;
    }
    &.special{
      border: 2px solid $yellow2;
    }
    &.last{
      font-weight: bold;
      @include centeringWithBorder($height: 40px, $border: 2px);
    }
  }
</style>
