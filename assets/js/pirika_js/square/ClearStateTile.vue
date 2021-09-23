<template lang="pug">
  .clear_state_tile(@click="$emit('selected', {chapterId: index, characterId: character.id})")
    .flake1.flake
    .flake2.flake.cleared
    .flake3.flake
    .flake4.flake
    .flake5.flake
    .number
      | {{index}}
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      // 各キャラは CharacterMizuha みたいに個別クラスだし共通の基底があるわけでもないので縛れない
      character: Object,
      // TODO: 今後 プレイヤー進捗をpropsでもらう
      index: Number,
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .clear_state_tile{
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid $gray2;
    overflow: hidden;
    transition: transform 0.1s, filter 0.1s;
    &:hover{
      filter: brightness(130%);
      transform: scale(1.1);
    }
    .flake{
      position: absolute;
      width: 140%;
      height: 140%;
      border: 1px solid $gray1;
      background-color: $frame-background;
      box-shadow: 0px 0px 5px 2px $gray3 inset;
    }
    //ナンバー 左上の色違うやつ
    .flake1{
      background-color: $ingame-background;
      transform: translate(-77%, -50%) rotate(25deg);
      z-index: 5; 
    }
    // チャレンジ1 ←
    .flake2{
      // background-color: red;
      transform: translate(-75%, 10%) rotate(-15deg);
      z-index: 4;
    }
    // チャレンジ2 中央 地合いなので特に何もしない
    .flake3{
      // background-color: yellow;
      transform: translate(0, 0) rotate(0deg);
      z-index: 1;
    }
    // チャレンジ3 ↑
    .flake4{
      // background-color: cyan;
      transform: translate(10%, -70%) rotate(15deg);
      z-index: 2;
    }
    // チャレンジ4 →
    .flake5{
      //background-color: magenta;
      transform: translate(45%, 32%) rotate(50deg);
      z-index: 3;
    }
    .number{
      position: absolute;
      line-height: 100%;
      padding: $space-s;
      z-index: 10;
      font-size: $font-size-medium;
    }
    .cleared{
      background-color: $purple;
    }
  }
</style>
