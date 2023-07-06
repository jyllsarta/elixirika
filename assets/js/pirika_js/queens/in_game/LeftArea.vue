<template>
  <div class="left_area" v-if="state">
    <div class="content">
      <member-break-condition-vue class="member_break_condition" :state="state"/>
      <member-break-condition-vue class="member_break_condition" :state="state"/>
    </div>
  </div>
</template>

<script>
import store from "../packs/store";
import MemberBreakConditionVue from './MemberBreakCondition.vue';

export default {
  store, 
  components: {
    MemberBreakConditionVue,
  },
  props: {
    state: Object,
    controller: Object,
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.left_area{
  height: 100%;
  width: 100%;
  padding: 8px;
  .content{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
}
</style>
