<template lang="pug">
  .menu_detail_dialog
    .tile
      ClearStateTile(:character="character", :index="chapterId")
    .dialog_background
      .sheet(:style="{backgroundImage: `url(/images/square/characters/${character.imageName}.png`}")
      .shadow
      .sheet2(:style="{backgroundImage: `url(/images/square/characters/${character.imageName}.png`}")
    .chapter_title
      | 妖精の村に案内だ！
    .chapter_description
      | はい、はじめまして。すくえあ！の遊び方を確認しつつ私ミズハの素敵な力をお見せしちゃいますね
    .texts
      .extra_info
        .title
          | 特殊効果
        .description
          | ・エネルギー逓減速度増加
          | ・エネルギーをすべて失う、もしくは最大値を超えてしまった場合即座に終了
          | ・ミズハの領域 +1
      .challenge_info
        .challenges
          .title
            | チャレンジ
          .challenge
            .icon
              | ■
            .rank
              | I
            .description
              | ポイントを200点獲得する。
          .challenge
            .icon
              | ■
            .rank
              | II
            .description
              | ポイントを600点獲得する。
          .challenge
            .icon
              | ■
            .rank
              | III
            .description
              | ゲームを最後までプレイする。
          .challenge
            .icon
              | ■
            .rank
              | IV
            .description
              | エネルギーの横溢を発生させる。
    .chapter_name
      | ミズハ - III
    .start
      .background
      .text
        | スタート
      .high_score
        | ハイスコア：8874
      
</template>

<script lang="typescript">
  import Vue from 'vue';
  import ClearStateTile from "./ClearStateTile.vue";

  export default Vue.extend({
    props: {
      // 各キャラは CharacterMizuha みたいに個別クラスだし共通の基底があるわけでもないので縛れない
      character: Object,
      chapterId: Number,
    },
    components: {
      ClearStateTile,
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .menu_detail_dialog{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: $ingame-background;
    border: 1px solid $gray1;
    overflow: hidden;
    .tile{
      position: absolute;
      width: 100px;
      height: 100px;
      top: $space-m;
      left: $space-m;
      pointer-events: none;
    }
    .chapter_title{
      position: absolute;
      width: 560px - $space-m;
      height: $font-size-large;
      top: $space-m;
      right: $space-m;
      font-size: $font-size-large;
      line-height: 100%;
    }
    .chapter_description{
      position: absolute;
      width: 560px - $space-m;
      height: $font-size-large;
      top: $space-m * 2 + $font-size-large;
      right: $space-m;
      font-size: $font-size-mini;
      line-height: 100%;
      border-bottom: 1px solid $gray2;
    }
    .dialog_background{
      position: absolute;
      width: 100%;
      height: 100%;
      .sheet{
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: 350px;
        background-position: -5% 35%;
        background-repeat: no-repeat;
        opacity: 0.8;
      }
      .sheet2{
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: 500px;
        background-position: -15% 60%;
        background-repeat: no-repeat;
        transform: scale(-1, 1);
        opacity: 0.05;
      }
      .shadow{
        position: absolute;
        width: 100%;
        height: 100%;
        // TODO: もしかするとキャラ固有色みたいなものをグラデーションに指定するときれいかも
        background: linear-gradient(to left, $ingame-background 60%, transparent 90%);        
      }
    }
    .texts{
      position: absolute;
      width: 360px;
      height: 300px;
      bottom: $font-size-xlarge + $space-m * 2;
      right: 200px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: $space-m;
      .extra_info{
        .description {
          white-space: pre-wrap;
        }
      }
      .challenge_info{
        .challenges{
          display: flex;
          flex-direction: column;
          .challenge{
            display: flex;
            gap: $space-m;
            .icon{
              width: 20px;
            }
            .rank{
              width: 30px;
              text-align: center;
            }
          }
        }
      }
    }
    .chapter_name{
      position: absolute;
      width: 500px;
      height: $font-size-xlarge; 
      bottom: $space-m;
      right: 250px;
      text-align: right;
      line-height: 100%;
      font-size: $font-size-xlarge;
    }
    .start{
      position: absolute;
      bottom: 0;
      right: 0;
      .background{
        width: 250px;
        height: 250px; 
        background-color: $purple;
        transform: translate(100px, -20px) rotate(40deg) scale(1, 2) rotate(45deg);
        transition: transform 0.2s, background-color 0.2s;
        &:hover{
          background-color: $light-purple;
          transform: translate(80px, 0px) rotate(35deg) scale(1, 2) rotate(45deg);
        }
      }
      .text{
        position: absolute;
        bottom: $font-size-normal + $space-m * 2;
        right: 0;
        width: 200px;
        text-align: center;
        font-size: $font-size-large;
        color: $extra-light-purple;
      }
      .high_score{
        position: absolute;
        bottom: $space-m;
        right: 0;
        width: 200px;
        text-align: center;
        color: $extra-light-purple;
      }
    }
  }
</style>
