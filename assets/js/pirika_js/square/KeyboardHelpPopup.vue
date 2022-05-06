<template lang="pug">
  transition(name="show-in")
    .window(@click="close")
      .darkness
      .body
        .front
          .title
            .text
              | キーボードそうさ
          .content
            .text
              .key
                | ⇄
              .value
                | 出すカード / カードを置く場所選択
            .text
              .key
                | ⇅
              .value
                | キャラ固有能力選択
            .text
              .key
                | z押す
              .value
                | 出すカードを決定
            .text
              .key
                | z離す
              .value
                | 今ある場所にカードを置く
            .text
              .key
                | x
              .value
                | ドロー / (デッキ切れ時)ゲーム終了
            .text
              .key
                | r
              .value
                | リセット
            .text
              .key
                | 1~4
              .value
                | キャラ固有能力選択
            .text
              .key
                | Esc
              .value
                | キャンセル

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from './packs/model';
  import store from "./packs/store";

  export default Vue.extend({
    store,
    props: {
      model: Model,
    },
    data(){
      return {};
    },
    methods: {
      close(){
        this.$store.commit("closeKeyboardHelp");
        this.$store.commit("playSound", {key: "menuClose"});
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .window {
    position: absolute;
    width: $window-width;
    height: $window-height;
    display: flex;
    align-items: center;
    justify-content: center;
    .body{
      position: absolute;
      background-color: $ingame-background;
      border: 2px solid $white;
      width: 700px;
      height: 350px;
      border-radius: $radius;
      &.sending{
        opacity: 0.5;
      }
      .background{
        position: absolute;
        background-size: 250px;
        background-position: bottom right;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        opacity: 0.2;
      }
      .front{
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 $space-m $space-m $space-m;
        display: flex;
        flex-direction: column;
        .title{
          width: 100%;
          border-bottom: 2px solid $white;
          padding-left: $space-m;
          margin-bottom: $space-m;
          display: flex;
          justify-content: left;
          align-items: flex-end;
          gap: $space-ll;
          .text{
            font-size: $font-size-large;
          }
        }
        .content{
          display: flex;
          align-items: space-around;
          flex-wrap: wrap;
          flex-grow: 1;
          width: 100%;
          .text{
            width: 50%;
            display: flex;
            gap: $space-m;
            .key{
              color: $yellow1;
              padding-left: $space-m;
              width: 20%;
            }
          }
        }
      }
    }
    .show-in-enter-active {
      transition: all .6s;
    }
    .show-in-leave-active {
      transition: all .6s;
    }
    .show-in-enter{
      transform: translateY(10px);
      opacity: 0;
    }
    .show-in-leave-to{
      transform: translateY(-50px) scale(0);
      opacity: 0;
    }
  }
</style>
