<template lang="pug">
  .card(:id="`card-${card.id}`" :class="card.viewClass()" @mouseover="onHover")
    .number
      | {{card.stringExpression()}}
    .icon
      .normal_icon(v-if="card.category==='normal'")
        .big_symbol(v-for="x in new Array(cardBigSymbolCount)")
          .inner_cube
          .slash
        .small_symbol(v-for="x in new Array(cardSmallSymbolCount)")
      .sender_icon(v-if="card.category==='sender'")
        | ↑
      .special_icon(v-if="card.category==='special'")
        | ★

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
      cardBigSymbolCount(){
        return Math.floor(this.card.number / 5);
      },
      cardSmallSymbolCount(){
        return this.card.number % 5;
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .card{
    width: 100%;
    max-width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: $space-m;
    height: 140px;
    .number{
      color: $white;
      font-size: $font-size-medium;
      line-height: 100%;
    }
    .icon{
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      .normal_icon{
        width: 120px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: $space_m;
        .big_symbol{
          width: 50px;
          height: 50px;
          position: relative;
          .inner_cube{
            position: absolute;
            border: 10px solid $white;
            width: 50px;
            height: 50px;
            transform: scale(0.707) rotate(45deg);
            border-radius: 4px;
          }
          .slash{
            position: absolute;
            left: 22px;
            width: 8px;
            height: 50px;
            transform: rotate(45deg);
            background-color: $white;
            border-radius: 4px;
          }
        }
        .small_symbol{
          width: 8px;
          height: 40px;
          background-color: $white;
          border-radius: 4px;
        }
      }
      .sender_icon{
        font-size: 64px;
        text-align: center;
      }
      .special_icon{
        font-size: 64px;
        text-align: center;
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
      border: 3px solid $red1;
      background-color: $red3;
    }
    &.s{
      border: 3px solid $blue1;
      background-color: $blue3;
    }
    &.j{
      border: 3px solid $purple1;
      background-color: $purple3;
    }
    &.special{
      border: 3px solid $yellow1;
      background-color: $yellow3;
    }
  }
</style>
