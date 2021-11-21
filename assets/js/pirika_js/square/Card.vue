<template lang="pug">
  .card(:id="`card-${card.id}`" :class="card.viewClass()" @mouseover="onHover")
    .number
      | {{card.stringExpression()}}
    .icon
      .icons(v-if="card.category==='normal'")
        .item(v-for="i in new Array(card.number)" :class="card.viewClass()")
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
            background-color: $red2;
          }
          &.s{
            background-color: $blue2;
          }
          &.j{
            background-color: $purple2;
          }
          &.special{
            background-color: $yellow2;
          }
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
