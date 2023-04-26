<template>
  <div class="turn_end_button" v-if="state" :class="{available: available}" @click="ok">
    <div>OK！</div>
  </div>
</template>

<script>
import State from "./packs/model/state";
import Controller from './packs/service/controller';

export default {
  props: {
    state: State,
    controller: Controller
  },
  computed: {
    available(){
      return this.state.phase == "unstarted" || this.state.playerBoard.cards.length == 2;
    }
  },
  methods: {
    ok(){
      if(!this.available){
        console.warn("not ready");
        return;
      }
      this.controller.nextPhase();
    }
  }
}

</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.turn_end_button{
  height: 60px;
  width: 120px;
  background-color: $bg3;
  border-radius: 4px;
  border: 1px solid $gray2;
  display: flex;
  justify-content: center;
  align-items: center;
  &.available{
    background-color: $bg2;
  }
}
</style>
