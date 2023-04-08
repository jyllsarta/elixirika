<template>
<div class="table" v-if="state">
  <div class="area">
  <h2>EnemyBoard</h2>
    <field-area :field="state.board" :hidden="true" @click-card="onCardClick" :showValue="state.phase == 'showdown'"/>
  </div>

  <div class="area">
    <h2>Target</h2>
    <field-area :field="state.board" :hidden="false" @click-card="onCardClick" :showValue="true"/>
  </div>

  <div class="area">
    <h2>PlayerBoard</h2>
    <field-area :field="state.playerBoard" :hidden="false" @click-card="onCardClick" :showValue="true"/>
  </div>
</div>
</template>

<script>
import FieldArea from './FieldArea.vue';
import State from "./packs/model/state";
import Controller from './packs/service/controller';

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
      this.controller.unstage(cardId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.table{
  display: flex;

}
</style>
