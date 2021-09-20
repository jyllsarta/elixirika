<template lang="pug">
  .area(v-if="controller")
    .draw(@click="draw()")
      | ドロー

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Constants from './packs/constants';
  import Controller from './packs/controller';

  export default Vue.extend({
    props: {
      controller: Controller
    },
    methods: {
      draw(){
        this.controller.fillDraw();
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 300px;
    height: 150px;
    .draw {
      width: 100px;
      @include centering($height: 50px);
      border: 1px solid $light-green;
      background-color: $light-green-o;
      :hover{
        filter: brightness(140%);
      }
    }
  }
</style>
