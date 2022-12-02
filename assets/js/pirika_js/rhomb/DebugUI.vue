<template>
  <div class="debug_ui">
    <div class="title">DEBUG UI</div>
    <div class="item">PHASE: {{ model.phaseStateMachine.phase.name }}</div>
    <div
      class="button"
      @click="$store.commit('guiEvent', { subject: 'nextPhase' })"
    >
      NEXT PHASE
    </div>
    <div
      class="button"
      @click="$store.commit('guiEvent', { subject: 'reset' })"
    >
      RESET
    </div>
  </div>
</template>

<script>
import store from "./packs/store";
import Model from "./packs/model";

export default {
  store,
  props: {
    model: Model,
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.debug_ui {
  .title {
    line-height: 100%;
    font-size: 8px;
    width: 100%;
    text-align: center;
    color: rgb(229, 255, 188);
  }
  opacity: 0.8;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 50px;
  gap: 4px;
  .item {
    line-height: 100%;
    pointer-events: none;
  }
  .button {
    width: 100px;
    height: 28px;
    text-align: center;
    padding-top: 6px;
    line-height: 100%;
    border: 1px solid rgb(0, 162, 255);
    background-color: rgba(0, 162, 255, 0.2);
  }
}
</style>
