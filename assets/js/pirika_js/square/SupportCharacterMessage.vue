<template>
  <div class="area" ref="message" v-if="gameStarted">
    <img
      class="background with_drop_shadow"
      src="images/square/svg/message.svg"
    />
    <div class="text">
      <span
        class="letter"
        v-for="(t, index) in message"
        :key="t + index + messageId"
        :style="{ animationDelay: index * 15 + 'ms' }"
        v-text="t"
      ></span>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import Model from "./packs/model";

export default {
  props: {
    model: Model,
    gameStarted: Boolean,
  },
  computed: {
    message() {
      return this.model.messageManager.currentMessage.message;
    },
    messageId() {
      return this.model.messageManager.id;
    },
  },
  watch: {
    "model.messageManager.id": function () {
      this.receiveAnimation();
    },
  },
  methods: {
    receiveAnimation() {
      gsap.fromTo(
        this.$refs.message,
        {
          scale: 1.1,
        },
        {
          duration: 0.2,
          scale: 1,
          ease: "expo.out",
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.area {
  width: 250px;
  height: 100px;
  position: relative;
  animation: show 2s;
  .background {
    position: absolute;
    width: 100%;
  }
  .text {
    position: absolute;
    height: 100%;
    width: 100%;
    line-height: 140%;
    white-space: pre-wrap;
    padding: $space-m;
    color: $white;
  }
}

@keyframes vertical-text-in {
  0% {
    opacity: 0;
  }
  99% {
    opacity: 0;
  }
}
.letter {
  display: inline-block;
  min-width: 0.3em;
  animation: vertical-text-in 0.01s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s
    backwards;
}

@keyframes show {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
