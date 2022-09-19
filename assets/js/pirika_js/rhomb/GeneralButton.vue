<template lang="pug">
  .button(
    @click="onClick"
    @mouseenter="onHover"
    :class="buttonClass"
    :style="{width: width, height: height}"
  )
    .button_text
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
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s;
    line-height: 100%;
    .button_text{
      height: 18px;
    }
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
      filter: brightness(140%);
      transform: scale(1.2);
    }
    &.red{
      border: 1px solid #fa3740;
      background-color: #f8a5e3;
    }
    &.blue{
      border: 1px solid #7c7ddf;
      background-color: #9dbfcc13;
    }
  }

  @keyframes light {
    0% {
      filter: brightness(140%);
    }
    40% {
      filter: brightness(120%);
    }
    100% {
      filter: brightness(100%);
    }
  }
</style>
