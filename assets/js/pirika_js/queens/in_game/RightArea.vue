<template>
  <div class="right_area" v-if="state">
    <div class="skills">
      <skill-icon-vue 
        v-for="skillId in enemySkillIds()"
        :key="skillId"
        :skill="skill(skillId)"
        :disabled="!canInvokeEnemySkill(skillId)"
      />
    </div>
    <right-main-area-vue class="right_main_area" :state="state" :controller="controller"/>
    <div class="skills">
      <skill-icon-vue 
        v-for="skillId in playerSkillIds()"
        :key="skillId"
        :skill="skill(skillId)"
        :disabled="!canInvokeSkill(skillId)"
        @click="onSkillClick(skillId)"
      />
    </div>
  </div>
</template>

<script>
import Masterdata from '../packs/masterdata';
import SkillFacade from '../packs/service/skill_facade';
import store from "../packs/store";
import RightMainAreaVue from './RightMainArea.vue';
import SkillIconVue from './SkillIcon.vue';

export default {
  store, 
  components: {
    RightMainAreaVue,
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
        this.controller.toggleSkillSelectMode(skillId, false);
        return;
      }
      this.controller.invokeSkill(skillId);
      this.$store.commit("showFragment", {name: "skill_activation", extra: {skillId: skillId}});
    },
    skill(skillId){
      return Masterdata.get("skills", skillId);
    },
    canInvokeSkill(skillId){
      return this.skillFacade.canInvoke(this.state, this.state.player, skillId, null);
    },
    playerSkillIds(){
      return this.state.player.skillIds;
    },
    enemySkillIds(){
      return this.state.enemy.skillIds;
    },
    canInvokeEnemySkill(skillId){
      return this.skillFacade.canInvoke(this.state, this.state.enemy, skillId, null, false);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.right_area{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  //set background left to right, transparent to black
  background: linear-gradient(to right, rgba(0,0,0, 0.2), rgba(0,0,0, 0.9));
  .skills{
    width: 100%;
    height: 15%;
    max-height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .skill{
      width: 150px;
      height: 80px;
    }
  }
  .right_main_area{
    width: 100%;
    height: 70%;
    flex: 1;
  }
}
</style>
