<template lang="pug">
  .area.with_shadow
    .title
      |  - 今回の目標 - 
    .score
      .values
        .label
          | スコア：
        .value
          NumeratableNumber(:number="model.score", :speed="0.1", :scaled="true")
      .delta(ref="delta")
        | +{{ delta }}
    .challenges
      ChallengeText(
        v-for="challenge, index in challenges"
        :is-cleared="isCleared(challenge.id)",
        :index="index",
        :challenge="challenge"
        :key="index",
        :showDescription="false"
      )

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model";
  import ChallengeText from "./ChallengeText.vue";
  import NumeratableNumber from "./NumeratableNumber.vue";
  import gsap from 'gsap';

  export default Vue.extend({
    props: {
      model: Model,
    },
    components: {
      ChallengeText,
      NumeratableNumber,
    },
    data: function(){
      return {
        delta: 0
      }
    },
    computed: {
      challenges(){
        return this.model.challenge.getByChallengeIds(this.model.chapter.challenge_ids);
      }
    },
    methods: {
      isCleared(challengeId){
        return this.model.clearedChallenges.indexOf(challengeId) !== -1;
      },
      animateDelta(){
        const tl = gsap.timeline();
        tl
          .to( this.$refs.delta, { y:  10, opacity: 0, duration: 0.00 })
          .to( this.$refs.delta, { y:   0, opacity: 1, duration: 0.40 })
          .to( this.$refs.delta, { y: -10, opacity: 0, duration: 0.40 });
      }
    },
    watch: {
      "model.score": function(after, before){
        this.delta = after - before;
        this.animateDelta();
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 210px;
    height: unquote('max(180px, 36%)');
    background-color: $ingame-background;
    border: 2px solid $window-border;
    border-radius: $radius;
    padding: $space-m;
    display: flex;
    flex-direction: column;
    .title{
      font-size: $font-size-medium;
      width: 100%;
      text-align: center;
    }
    .score{
      position: relative;
      padding: $space-s;
      margin-left: 10%;
      width: 80%;
      border-bottom: 2px solid $gray3;
      .values{
        display: flex;
        width: 100%;
        justify-content: space-between;
      }
      .delta{
        position: absolute;
        opacity: 0;
        right: 0;
        bottom: 0;
        font-size: $font-size-large;
      }
    }
    .challenges{
      padding-top: $space-m;
      padding-bottom: $space-m;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
</style>
