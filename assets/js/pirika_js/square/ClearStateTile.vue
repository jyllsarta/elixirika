<template>
  <div class="clear_state_tile" @click="onClick" @mouseenter="onHover">
    <div
      class="flake"
      v-for="index in [0, 1, 2, 3]"
      :class="{ cleared: isCleared(index), completed: isCompleted }"
    ></div>
    <div class="number">{{ chapter.index }}</div>
    <div class="flash" ref="flash"></div>
  </div>
</template>

<script>
import gsap from 'gsap';
import store from './packs/store';

export default {
  store,
  props: {
    // 各キャラは CharacterMizuha みたいに個別クラスだし共通の基底があるわけでもないので縛れない
    character: Object,
    chapter: Object,
    challengeClearState: Array,
  },
  methods: {
    async onClick() {
      this.$store.commit('playSound', {key: 'ok'});
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
          },
      );
      await this.$delay(40);
      this.$emit('selected', {
        chapterId: this.chapter.id,
        characterId: this.character.id,
      });
    },
    isCleared(challengeIndex) {
      const challengeId = this.chapter.challenge_ids[challengeIndex];
      return this.challengeClearState.some((x) => x === challengeId);
    },
    onHover() {
      this.$store.commit('playSound', {key: 'hover'});
    },
    $delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
  computed: {
    isCompleted() {
      return this.chapter.challenge_ids.every(
          (x) => this.challengeClearState.indexOf(x) !== -1,
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.clear_state_tile {
  position: relative;
  width: 100%;
  height: 100%;
  border-top: 1px solid $purple1;
  border-left: 1px solid $purple1;
  display: flex;
  flex-wrap: wrap;
  transition: transform 0.1s, filter 0.1s;
  &:hover {
    filter: brightness(130%);
    transform: scale(1.1);
  }
  .flake {
    width: 50%;
    height: 50%;
    border-bottom: 1px solid $purple1;
    border-right: 1px solid $purple1;
    background-color: $frame-background;
  }
  .flash {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    background-color: $purple1;
    pointer-events: none;
  }
  .number {
    position: absolute;
    line-height: 100%;
    padding: $space-s;
    z-index: 10;
    font-size: $font-size-medium;
  }
  .cleared {
    background-color: $purple3;
  }
  .completed {
    background-color: $purple2;
  }
}
</style>
