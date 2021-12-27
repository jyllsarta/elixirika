<template lang="pug">
  .card(
    :id="`card-${card.id}`"
    :class="card.viewClass()"
    @mouseover="onHover"
    :style="colorSchemedStyleBackground"
  )
    .background
      .line_ur(
        v-for="(x, index) in rightLineCount"
        :class="card.suit",
        :style="{left: (index + 1) * 10 + 'px', backgroundColor: `var(--color-${card.suit}1-${characterId})`}"
      )
      .line_ul(v-for="(x, index) in leftLineCount" :class="card.suit", :style="{right: (index + 1) * 10 + 'px', backgroundColor: `var(--color-${card.suit}1-${characterId})`}")
    .icon
      .normal_icon(v-if="card.category==='normal'")
        .number(:class="card.suit")
          | {{ card.number }}
      .sender_icon(v-if="card.category==='sender'")
        .icon
          .upper_symbol
            .inner_cone
          .downer_symbol
            .inner_cone
      .special_icon(v-if="card.category==='special'")
        .big_symbol
          .inner_cube

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Card from "./packs/card"

  export default Vue.extend({
    props: {
      card: Card,
      characterId: Number,
    },
    methods: {
      onHover(){
        this.$emit("hover", this.card);
      }
    },
    computed: {
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
    height: 140px;
    width: 100%;
    max-width: 200px;
    position: relative;
    border-radius: $radius;
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
    .icon{
      width: 100%;
      height: 100%;
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
        // この辺カラースキーム対応してもいいけど割と違和感ないのでそのままで
        .s{
          font-family: 'Nova Square', cursive;
          text-shadow: 0px 0px 4px $blue1;
        }
        .h{
          font-family: 'Cinzel Decorative', cursive;
          text-shadow: 0px 0px 4px $red1;
        }
        .j{
          font-family: 'Coda', cursive;
          text-shadow: 0px 0px 4px $purple1;
        }
        .x{
          // Xでは文字描写はない想定
          font-family: 'Nova Square', cursive;
          text-shadow: 0px 0px 4px $yellow1;
        }
      }
      .sender_icon{
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon{
          width: 80px;
          height: 80px;
          position: absolute;
          .upper_symbol{
            width: 80px;
            height: 80px;
            position: absolute;
            top: 0px;
          }
          .downer_symbol{
            width: 80px;
            height: 80px;
            position: absolute;
            top: 20px;
          }
          .inner_cone{
            position: absolute;
            border-top: 10px solid $white;
            border-left: 10px solid $white;
            width: 80px;
            height: 80px;
            transform: scale(0.707) rotate(45deg);
            border-radius: 4px;
          }
        }
      }
      .special_icon{
        .big_symbol{
          width: 80px;
          height: 80px;
          position: relative;
          .inner_cube{
            position: absolute;
            border: 10px solid $white;
            width: 80px;
            height: 80px;
            transform: scale(0.707) rotate(45deg);
            border-radius: 4px;
          }
        }
      }
    }
    &.selected{
      transition: transform 0.2s;
      transform: rotate(5deg) translateY(-20px);
      transform-origin: bottom;
      border: 2px solid $white;
    }
  }
</style>
