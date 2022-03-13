<template lang="pug">
  transition(
    name="pop"
    @enter="onAnimationEnter"
    @leave="onAnimationLeave"
  )
    .game_start(@click="startGame" v-if="!gameStarted")
      .background(ref="bg")
      .front(ref="front")
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
  import gsap from 'gsap';
  import store from './packs/store';

  export default Vue.extend({
    props: {
      model: Model,
      gameStarted: Boolean,
    },
    store,
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
        this.$store.commit("playSound", {key: "reset"});
      },
      onAnimationEnter(el, completed){
        gsap.fromTo(
          [this.$refs.bg],
          {
            opacity: 0,
          },
          {
            duration: 0.5,
            opacity: 0.95,
            ease: 'linear',
            onComplete: completed,
          });
        gsap.fromTo(
          [this.$refs.front],
          {
            opacity: 0,
            translateX: -30,
          },
          {
            duration: 0.5,
            opacity: 0.95,
            translateX: 0,
            ease: 'expo.out',
          });
      },
      onAnimationLeave(el, completed){
        gsap.fromTo(
          [this.$refs.bg],
          {
            opacity: 0.95,
          },
          {
            duration: 0.5,
            opacity: 0,
            ease: 'expo.out',
            onComplete: completed,
          });
        gsap.fromTo(
          [this.$refs.front],
          {
            opacity: 1,
            translateX: 0,
          },
          {
            duration: 0.5,
            opacity: 0,
            translateX: 30,
            ease: 'expo.out',
          });
      },
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .game_start{
    position: absolute;
    .background{
      position: absolute;
      background-color: $frame-background;
      width: $window-width;
      height: $window-height;
      opacity: 0.9;
    }
    .front{
      position: absolute;
      width: $window-width;
      height: $window-height;
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
