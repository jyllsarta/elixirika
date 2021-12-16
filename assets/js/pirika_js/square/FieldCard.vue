<template lang="pug">
  .card(:class="card.viewClass() + last")
    .background
      .line_ur(v-for="(x, index) in rightLineCount" :class="card.suit", :style="{left: (index + 2.5) * 10 + 'px'}")
      .line_ul(v-for="(x, index) in leftLineCount" :class="card.suit", :style="{right: (index + 2.5) * 10 + 'px'}")
    .front
      .number
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
      },
      rightLineCount(){
        if(this.card.category !== 'normal'){
          return 8;
        }
        return Math.ceil(this.card.number / 2);
      },
      leftLineCount(){
        if(this.card.category !== 'normal'){
          return 8;
        }
        return Math.floor(this.card.number / 2);
      },
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .card{
    position: relative;
    width: 100%;
    border-radius: $radius;
    border: 2px solid $main-color;
    pointer-events: none;
    height: 20px;
    .front{
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }    
    &.last{
      font-weight: bold;
      font-size: $font-size-medium;
      height: 40px;
    }
    .background{
      position: absolute;
      overflow: hidden;
      height: 100%;
      width: 100%;
      .line_ur{
        position: absolute;
        width: 1px;
        height: 200px;
        top: 0;
        left: 5px;
        transform: rotate(-10deg);
      }
      .line_ul{
        position: absolute;
        width: 1px;
        height: 200px;
        top: 0;
        right: 5px;
        transform: rotate(10deg);
      }
      .h{
        background-color: $red1;
      }
      .s{
        background-color: $blue1;
      }
      .j{
        background-color: $purple1;
      }
      .X{
        background-color: $yellow1;
      }
    }
    &.h{
      border: 2px solid $red1;
      background-color: $red3;
    }
    &.s{
      border: 2px solid $blue1;
      background-color: $blue3;
    }
    &.j{
      border: 2px solid $purple1;
      background-color: $purple3;
    }
    &.special{
      border: 2px solid $yellow1;
      background-color: $yellow3;
    }
  }
</style>
