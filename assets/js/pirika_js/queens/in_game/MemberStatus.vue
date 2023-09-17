<template>
  <div class="member_status">
    <div class="capacity_area">
      <div class="text_area">
        <div class="label">
          MP
        </div>
        <div class="value">
          <span class="current" :class="{max: member.specialPoint >= member.maxSpecialPoint}">
            {{member.specialPoint}}
          </span>
          <span class="remain">
            / {{ member.maxSpecialPoint }}
          </span>
        </div>
      </div>
      <div class="mp_dots">
        <div v-for="i in member.specialPoint" :key="i" class="dot"/>
      </div>
      <div class="buffs">
        <buff-icon-vue v-for="buff in member.buffState.buffs" :buff="buff" :key="buff.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../packs/store";
import BuffIconVue from "./BuffIcon.vue";

export default {
  store,
  props: {
    member: Object,
  },
  components: {
    BuffIconVue,
  },
};
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.member_status{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .capacity_area{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 4px;
    padding: 4px;
    .text_area{
      width: 100%;
      display: flex;
      justify-content: space-around;
      line-height: 100%;
      .max{
        color: $minus;
      }
    }
    .mp_dots{
      width: 100%;
      display: flex;
      justify-content: left;
      height: 20px;
      max-width: 200px;
      gap: 3px;
      .dot{
        width: 1px;
        height: 20px;
        background-color: $white;
      }
    }
    .buffs{
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 8px;
      line-height: 100%;
    }
  }
}
</style>
