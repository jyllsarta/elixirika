<template lang="pug">
  .area(v-if="controller")
    .controls
      .draw(@click="draw()")
        | ドロー
    .informations
      .deck
        | 山： {{controller.model.deck.field.cards.length}}
      .grav
        | 捨： {{controller.model.graveyard.field.cards.length}}

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
    width: 200px;
    height: 150px;
    .draw {
      width: 100px;
      @include centering($height: 50px);
      border: 1px solid $light-green;
      background-color: $light-green-o;
      &:hover{
        filter: brightness(140%);
      }
    }
  }
</style>
