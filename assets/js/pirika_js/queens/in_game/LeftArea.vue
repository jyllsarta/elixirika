<template>
  <div class="left_area" v-if="state">
    <div class="content">
      <member-break-conditions-vue
        class="member_break_conditions enemy"
        :state="state"
        :controller="controller"
        :breakConditions="state.enemy.breakConditions"
      />
      <member-break-conditions-vue
        class="member_break_conditions player"
        :state="state"
        :controller="controller"
        :breakConditions="state.player.breakConditions"
      />
    </div>
  </div>
</template>

<script>
import store from "../packs/store";
import MemberBreakConditionsVue from "./MemberBreakConditions.vue";

export default {
  store,
  components: {
    MemberBreakConditionsVue,
  },
  props: {
    state: Object,
    controller: Object,
  },
};
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
    .enemy{
      height: 55%;
    }
    .player{
      height: 45%;
    }
  }
}
</style>
