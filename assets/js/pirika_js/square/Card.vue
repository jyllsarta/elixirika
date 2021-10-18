<template lang="pug">
  .card(:id="`card-${card.id}`" :class="card.viewClass()" @mouseover="onHover")
    | {{card.stringExpression()}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Card from "./packs/card"

  export default Vue.extend({
    props: {
      card: Card,
    },
    methods: {
      onHover(){
        this.$emit("hover", this.card);
      }
    },
    computed: {
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .card{
    width: 100%;
    max-width: 160px;
    @include centering($height: 50px);
    border: 1px solid $main-color;
    font-size: $font-size-medium;
    &.selected{
      transition: transform 0.1s;
      transform: scale(1.2);
      transform-origin: bottom;
      border: 2px solid $white;
      font-weight: bold;
    }
    &.h{
      border: 1px solid $extra-light-purple;
    }
    &.s{
      border: 1px solid $light-green;
    }
    &.j{
      border: 1px solid $blue;
    }
    &.special{
      border: 1px solid $yellow;
    }
  }
</style>
