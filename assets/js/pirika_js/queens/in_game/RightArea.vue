<template>
  <div class="right_area" v-if="state">
    <div class="skills">
      <div class="skill tentative_panel">敵スキル1</div>
      <div class="skill tentative_panel">敵スキル2</div>
    </div>
    <right-main-area-vue class="right_main_area" :state="state" :controller="controller"/>
    <div class="skills">
      <div class="skill tentative_panel"
        @click="onSkillClick(skillId)"
        :class="{disabled: !canInvokeSkill(skillId)}"
        v-for="skillId in playerSkillIds()"
        :key="skillId"
      >
        {{skill(skillId).name}}({{skill(skillId).cost}})
      </div>
    </div>
  </div>
</template>

<script>
import Masterdata from '../packs/masterdata';
import SkillFacade from '../packs/service/skill_facade';
import store from "../packs/store";
import RightMainAreaVue from './RightMainArea.vue';

export default {
  store, 
  components: {
    RightMainAreaVue,
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
        this.controller.toggleSkillSelectMode(skillId);
        return;
      }
      this.controller.invokeSkill(skillId);
      this.$store.commit("showFragment", {name: "skill_activation", extra: {skillId: skillId}});
    },
    skill(skillId){
      return Masterdata.get("skills", skillId);
    },
    canInvokeSkill(skillId){
      return this.skill(skillId).cost <= this.state.player.specialPoint && this.skillFacade.canInvoke(this.state, this.state.player, skillId, null);
    },
    playerSkillIds(){
      return this.state.player.skillIds;
    }
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
      &.disabled{
        opacity: 0.5;
      }
    }
  }
  .right_main_area{
    width: 100%;
    height: 70%;
    flex: 1;
  }
}
</style>
