<template>
  <div class="icon">
    <break-condition-vue :condition="breakCondition" class="content" v-if="equipment.type == 'target'" />
    <skill-icon-vue :skill="skill" class="content" v-if="equipment.type == 'skill'" />
    <skill-icon-vue :skill="skill" class="content" v-if="equipment.type == 'instant'" />
    <general-icon-vue :text="equipment.title" class="content" v-if="equipment.type.startsWith('additional')" />
  </div>
</template>

<script>
import store from "./packs/store";
import BreakConditionVue from "./in_game/BreakCondition.vue";
import BreakCondition from "./packs/model/break_condition";
import SkillIconVue from "./in_game/SkillIcon.vue";
import Masterdata from "./packs/masterdata";
import GeneralIconVue from "./in_game/GeneralIcon.vue";

export default {
  store,
  components: {
    BreakConditionVue,
    SkillIconVue,
    GeneralIconVue,
  },
  props: {
    shopItem: Object,
    equipment: Object,
  },
  computed: {
    breakCondition() {
      return new BreakCondition(this.equipment.effect_key1, this.equipment.effect_value1, null, true, null);
    },
    skill() {
      return Masterdata.get("skills", this.equipment.effect_value1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.icon{
  width: 100%;
  height: 100%;
  .content{
    width: 100%;
    height: 100%;
  }
}
</style>
