<template>
  <div class="status">
    <div class="description">
      {{state.fieldEffect?.master.description}}
    </div>
    <skill-icon-vue
      class="skill"
      v-if="state.fieldEffect?.master.active"
      :skill="skill(state.fieldEffect?.master.active_skill_id)"
      :disabled="!canInvokeSkill(state.fieldEffect?.master.active_skill_id)"
      @click="onSkillClick(state.fieldEffect?.master.active_skill_id)"
    />
  </div>
</template>

<script>
import Masterdata from '../packs/masterdata';
import store from "../packs/store";
import SkillIconVue from './SkillIcon.vue';
import SkillFacade from '../packs/service/skill_facade';

export default {
  store,
  components: {
    SkillIconVue,
  },
  props: {
    state: Object,
    controller: Object,
  },
  data(){
    return {
      skillFacade: new SkillFacade(),
    }
  },
  methods: {
    onSkillClick(skillId){
      const skill = this.skill(skillId);
      if(!this.canInvokeSkill(skillId)){
        return;
      }
      if(skill.has_reference){
        this.controller.toggleSkillSelectMode(skillId, true);
        return;
      }
      this.controller.invokeFieldEffect(skillId);
      this.$store.commit("showFragment", {name: "skill_activation", extra: {skillId: skillId}});
    },
    skill(skillId){
      return Masterdata.get("skills", skillId);
    },
    canInvokeSkill(skillId){
      if(!this.state.fieldEffect){
        return false;
      }
      if(this.state.fieldEffectActivateCount > 0){
        return false;
      }
      return this.skill(skillId).cost <= this.state.player.specialPoint && this.skillFacade.canInvoke(this.state, this.state.player, skillId, null);
    },
    playerSkillIds(){
      return this.state.player.skillIds;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.status{
  width: 100%;
  height: 100%;
  max-height: 220px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  .description{
    width: 100%;
    text-align: center;
    font-size: $font-size-mini;
    white-space: pre-wrap;
  }
  .skill{
    width: 100%;
    height: 100%;
    max-height: 40px;
  }
}
</style>
