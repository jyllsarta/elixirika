<template>
  <div class="area">
    <div class="effect">
      <div class="bg" ref="bg"></div>
      <div class="squares" ref="square">
        <div class="square square1"></div>
        <div class="square square2"></div>
        <div class="square square3"></div>
        <div class="square square4"></div>
      </div>
      <div class="number" ref="number">
        <div class="value">{{ number }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import Model from "./packs/model";

export default {
  data() {
    return {
      number: 16,
    };
  },
  props: {
    model: Model,
  },
  computed: {},
  methods: {
    play() {
      gsap
        .timeline()
        .to(this.$refs.bg, { opacity: 0, scale: 0, duration: 0 })
        .to(this.$refs.bg, { opacity: 0.1, scale: 1, duration: 0.35 })
        .to(this.$refs.bg, { opacity: 0, scale: 2, duration: 0.75 });

      gsap
        .timeline()
        .to(this.$refs.square, {
          opacity: 0,
          scale: 2,
          rotate: 45,
          duration: 0,
        })
        .to(this.$refs.square, {
          opacity: 0.3,
          scale: 1,
          rotate: 0,
          duration: 0.35,
        })
        .to(this.$refs.square, {
          opacity: 0,
          scale: 0.7,
          rotate: -45,
          duration: 0.75,
        });

      gsap
        .timeline()
        .to(this.$refs.number, {
          opacity: 0,
          scale: 4,
          rotate: 0,
          duration: 0,
        })
        .to(this.$refs.number, {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.15,
        })
        .to(this.$refs.number, {
          opacity: 0,
          scale: 0.9,
          rotate: 0,
          duration: 1.05,
        });
    },
    onSendToStarPalette() {
      this.play();
    },
  },
  watch: {
    "model.starPalette.fields": {
      handler(newFields, oldFields) {
        if (newFields.length === 0) {
          return;
        }
        this.number = newFields[newFields.length - 1].cards.length || 0;
        this.onSendToStarPalette();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.area {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  .effect {
    width: 100%;
    height: 100%;
    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: $white;
      opacity: 0;
      transform: rotate(45deg);
    }
    .squares {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      opacity: 0;
      .square {
        width: 97px;
        height: 97px;
        background-color: $white;
      }
    }
    .number {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      .value {
        font-family: "Coda", cursive;
        font-size: 140px;
        text-shadow: 0px 0px 4px $blue1, 0px 0px 4px $blue1, 0px 0px 4px $blue1;
      }
    }
  }
}
</style>
