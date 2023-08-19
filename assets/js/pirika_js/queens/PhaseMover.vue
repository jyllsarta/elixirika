<template>
</template>

<script>
import PhaseStateMachine from './packs/service/phase_state_machine';

export default {
  data(){
    return {
      autoProceedPhases: [
        "setup",
        "turn_start",
        "enemy_select",
        "enemy_skill"
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
    continue(){
      // フェーズオブジェクトのcontinueを叩き、needContinueなら500ms後にもう一度continueを叩く
      const psm = new PhaseStateMachine();
      const newPhase = psm.getPhaseModule(this.state.phase);
      newPhase.continue(this.state, this.controller);
      if(newPhase.needsContinue(this.state)){
        const delay = 500;
        setTimeout(()=>{this.continue()}, delay);
      }
      else{
        this.proceedPhaseIfNotChanged(this.state.phase);
      }
    },
    onUpdatePhase(phase){
      // 勝手に進まないフェーズだったら何もしない
      if(!this.autoProceedPhases.includes(phase)){
        return;
      }
      // フェーズオブジェクトにneedsContinueが生えていてtrueを返してくるなら500ms後にcontinueを叩いてあげる
      const psm = new PhaseStateMachine();
      const newPhase = psm.getPhaseModule(phase);
      console.log(newPhase.needsContinue && newPhase.needsContinue(this.state));
      if(newPhase.needsContinue && newPhase.needsContinue(this.state)){
        const delay = 500;
        setTimeout(()=>{this.continue()}, delay);
        return;
      }

      // needsContinueを使わないフェーズは500msでcontroller経由で進める
      const delay = 500;
      setTimeout(()=>{this.proceedPhaseIfNotChanged(phase)}, delay);
    }
  },
  watch: {
    "state.phase": function(newPhase){
      this.onUpdatePhase(newPhase);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
</style>
