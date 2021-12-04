<template lang="pug">
  .card(:id="`card-${card.id}`" :class="card.viewClass()" @mouseover="onHover")
    .number
      | {{card.stringExpression()}}
    .icon
      .normal_icon(v-if="card.category==='normal'")
        img.symbol(:src="`/images/square/svg/cards/card${card.number}.svg`")
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
      line-height: 100%;
    }
    .icon{
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      .normal_icon{
        width: 80px;
        height: 80px;
        .symbol{
          width: 100%;
          height: 100%;
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
