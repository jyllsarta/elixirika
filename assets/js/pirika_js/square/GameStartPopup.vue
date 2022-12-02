<template>
  <transition name="pop">
    <div class="game_start" @click="startGame" v-if="!gameStarted">
      <div class="background" ref="bg"></div>
      <div class="front" ref="front">
        <div class="content">
          <div class="title">{{ chapter.title }}</div>
          <div class="description">{{ chapter.extra_effect_description }}</div>
          <div class="challenges">
            <div
              class="challenge"
              v-for="(challenge, index) in challenges"
              :key="challenge.id"
            >
              <div class="icon">◇</div>
              <div class="rank">{{ ["I", "II", "III", "IV"][index] }}</div>
              <div class="description">{{ challenge.description }}</div>
            </div>
          </div>
        </div>
        <div class="close">任意の箇所をクリックしてスタート</div>
      </div>
    </div>
  </transition>
</template>

<script>
import Model from "./packs/model";
import store from "./packs/store";

export default {
  props: {
    model: Model,
    gameStarted: Boolean,
  },
  store,
  mounted() {
    this.$store.commit("playSound", { key: "welcome" });
    this.$store.commit("playBgm", "");
  },
  computed: {
    chapter() {
      return this.model.chapter;
    },
    challenges() {
      return this.model.challenge.getByChallengeIds(
        this.model.chapter.challenge_ids,
      );
    },
  },
  methods: {
    startGame() {
      this.$emit("startGame");
      this.$store.commit("playSound", { key: "gameStart" });
      this.$store.commit("playBgm", this.model.character.bgm);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.game_start {
  position: absolute;
  .background {
    position: absolute;
    background-color: $frame-background;
    width: $window-width;
    height: $window-height;
    opacity: 0.9;
  }
  .front {
    position: absolute;
    width: $window-width;
    height: $window-height;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $space-ll * 3;
    flex-direction: column;
    .content {
      width: 80%;
      height: 400px;
      border-top: 2px solid $white;
      border-bottom: 2px solid $white;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: $space-ll;
      flex-direction: column;
      .title {
        font-size: $font-size-large;
        width: 50%;
        text-align: center;
        border-bottom: 1px solid $gray3;
      }
      .description {
        width: 60%;
        white-space: pre-wrap;
        text-align: center;
      }
      .challenges {
        width: 60%;
        .challenge {
          width: 100%;
          display: flex;
          justify-content: center;
          gap: $space-m;
          .icon {
            text-align: center;
          }
          .rank {
            width: 5%;
            text-align: center;
          }
          .description {
            width: 70%;
          }
        }
      }
    }
    .close {
      width: 50%;
      text-align: center;
    }
  }
}

.pop-enter-active {
  transition: opacity 0.4s;
}
.pop-leave-active {
  transition: opacity 0.4s;
}
.pop-enter-from {
  opacity: 0;
}
.pop-leave-to {
  opacity: 0;
}
</style>
