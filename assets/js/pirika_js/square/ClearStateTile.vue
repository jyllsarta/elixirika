<template lang="pug">
  .clear_state_tile(@click="onClick")
    .flake(v-for="index in [0, 1, 2, 3]" :class="{cleared: isCleared(index), completed: isCompleted}")
    .number
      | {{chapter.index}}
    .flash(ref="flash")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import gsap from 'gsap';

  export default Vue.extend({
    props: {
      // 各キャラは CharacterMizuha みたいに個別クラスだし共通の基底があるわけでもないので縛れない
      character: Object,
      chapter: Object,
      challengeClearState: Array,
    },
    methods: {
      async onClick(){
        gsap.fromTo(
          this.$refs.flash,
          {
            scale: 0,
            opacity: 0.5,
          },
          {
            duration: 1,
            scale: 2,
            opacity: 0,
            ease: 'expo.out',
          });
        await this.$delay(300);
        this.$emit('selected', {chapterId: this.chapter.id, characterId: this.character.id});
      },
      isCleared(challengeIndex){
        const challengeId = this.chapter.challenge_ids[challengeIndex];
        return this.challengeClearState.some(x=>x===challengeId);
      }
    },
    computed: {
      isCompleted(){
        return this.chapter.challenge_ids.every(x=>this.challengeClearState.indexOf(x) !== -1);
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .clear_state_tile{
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid $gray2;
    display: flex;
    flex-wrap: wrap;
    transition: transform 0.1s, filter 0.1s;
    &:hover{
      filter: brightness(130%);
      transform: scale(1.1);
    }
    .flake{
      width: 50%;
      height: 50%;
      border: 1px solid $gray1;
      background-color: $frame-background;
      box-shadow: 0px 0px 5px 2px $gray3 inset;
    }
    .flash{
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      background-color: $purple1;
      pointer-events: none;
    }
    .number{
      position: absolute;
      line-height: 100%;
      padding: $space-s;
      z-index: 10;
      font-size: $font-size-medium;
    }
    .cleared{
      background-color: $purple3;
    }
    .completed{
      background-color: $purple2;
    }
  }
</style>
