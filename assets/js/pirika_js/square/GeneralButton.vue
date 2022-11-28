<template>
    <div class="button with_shadow" @click="onClick" @mouseenter="onHover" :class="buttonClass" :style="{width: width, height: height}">{{label}}</div>
</template>

<script>

import store from './packs/store';

export default ({
  props: {
    label: String,
    color: String,
    disabled: Boolean,
    flashing: Boolean,
    width: String,
    height: String,
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return;
      }
      this.$emit('click');
    },
    onHover() {
      this.$store.commit('playSound', {key: 'hover'});
      this.$emit('hover');
    },
  },
  computed: {
    buttonClass() {
      const base = {disabled: this.disabled, flashing: this.flashing};
      base[this.color] = true;
      return base;
    },
  },
});
</script>

<style lang="scss" scoped>
  @import "stylesheets/global_settings";
  .button {
    border-radius: $radius;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s;
    &:hover:not(.disabled) {
      filter: brightness(140%);
      transform: scale(1.05);
    }
    &.disabled{
      opacity: $disabled-opacity;
    }
    &.flashing{
      animation: light 1.5s linear alternate infinite;
    }
    &:active:not(.disabled) {
      background-color: $white;
      transform: scale(1.3);
    }
    &.red{
      border: 2px solid $red1;
      background-color: $red3;
    }
    &.blue{
      border: 2px solid $blue1;
      background-color: $blue3;
    }
  }

  @keyframes light {
    0% {
      filter: brightness(180%);
    }
    40% {
      filter: brightness(120%);
    }
    100% {
      filter: brightness(100%);
    }
  }
</style>
