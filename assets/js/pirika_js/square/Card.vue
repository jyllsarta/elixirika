<template lang="pug">
  .card(:id="`card-${card.id}`" :class="card.viewClass()" @mouseover="onHover")
    .number
      | {{card.stringExpression()}}
    .icon
      .normal_icon(v-if="card.category==='normal'")
        .number(:class="card.suit")
          | {{ card.number }}
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
        .number{
          font-size: 64px;
        }
        .s{
          font-family: 'Nova Square', cursive;
        }
        .h{
          font-family: 'Cinzel Decorative', cursive;
        }
        .j{
          font-family: 'Coda', cursive;
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

  /*
  font-family: 'Atomic Age', cursive;
  font-family: 'Cinzel Decorative', cursive;
  font-family: 'Coda', cursive;
  font-family: 'Cute Font', cursive;
  font-family: 'Federant', cursive;
  font-family: 'Geostar Fill', cursive;
  font-family: 'Khmer', cursive;
  font-family: 'Milonga', cursive;
  font-family: 'Nova Square', cursive;
  font-family: 'Offside', cursive;
  font-family: 'Simonetta', cursive;
  font-family: 'Voces', cursive;
   */
</style>
