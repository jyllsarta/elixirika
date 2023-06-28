<template>
  <div class="fragments" v-if="state">
    <skill-activation-vue v-if="$store.state.fragments.skill_activation" :state="state"/>
  </div>
</template>

<script>
import State from "../packs/model/state";
import store from '../packs/store';
import SkillActivationVue from './fragments/SkillActivation.vue';

export default {
  store,
  props: {
    state: State,
  },
  components: {
    SkillActivationVue,
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.fragments{
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
