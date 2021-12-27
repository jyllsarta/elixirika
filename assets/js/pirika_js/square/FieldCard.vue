<template lang="pug">
  .card(:class="card.viewClass() + last + compressed" :style="colorSchemedStyleBackground")
    .background
      .line_ur(v-for="(x, index) in rightLineCount" :class="card.suit", :style="{left: (index + 2.5) * 10 + 'px', backgroundColor: `var(--color-${card.suit}1-${characterId})` }")
      .line_ul(v-for="(x, index) in leftLineCount" :class="card.suit", :style="{right: (index + 2.5) * 10 + 'px', backgroundColor: `var(--color-${card.suit}1-${characterId})` }")
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
      isCompressed: Boolean,
      characterId: Number,
    },
    computed: {
      last(){
        return this.isLast ? " last" : "";
      },
      compressed(){
        return this.isCompressed ? " compressed" : "";
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
      colorSchemedStyleBackground(){
        return {
          backgroundColor: `var(--color-${this.card.suit}3-${this.characterId})`,
          border: `3px solid var(--color-${this.card.suit}1-${this.characterId})`,
        };
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
    &.compressed{
      font-size: 0;
      line-height: 0;
      height: 4px;
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
    }
  }
</style>
