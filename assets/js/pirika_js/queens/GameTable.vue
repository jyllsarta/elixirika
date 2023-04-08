<template>
<div class="table" v-if="state">
  <div class="players">
    <div class="area">
      <h2>EnemyBoard</h2>
      <field-area :field="state.enemyBoard" :hidden="state.phase !== 'showdown'" @click-card="onCardClick" :showValue="state.phase == 'showdown'"/>
    </div>

    <div class="area">
      <h2>PlayerBoard</h2>
      <field-area :field="state.playerBoard" :hidden="false" @click-card="onCardClick" :showValue="true"/>
    </div>
  </div>
  <div class="targets">
    <div class="area">
      <h2>Target</h2>
      <field-area :field="state.board" :hidden="false" @click-card="onCardClick" :showValue="true"/>
    </div>
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
  .players{
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    width: 50%;
    .area{
      width: 100%;
    }
  }
  .targets{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .area{
      width: 100%;
    }
  }
}
</style>
