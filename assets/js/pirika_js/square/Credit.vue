<template lang="pug">
  .credit
    ._back(@click="closeMenu")
    .content
      .header
        GeneralButton.back_button(
          @click="closeMenu"
          :disabled="false"
          :flashing="false"
          :width="'160px'"
          :height="'40px'"
          :color="'blue'"
          :label="'とじる'"
        )   
        .title
          | クレジット
      .body
        .index
          | BGM・効果音
        .persons
          .item
            | Tsukasa Ichimura / Audiostock
          .item
            | Hazime / Audiostock
          .item
            | 春日章宏 / Audiostock
          .item
            | Hit-Point / Audiostock
          .item
            | すもち / Audiostock
          .item
            | あおくま / Audiostock
          .item
            | ruha(Pastel Tone Music) / Audiostock
          .item
            | OtoLogic / Audiostock
          .item
            | こだまプロダクション / Audiostock
          .item
            | アァ・だり〜べあー / Audiostock
          .item
            | MATSU / Audiostock
          .item
            | 8Neat / Audiostock
          .item
            | ptest / Audiostock
          .item
            | Sound_ken / Audiostock
          .item
            | dama / Audiostock
          .item
            | Icy Light / Audiostock
        .index
          | 絵・プログラム
        .persons
          .item
            | じぃる


</template>

<script lang="typescript">
  import Vue from 'vue';
  import store from "./packs/store";
  import GeneralButton from "./GeneralButton.vue";

  export default Vue.extend({
    store,
    components: {
      GeneralButton,
    },
    methods: {
      closeMenu(){
        this.$emit("close");
      },
    },
    computed: {
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .credit{
    position: absolute;
    width: 80%;
    height: 80%;
    left: 10%;
    top: 10%;
    border: 2px solid $gray2;
    ._back{
      position: absolute;
      // 画面横幅のなにもない領域 - 20px まで当たり判定を持つ
      right: calc((#{$window-width} - 100vw + 20px)/2);
      top: -100px;
      width: 100vw;
      height: 100vh;
    }
    .content{
      position: absolute;
      background-color: $ingame-background;
      width: 100%;
      height: 100%;
      padding: $space-m;
      .header{
        height: 50px;
        display: flex;
        gap: $space-m;
        align-items: center;
        .title{
          line-height: 100%;
          font-size: $font-size-large;
        }
      }
      .body{
        width: 100%;
        .index{
          width: 100%;
          text-align: center;
          border-top: 1px solid $gray3;
        }
        .persons{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          .item{
            width: 50%;
            text-align: center;
          }
        }
      }
    }
  }
</style>
