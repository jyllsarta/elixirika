<template>
    <div class="area with_shadow" v-if="model">
        <div class="controls">
            <GeneralButton class="draw" @click="draw()" v-if="model.deck.field.cards.length !== 0" :disabled="drawing" :flashing="model.hand.field.cards.length === 0" :width="'100%'" :height="'50px'" :color="'red'" :label="'ドロー'"></GeneralButton>
            <GeneralButton class="end" @click="gracefullyStalemate()" v-if="model.deck.field.cards.length === 0" :disabled="drawing" :flashing="model.hand.field.cards.length === 0" :width="'100%'" :height="'50px'" :color="'blue'" :label="'おしまい'"></GeneralButton>
        </div>
        <div class="informations">
            <div class="deck">
                <StackedIconField :field="model.deck.field" :emphasisTopCards="true" :characterId="model.characterId"></StackedIconField>
            </div>
            <div class="grav">
                <StackedIconField :field="model.graveyard.field" :emphasisTopCards="false" :characterId="model.characterId"></StackedIconField>
            </div>
        </div>
    </div>
</template>

<script>

import Model from './packs/model';
import StackedIconField from './StackedIconField.vue';
import GeneralButton from './GeneralButton.vue';
import store from './packs/store';

export default ({
  store,
  data() {
    return {
      drawing: false,
    };
  },
  props: {
    model: Model,
  },
  components: {
    StackedIconField,
    GeneralButton,
  },
  methods: {
    draw() {
      if (this.drawing) {
        return;
      }
      this.drawing = true;
      setTimeout(() => this.drawing = false, 500);
      this.$emit('guiEvent', {type: 'fillDraw'});
    },
    gracefullyStalemate() {
      if (this.drawing) {
        return;
      }
      this.drawing = true;
      setTimeout(() => this.drawing = false, 500);
      this.$emit('guiEvent', {type: 'gracefullyStalemate'});
    },
  },
});
</script>

<style lang="scss" scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 160px;
    height: 220px;
    background-color: $ingame-background;
    border: 2px solid $window-border;
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
