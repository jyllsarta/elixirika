<template>
</template>

<script>
export default {
  data(){
    return {
      autoProceedPhases: [
        "setup",
        "turn_start",
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
    processEnemySelectPhase(){
      setTimeout(()=>{
        this.doEnemySelectPhase();
      }, 500);
    },
    doEnemySelectPhase(){
      this.controller.processEnemySelectPhase();
      if(this.state.enemy.hand.cards.length > 0){
        setTimeout(()=>{ this.doEnemySelectPhase()}, 200);
      }
      else{
        this.controller.nextPhase();
      }
    }
  },
  watch: {
    "state.phase": function(new_phase){
      if(this.state.phase === "enemy_select"){
        this.processEnemySelectPhase();
        return;
      }
      if(!this.autoProceedPhases.includes(new_phase)){
        return;
      }
      if(this.state.phase === "enemy_select"){
        this.processEnemySelectPhase();
        return;
      }
      const delay = new_phase == "showdown" ? 1000 : 500;
      setTimeout(()=>{this.proceedPhaseIfNotChanged(new_phase)}, delay);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
</style>
