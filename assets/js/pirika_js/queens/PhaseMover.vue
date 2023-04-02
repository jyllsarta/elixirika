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
      setTimeout(()=>{this.proceedPhaseIfNotChanged(new_phase)}, 500);
    },
  }
};
</script>

<style lang="scss">
@import "stylesheets/global_settings";
</style>
