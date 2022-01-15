<template lang="pug">
  .banner(@click="onClick")
    .base
      img.sheet(:style="{backgroundImage: `url(/images/square/characters/${character.id}-1.png`}")
      .shadow
      .name
        | {{character.name}}
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      // 各キャラは CharacterMizuha みたいに個別クラスだし共通の基底があるわけでもないので縛れない
      character: Object,
    },
    methods: {
      onClick(){
        this.$emit('selected', {characterId: this.character.id});
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .banner{
    .base{
      position: relative;
      width: 300px;
      height: 100px;
      transition: all 0.1s;
      .sheet{
        transition: all 0.1s;
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: 300px;
        background-position: 50px 35%;
        background-repeat: no-repeat;
        transform: scale(-1, 1);
      }
      .shadow{
        position: absolute;
        width: 100%;
        height: 100%;
        // TODO: もしかするとキャラ固有色みたいなものをグラデーションに指定するときれいかも
        background: linear-gradient(to left, $ingame-background 10%, transparent 120%);        
      }
      .name{
        font-size: $font-size-medium;
        position: absolute;
        bottom: 0;
        right: 0;
        padding: $space-m;
        line-height: 100%;
      }
      &:hover{
        .sheet{
          background-size: 350px;
          background-position: 50px 30%;
        }
        color: $yellow1;
      }
    }
  }
</style>
