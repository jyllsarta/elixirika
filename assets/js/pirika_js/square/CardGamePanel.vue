<template lang="pug">
  .area(v-if="model")
    .controls
      .draw(@click="draw()")
        | ドロー
    .informations
      .deck
        | 山： {{model.deck.field.cards.length}}
      .grav
        | 捨： {{model.graveyard.field.cards.length}}

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from './packs/model';

  export default Vue.extend({
    props: {
      model: Model
    },
    methods: {
      draw(){
        this.$emit("guiEvent", {type: "fillDraw"});
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
      border: 1px solid $gray3;
      background-color: $gray4;
      &:hover{
        filter: brightness(140%);
      }
    }
  }
</style>
