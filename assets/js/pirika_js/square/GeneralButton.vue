<template lang="pug">
  .button.with_shadow(
    @click="onClick"
    :class="{disabled: disabled, flashing: flashing}"
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
      width: Number,
      height: Number,
    },
    methods: {
      onClick(){
        if(this.disabled){
          return;
        }
        this.$emit('click');
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import "stylesheets/global_settings";
  .button {
    border-radius: $radius;
    border: 2px solid $red1;
    background-color: $red3;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      filter: brightness(140%);
    }
    &.disabled{
      opacity: $disabled-opacity;
    }
    &.flashing{
      filter: brightness(140%);
    }
  }
</style>
