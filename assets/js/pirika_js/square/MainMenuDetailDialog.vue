<template lang="pug">
  .menu_detail_dialog
    .back(@click="$emit('cancel')")
    .dialog
      .tile
        ClearStateTile(:character="character", :chapter="chapter", :challenge-clear-state="challengeClearState")
      .dialog_background
        .sheet(:style="{backgroundImage: `url(/images/square/characters/${character.imageName}.png`}")
        .shadow
        .sheet2(:style="{backgroundImage: `url(/images/square/characters/${character.imageName}.png`}")
      .chapter_title
        | {{chapter.title}}
      .chapter_description
        | {{chapter.description}}
      .texts
        .extra_info
          .title
            | 特殊効果
          .description
            | {{chapter.extra_effect_description}}
        .challenge_info
          .challenges
            .title
              | チャレンジ
            ChallengeText(v-for="challenge, index in challenges" :is-cleared="isCleared(challenge.id)", :index="index", :challenge="challenge" :key="index")

      .chapter_name
        | {{character.name}} - {{["", "I","II","III","IV"][chapter.index]}}
      .start(@click="$emit('start')")
        .background
        .text
          | スタート
        .high_score
          | ハイスコア：{{highScore}}
        
</template>

<script lang="typescript">
  import Vue from 'vue';
  import ClearStateTile from "./ClearStateTile.vue";
  import ChallengeText from "./ChallengeText.vue";

  export default Vue.extend({
    props: {
      // 各キャラは CharacterMizuha みたいに個別クラスだし共通の基底があるわけでもないので縛れない
      character: Object,
      chapter: Object,
      challengeClearState: Array,
      challengeMaster: Object,
      highScore: Number,
    },
    components: {
      ClearStateTile,
      ChallengeText,
    },
    computed: {
      challenges(){
        return this.challengeMaster.getByChallengeIds(this.chapter.challenge_ids);
      }
    },
    methods: {
      challenge(challengeId){
        return this.challengeMaster.idTable[challengeId] || {};
      },
      isCleared(challengeId){
        return this.challengeClearState.some(x=>x===challengeId);
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .menu_detail_dialog{
    .back{
      position: absolute;
      top: -100px;
      left: calc((100% - 100vw) / 2);
      width: 100vw;
      height: calc(100vh - 100px);
    }
    .dialog{
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
          border-bottom: 1px solid $gray2;
          .description {
            white-space: pre-wrap;
          }
        }
        .challenge_info{
          border-bottom: 1px solid $gray2;
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
              &.cleared{
                color: $purple2;
              }
              &.not_cleared{
                opacity: $disabled-opacity;
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
          background-color: $purple3;
          transform: translate(100px, -20px) rotate(40deg) scale(1, 2) rotate(45deg);
          transition: transform 0.2s, background-color 0.2s;
          &:hover{
            background-color: $purple2;
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
          color: $purple1;
          pointer-events: none;
        }
        .high_score{
          position: absolute;
          bottom: $space-m;
          right: 0;
          width: 200px;
          text-align: center;
          color: $purple1;
          pointer-events: none;
        }
      }
    }
  }
</style>
