<template>
  <div class="frame" ref="popup">
    <div class="bg"></div>
    <div class="content">{{ clearedChallenge.title }} を達成！</div>
  </div>
</template>

<script>
import gsap from "gsap";
import Model from "./packs/model";
import store from "./packs/store";

export default {
  store,
  props: {
    model: Model,
  },
  data() {
    return {
      clearedChallenge: {},
    };
  },
  computed: {},
  methods: {
    updateChallenge(challengeId) {
      this.clearedChallenge = this.model.challenge.idTable[challengeId];
      const tl = gsap.timeline();
      tl.to(this.$refs.popup, {
        x: -80,
        opacity: 0,
        duration: 0.0,
        display: "block",
      })
        .to(this.$refs.popup, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          display: "block",
        })
        .to(this.$refs.popup, {
          x: 0,
          opacity: 1,
          duration: 1.5,
          display: "block",
        })
        .to(this.$refs.popup, {
          x: 80,
          opacity: 0,
          duration: 0.3,
          display: "none",
        });
      setTimeout(() => {
        this.$store.commit("playSound", { key: "challenge" });
      }, 100);
    },
  },
  watch: {
    "model.clearedChallenges": {
      handler(after, before) {
        const newMembers = after.filter((x) => !before.includes(x));
        if (newMembers.length === 0) {
          return;
        }
        this.updateChallenge(newMembers[newMembers.length - 1]);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.frame {
  position: relative;
  width: $window-width;
  transform: translateX(-100px);
  border-top: 2px solid $white;
  border-bottom: 2px solid $white;
  height: 100px;
  display: none;
  .bg {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: $ingame-background;
    opacity: 0.9;
  }
  .content {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
