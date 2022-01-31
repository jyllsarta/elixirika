<template lang="pug">
  .area.with_shadow(v-if="model")
    .controls
      GeneralButton.draw(
        @click="draw()"
        v-if="model.deck.field.cards.length !== 0"
        :disabled="drawing"
        :flashing="model.hand.field.cards.length === 0"
        :width="'100%'"
        :height="'50px'"
        :color="'red'"
        :label="'ドロー'"
      )
      GeneralButton.end(
        @click="gracefullyStalemate()"
        v-if="model.deck.field.cards.length === 0"
        :disabled="drawing"
        :flashing="model.hand.field.cards.length === 0"
        :width="'100%'"
        :height="'50px'"
        :color="'blue'"
        :label="'おしまい'"
      )
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
  import GeneralButton from "./GeneralButton.vue";

  export default Vue.extend({
    data: function(){
      return {
        drawing: false,
      }
    },
    props: {
      model: Model
    },
    components: {
      StackedIconField,
      GeneralButton
    },
    methods: {
      draw(){
        if(this.drawing){
          return;
        }
        this.drawing = true;
        setTimeout(()=>this.drawing=false, 1000);
        this.$emit("guiEvent", {type: "fillDraw"});
      },
      gracefullyStalemate(){
        if(this.drawing){
          return;
        }
        this.drawing = true;
        setTimeout(()=>this.drawing=false, 1000);
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
