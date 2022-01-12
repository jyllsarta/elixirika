<template lang="pug">
  .area.with_shadow(v-if="model")
    .controls
      .draw.with_shadow(@click="draw()" v-if="model.deck.field.cards.length !== 0")
        | ドロー
      .end.with_shadow(@click="gracefullyStalemate()" v-if="model.deck.field.cards.length === 0")
        | おしまい
    .informations
      .deck
        StackedIconField(:field="model.deck.field" :emphasisTopCards="true", :characterId="model.characterId")
      .grav
        StackedIconField(:field="model.graveyard.field" :emphasisTopCards="false", :characterId="model.characterId")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from './packs/model';
  import StackedIconField from "./StackedIconField.vue";

  export default Vue.extend({
    props: {
      model: Model
    },
    components: {
      StackedIconField
    },
    methods: {
      draw(){
        this.$emit("guiEvent", {type: "fillDraw"});
      },
      gracefullyStalemate(){
        this.$emit("guiEvent", {type: "gracefullyStalemate"});
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 150px;
    height: 220px;
    background-color: $ingame-background;
    border: 2px solid $yellow3;
    border-radius: $radius;
    padding: $space-m;
    display: flex;
    flex-direction: column;
    .draw {
      width: 100%;
      @include centeringWithBorder($height: 50px, $border: 2px);
      border: 2px solid $red1;
      border-radius: $radius;
      background-color: $red3;
      &:hover{
        filter: brightness(140%);
      }
    }
    .end {
      width: 100%;
      @include centeringWithBorder($height: 50px, $border: 2px);
      border: 2px solid $red1;
      border-radius: $radius;
      background-color: $red2;
      &:hover{
        filter: brightness(140%);
      }
    }
    .informations{
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .grav{
        opacity: 0.3;
      }
    }
  }
</style>
