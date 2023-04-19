<template>
<div class="table" v-if="state">
  <div class="players">
    <div class="area">
      <h2>EnemyBoard</h2>
      <field-area :field="state.enemyBoard" :hidden="state.phase !== 'showdown'" @click-card="onCardClick" :showValue="state.phase == 'showdown'"/>
    </div>

    <div class="area">
      <h2>PlayerBoard</h2>
      <field-area :field="state.playerBoard" :hidden="false" @click-card="onCardClick" :showValue="true" :canClick="true"/>
    </div>
  </div>
  <div class="last_round_result">
    {{state.lastRoundResult}}
  </div>
  <div class="targets">
    <div class="area">
      <h2>Target</h2>
      <field-area :field="state.board" :hidden="false" @click-card="onCardClick" :showValue="true"/>
    </div>
    <div class="area">
      <h2>TargetNext</h2>
      <div>V: {{state.boardNext.targetValue()}}</div>
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
  background-color: $bg3;
  padding: 8px;
  border: 1px solid $gray2;
  .players{
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    width: 40%;
    .area{
      width: 100%;
    }
  }
  .last_round_result{
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .targets{
    width: 40%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    .area{
      width: 100%;
    }
  }
}
</style>
