<template>
  <div class="decide_area" v-if="state" >
    <div class="ok tentative_button" :class="{available: available}" @click="ok">
      OK
    </div>
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    state: Object,
    controller: Object,
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
@import "../stylesheets/global_settings";
.decide_area{
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  .ok{
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    &.available{
      background-color: $accent1;
    }
  }
}
</style>
