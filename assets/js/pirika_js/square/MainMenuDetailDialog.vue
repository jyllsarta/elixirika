<template lang="pug">
  .menu_detail_dialog
    .back(@click="close")
    .dialog
      .tile
        ClearStateTile(:character="character", :chapter="chapter", :challenge-clear-state="challengeClearState")
      .dialog_background
        .sheet(:style="{backgroundImage: `url(/images/square/characters/${character.id}-1.png`}")
        .shadow
        .sheet2(:style="{backgroundImage: `url(/images/square/characters/${character.id}-1.png`}")
      .content
        .chapter_title
          | {{character.name}}-{{["", "I","II","III","IV"][chapter.index]}} / {{chapter.title}}
        .chapter_description
          .text
            | {{chapter.description}}
        .extra_info
          .title
            | 特殊効果
          .extras
            .description
              | {{chapter.extra_effect_description}}
        .challenge_info
          .challenges
            .title
              | チャレンジ
            ChallengeText(
              v-for="challenge, index in challenges"
              :is-cleared="isCleared(challenge.id)",
              :index="index",
              :challenge="challenge",
              :key="index",
              :showDescription="true"
              :showIndex="true"
            )
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
  import store from "./packs/store";

  export default Vue.extend({
    store,
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
      },
      close(){
        this.$emit('cancel');
        this.$store.commit("playSound", {key: "miss"});
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
      height: calc(100vh + 50px);
    }
    .dialog{
      position: relative;
      width: 100%;
      height: 100%;
      background-color: $ingame-background;
      border: 1px solid $purple1;
      overflow: hidden;
      animation: in 0.2s;
      .tile{
        position: absolute;
        width: 100px;
        height: 100px;
        top: $space-m;
        left: $space-m;
        pointer-events: none;
        z-index: 1000;
        opacity: 0.7;
      }
      .dialog_background{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 500;
        .sheet{
          position: absolute;
          width: 100%;
          height: 100%;
          background-size: 500px;
          background-position: -15% 35%;
          background-repeat: no-repeat;
          animation: character-in 0.9s;
        }
        .sheet2{
          position: absolute;
          width: 100%;
          height: 100%;
          background-size: 650px;
          background-position: -50% 60%;
          background-repeat: no-repeat;
          transform: scale(-1, 1);
          animation: character-in-bg 0.9s;
          opacity: 0.08;
        }
        .shadow{
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(to left, $ingame-background 55%, transparent 88%);        
        }
      }
      .content{
        position: absolute;
        width: 480px;
        top: $space-m;
        height: calc(100% - $space-m * 2);
        right: 160px;
        display: flex;
        flex-direction: column;
        gap: $space-m;
        z-index: 800;
        .chapter_title{
          font-size: $font-size-large;
          line-height: 100%;
        }
        .chapter_description{
          border-bottom: 1px solid $gray2;
          padding-bottom: $space-s;
          white-space: pre-wrap;
        }
        .extra_info{
          flex: 1;
          border-bottom: 1px solid $gray2;
          .extras{
            height: calc(100% - $font-size-normal - $space-m * 2);
            display: flex;
            flex-direction: column;
            justify-content: center;
            .description {
              white-space: pre-wrap;
            }
          }
        }
        .challenge_info{
          flex: 1.5;
          .challenges{
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: space-around;
          }
        }
      }
      .start{
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 900;
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

    @keyframes in {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      100%{
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes character-in {
      0% {
        opacity: 0;
        transform: translate(10px, 10px);
      }
      100%{
        opacity: 1;
        transform: none;
      }
    }

    @keyframes character-in-bg {
      0% {
        transform: translate(-4px, -2px) scale(-1, 1);
      }
      100%{
        transform: scale(-1, 1);
      }
    }
  }
</style>
