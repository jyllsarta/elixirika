<template lang="pug">
  .card(:id="`card-${card.id}`" :class="card.viewClass()" @mouseover="onHover")
    .number
      | {{card.stringExpression()}}
    .icon
      .icons
        .item(v-for="i in new Array(card.number)" :class="card.viewClass()")

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
    max-width: 200px;
    background-color: $white;
    border: 1px solid $main-color;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-m;
    flex-direction: column;
    height: 140px;
    .number{
      color: $ingame-background;
      font-size: $font-size-medium;
    }
    .icon{
      width: 80%;
      .icons{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: $space-m;
        .item{
          width: $space-m;
          height: 40px;
          background-color: $ingame-background;
          &.h{
            background-color: $extra-light-purple;
          }
          &.s{
            background-color: $light-green;
          }
          &.j{
            background-color: $blue;
          }
          &.special{
            background-color: $yellow;
          }
        }
      }
    }
    &.selected{
      transition: transform 0.1s;
      transform: scale(1.2);
      transform-origin: bottom;
      border: 2px solid $white;
      font-weight: bold;
    }
    &.h{
      border: 3px solid $extra-light-purple;
    }
    &.s{
      border: 3px solid $light-green;
    }
    &.j{
      border: 3px solid $blue;
    }
    &.special{
      border: 3px solid $yellow;
    }
  }
</style>
