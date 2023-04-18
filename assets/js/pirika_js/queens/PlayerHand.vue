<template>
<div class="player_hand" v-if="state" :class="{waitSelect: state.uiState.selectSkillTarget}">
  <field-area :field="state.playerHand" :hidden="false" @click-card="onCardClick" :canClick="true"/>
</div>
</template>

<script>
import FieldArea from './FieldArea.vue';
import State from "./packs/model/state";
import Controller from "./packs/service/controller";

export default {
  props: {
    state: State,
    controller: Controller,
  },
  components: {
    FieldArea,
  },
  methods: {
    onCardClick(cardId){
      this.controller.selectCardByCardId(cardId);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.waitselect{
  background-color: yellow;
}
</style>
