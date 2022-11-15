<template>
    <div class="banner">
        <div class="base"><img class="sheet" v-if="characterId !== -1" :style="{backgroundImage: `url(/images/square/characters/${characterId}-1.png`}" /><img class="sheet_total" v-if="characterId === -1" />
            <div class="shadow"></div>
            <div class="content">
                <div class="title">{{characterName}}</div>
                <div class="body">
                    <div class="rank" v-for="rank, index in filledRanking">
                        <div class="index">{{index + 1}}</div>
                        <div class="name">{{fullName(rank.name)}}</div>
                        <div class="score">{{rank.score}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="v">
  import Vue from 'vue';
  import store from "./packs/store";
  import jsSHA from 'jssha';

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
      },
    },
    methods: {
      fullName(name){
        const splitted = name.replace(/📛/g, "").split("#");
        const displayName = splitted[0];
        if (splitted.length === 1) {
            return displayName;
        }
        const target = splitted.slice(1).join("");
        const sha = new jsSHA("SHA-256", "TEXT");
        sha.update(target);
        const sliced = sha.getHash("HEX").slice(0, 8);
        return `${displayName}📛${sliced}`;
      },
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .banner{
    .base{
      position: relative;
      width: 650px;
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
      .sheet_total{
        transition: all 0.1s;
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("/images/square/characters/total.png");
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
