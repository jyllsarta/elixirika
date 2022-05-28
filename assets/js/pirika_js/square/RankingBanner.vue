<template lang="pug">
  .banner
    .base
      img.sheet(:style="{backgroundImage: `url(/images/square/characters/${characterId}-1.png`}")
      .shadow
      .content
        .name
          | {{characterName}}
        .body
          .rank(v-for="x in [1,2,3,4,5,6,7,8,9,10]")
            .index
              | {{x}}
            .name
              | hoihoi@1231231
            .score
              | 9999
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
    methods: {
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
        overflow-y: scroll;
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
        .rank{
          display: flex;
          .index{
            width: 10%;
          }
          .name{
            width: 60%;
          }
          .score{
            width: 30%;
          }
        }
      }
      &:hover{
        .sheet{
          background-size: 310px;
          background-position: right, 20px 44%;
        }
      }
    }
  }
</style>
