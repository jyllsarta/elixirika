<template lang="pug">
  .button.with_shadow(
    @click="onClick"
    @mouseenter="onHover"
    :class="buttonClass"
    :style="{width: width, height: height}"
  )
    | {{label}}

</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      label: String,
      color: String,
      disabled: Boolean,
      flashing: Boolean,
      width: String,
      height: String,
    },
    methods: {
      onClick(){
        if(this.disabled){
          return;
        }
        this.$emit('click');
      },
      onHover(){
        this.$emit('hover');
      }
    },
    computed: {
      buttonClass(){
        let base = {disabled: this.disabled, flashing: this.flashing};
        base[this.color] = true;
        return base;
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import "stylesheets/global_settings";
  .button {
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s;
    &:hover:not(.disabled) {
      filter: brightness(140%);
      transform: scale(1.05);
    }
    &.disabled{
      opacity: 0.5;
    }
    &.flashing{
      animation: light 1.5s linear alternate infinite;
    }
    &:active:not(.disabled) {
      background-color: #ecfdf5;
      transform: scale(1.3);
    }
    &.red{
      border: 2px solid #fa3740;
      background-color: #f8a5e3;
    }
    &.blue{
      border: 2px solid #373bfd;
      background-color: #b3e0f1;
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
