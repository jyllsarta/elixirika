<template lang="pug">
  .game_start(@click="startGame")
    .background
    .front
      .content
        .title
          | {{chapter.title}}
        .description
          | {{chapter.extra_effect_description}}
        .challenges
          .challenge(v-for="(challenge, index) in challenges")
            .icon
              | ◇
            .rank
              | {{["I","II","III","IV"][index]}}
            .description
              | {{challenge.description}}
      .close
        | 任意の箇所をクリックしてスタート
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from './packs/model';

  export default Vue.extend({
    props: {
      model: Model,
    },
    computed: {
      chapter(){
        return this.model.chapter;
      },
      challenges(){
        return this.model.challenge.getByChallengeIds(this.model.chapter.challenge_ids);
      }
    },
    methods: {
      startGame(){
        this.$emit("startGame");
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .game_start{
    position: absolute;
    width: 100%;
    height: 100%;
    .background{
      position: absolute;
      background-color: $frame-background;
      width: 100%;
      height: 100%;
      opacity: 0.9;
    }
    .front{
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: $space-ll * 3;
      flex-direction: column;
      .content{
        width: 80%;
        height: 400px;
        border-top: 2px solid $white;
        border-bottom: 2px solid $white;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: $space-ll;
        flex-direction: column;
        .title{
          font-size: $font-size-large;
          width: 50%;
          text-align: center;
          border-bottom: 1px solid $gray3;
        }
        .description{
          width: 60%;
          white-space: pre-wrap;
          text-align: center;
        }
        .challenges{
          width: 60%;
          .challenge{
            width: 100%;
            display: flex;
            justify-content: center;
            gap: $space-m;
            .icon{
              text-align: center;
            }
            .rank{
              width: 5%;
              text-align: center;
            }
            .description{
              width: 70%;
            }
          }
        }
      }
      .close{
        width: 50%;
        text-align: center;
      }
    }
  }
</style>
