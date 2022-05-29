<template lang="pug">
  .banner
    .base
      img.sheet(:style="{backgroundImage: `url(/images/square/characters/${characterId}-1.png`}")
      .shadow
      .content
        .title
          | {{characterName}}
        .body
          .rank(v-for="rank, index in filledRanking")
            .index
              | {{index + 1}}
            .name
              | {{rank.name}}
            .score
              | {{rank.score}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import store from "./packs/store";

  export default Vue.extend({
    store,
    props: {
      characterId: Number,
      characterName: String,
      rankingContent: Array,
    },
    computed: {
      filledRanking(){
        const base = {
          name: "ななしろこ",
          score: 0
        }
        return this.rankingContent.concat(Array.from({length: 10 - this.rankingContent.length}, () => base));
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .banner{
    .base{
      position: relative;
      width: 550px;
      height: 100%;
      transition: all 0.1s;
      .sheet{
        transition: all 0.1s;
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: 300px;
        background-position: right, 120px 45%;
        background-repeat: no-repeat;
      }
      .shadow{
        position: absolute;
        width: 100%;
        height: 100%;
        // TODO: もしかするとキャラ固有色みたいなものをグラデーションに指定するときれいかも
        background: linear-gradient(to right, $ingame-background 5%, transparent 200%);        
      }
      .content{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        &::-webkit-scrollbar{
          width: 10px;
        }
        &::-webkit-scrollbar-track{
          background: transparent;
          border: none;
          border-radius: $radius;
          box-shadow: inset 0 0 2px rgb(20, 20, 20);
        }
        &::-webkit-scrollbar-thumb{
          background: $ingame_background;
          border-radius: $radius;
          box-shadow: none;
        }
        .title{
          width: 100%;
          text-align: center;
          font-size: $font-size-medium;
          padding: $space-s;
        }
        .body{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .rank{
            display: flex;
            .index{
              text-align: center;
              width: 25%;
            }
            .name{
              width: 50%;
            }
            .score{
              text-align: right;
              width: 20%;
              padding-right: $space-ll;
            }
          }
        }
      }
    }
  }
</style>
