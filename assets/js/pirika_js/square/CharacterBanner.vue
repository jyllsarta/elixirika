<template lang="pug">
  .banner(@click="onClick" @mouseenter="onHover")
    .base
      img.sheet(:style="{backgroundImage: `url(/images/square/characters/${character.id}-1.png`}")
      .shadow
      .names
        .name
          | {{character.name}}
        .next
          | NEXT: {{bestChapterIndex}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import store from "./packs/store";

  export default Vue.extend({
    store,
    props: {
      // 各キャラは CharacterMizuha みたいに個別クラスだし共通の基底があるわけでもないので縛れない
      character: Object,
      bestChapter: Object,
    },
    computed: {
      bestChapterIndex(){
        return this.bestChapter?.index || "-";
      }
    },
    methods: {
      onClick(){
        this.$store.commit("playSound", {key: "ok"});
        this.$emit('selected', {characterId: this.character.id});
      },
      onHover(){
        this.$store.commit("playSound", {key: "hover"});
      },
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
      border-left: 1px solid $purple1;
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
        background: linear-gradient(to left, $ingame-background 5%, transparent 80%);        
      }
      .names{
        position: absolute;
        bottom: 0;
        right: 0;
        padding: $space-m;
        .name{
          font-size: $font-size-medium;
          line-height: 100%;
        }
        .next{
          transition: font-size 0.1s;
          font-size: 0;
          line-height: 100%;
        }
      }
      &:hover{
        .sheet{
          background-size: 350px;
          background-position: 50px 30%;
        }
        color: $yellow1;
        .names{
          position: absolute;
          bottom: 0;
          right: 0;
          padding: $space-m;
          .name{
            font-size: $font-size-medium;
            line-height: 100%;
          }
          .next{
            transition: font-size 0.1s;
            font-size: $font-size-medium;
            line-height: 100%;
          }
        }
      }
    }
  }
</style>
