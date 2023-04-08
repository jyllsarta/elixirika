<template>
</template>

<script>
export default {
  data(){
    return {
      autoProceedPhases: [
        "setup",
        "turn_start",
        "enemy_select",
        "showdown"
      ]
    }
  },
  props: {
    state: Object,
    controller: Object
  },
  methods: {
    proceedPhaseIfNotChanged(current_phase){
      if(current_phase === this.state.phase){
        this.controller.nextPhase();
      }
    },
  },
  watch: {
    "state.phase": function(new_phase){
      if(!this.autoProceedPhases.includes(new_phase)){
        return;
      }
      const delay = new_phase == "showdown" ? 1500 : 500;
      setTimeout(()=>{this.proceedPhaseIfNotChanged(new_phase)}, delay);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
</style>
