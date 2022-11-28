<template>
    <div class="cover" @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp" oncontextmenu="return false;">
        <div class="bg" v-if="model.currentPhaseName() == 'LOCK'"></div>
    </div>
</template>

<script>

import Controller from './packs/controller';
import Model from './packs/model';

export default ({
  props: {
    model: Model,
    controller: Controller,
  },
  methods: {
    handleMouseDown(e) {
      if (this.model.phaseStateMachine.phase.handleMouseDown) {
        this.model.phaseStateMachine.phase.handleMouseDown(e, this.model);
      }
    },
    handleMouseMove(e) {
      if (this.model.phaseStateMachine.phase.handleMouseMove) {
        this.model.phaseStateMachine.phase.handleMouseMove(e, this.model);
      }
    },
    handleMouseUp(e) {
      e.preventDefault();
      if (this.model.phaseStateMachine.phase.handleMouseUp) {
        this.model.phaseStateMachine.phase.handleMouseUp(e, this.model);
      }
    },
  },
});
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .cover{
    width: 1200px;
    height: 800px;
    .bg{
      width: 100%;
      height: 100%;
      background-color: rgba(60, 55, 55, 0.702);
    }
  }
</style>
