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
        | BGM・効果音
        | Tsukasa Ichimura / Audiostock
        | Hazime / Audiostock
        | 春日章宏 / Audiostock
        | Hit-Point / Audiostock
        | すもち / Audiostock
        | あおくま / Audiostock
        | ruha(Pastel Tone Music) / Audiostock
        | OtoLogic / Audiostock
        | こだまプロダクション / Audiostock
        | アァ・だり〜べあー / Audiostock
        | MATSU / Audiostock
        | 8Neat / Audiostock
        | ptest / Audiostock
        | Sound_ken / Audiostock
        | 
        | 絵・プログラム
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
      .header{
        height: 80px;
        display: flex;
        gap: $space-m;
        align-items: center;
        .title{
          line-height: 100%;
          font-size: $font-size-large;
        }
      }
      .body{
        white-space: pre-wrap;
        width: 100%;
        text-align: center;
      }
    }
  }
</style>
