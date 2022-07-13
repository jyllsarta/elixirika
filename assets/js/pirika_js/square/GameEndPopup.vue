<template lang="pug">
  .game_end(@click="endGame")
    .darkness
    .body(:class="{sending: sending}")
      .background(:style="{backgroundImage: `url(/images/square/characters/${model.characterId}-1.png`}")
      .front
        .title
          .text
            | 今回の結果
          .reason
            | {{model.forceStalemateReason}}
        .content
          .scores
            .score.normal
              .label
                | スコア
              .value
                | {{model.score}}
            .score.rest
              .label
                | 残札ボーナス
              .value.lastcardbonus
                | {{restCardBonus}}
          .challenges
            ChallengeText(
              v-for="challenge, index in challenges"
              :is-cleared="isCleared(challenge.id)",
              :index="index",
              :challenge="challenge",
              :key="index",
              :showDescription="true"
              :showIndex="true"
              :class="`challenge-${index + 1}`"
            )
          .message_area
            transition(name="show-in")
              .click_to_send(v-if="!isMarginTime")
                | クリックすると結果を登録してメニューに戻ります
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from './packs/model';
  import ChallengeText from "./ChallengeText.vue";
  import store from "./packs/store";

  export default Vue.extend({
    store,
    props: {
      model: Model,
    },
    data(){
      return {
        sending: false,
        isMarginTime: true,
      }
    },
    mounted(){
      setTimeout(()=>this.isMarginTime=false, 1000);
    },
    components: {
      ChallengeText
    },
    computed: {
      challenges(){
        return this.model.challenge.getByChallengeIds(this.model.chapter.challenge_ids);
      },
      restCardBonus(){
        return this.model.restCardBonus(this.model.character, this.model);
      },
    },
    methods: {
      endGame(){
        if(this.sending || this.isMarginTime){
          return;
        }
        this.sending = true;
        this.$emit("guiEvent", {type: "endGame"});
        this.$store.commit("playSound", {key: "ok"})
      },
      isCleared(challengeId){
        return this.model.clearedChallenges.indexOf(challengeId) !== -1;
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .game_end .darkness{
    position: absolute;
    width: $window-width;
    height: $window-height;
    background-color: $shadow;
    opacity: 0.7;
    animation: darkness-in 1s;
  }
  @keyframes darkness-in {
    0%{
      opacity: 0;
    }
  }
  .game_end {
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
        padding: $space-m;
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
          .reason{
            font-weight: bold;
            color: $red2;
          }
        }
        .content{
          display: flex;
          justify-content: start;
          flex-direction: column;
          flex-grow: 1;
          gap: $space-m;
          .scores{
            display: flex;
            gap: $space-m;
            .score{
              padding: $space-s;
              display: flex;
              width: 60%;
              justify-content: space-between;
              border-bottom: 2px solid $white;
            }
            .normal{
              flex: 2;
            }
            .rest{
              flex: 1;
            }
          }
          .challenges{
            padding: $space-m;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .challenge-1{
              animation: challenge-text 1s;
              animation-delay: 0.5s;
            }
            .challenge-2{
              animation: challenge-text 1s;
              animation-delay: 0.7s;
            }
            .challenge-3{
              animation: challenge-text 1s;
              animation-delay: 0.9s;
            }
            .challenge-4{
              animation: challenge-text 1s;
              animation-delay: 1.1s;
            }
          }
          .message_area{
            @include centering($height: 20px);
          }
        }
      }
    }
  }

  @keyframes challenge-text {
    0%{
      transform: translateY(0px);
    }
    20%{
      transform: translateY(-10px);
    }
    100%{
      transform: translateY(0px);
    }
  }

  .show-in-enter-active {
    transition: all .3s;
  }
  .show-in-leave-active {
    transition: all .3s;
  }
  .show-in-enter{
    transform: translateX(-10px);
    opacity: 0;
  }
  .show-in-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }

  .lastcardbonus {
    animation: last-card 1s;
  }

  @keyframes last-card {
    0%{
      opacity: 0;
      transform: translateY(0px);
      color: $white;
    }
    40%{
      opacity: 1;
      transform: translateY(-10px);
      color: $purple1;
    }
    100%{
      opacity: 1;
      transform: translateY(0px);
      color: $white;
    }
  }
</style>
