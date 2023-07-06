<template>
  <div class="member_break_condition" v-if="state">
    <div class="label_area">
      <div class="label">
        Target
      </div>
      <div class="description">
        全部破壊したら勝利
      </div>
    </div>
    <div class="conditions">
      <div class="condition tentative_panel">5↓</div>
      <div class="condition tentative_panel">5↓</div>
      <div class="condition tentative_panel">5↓</div>
      <div class="condition tentative_panel">5↓</div>
      <div class="condition tentative_panel">5↓</div>
      <div class="condition tentative_panel">5↓</div>
    </div>
    <div class="next_condition_area">
      <div class="next_condition tentative_panel">
        7s
      </div>
    </div>
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    state: Object,
    controller: Object,
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.member_break_condition{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid $white;
  .label_area{
    width: 100%;
    height: 10%;
    padding: 8px;
    .label{
      width: 100%;
      text-align: center;
    }
    .description{
      width: 100%;
      text-align: center;
      font-size: $font-size-mini;
      border-bottom: 1px solid $white;
    }
  }
  .conditions{
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    flex-wrap: wrap;
    align-content: flex-end;
    gap: 8px;
    .condition{
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $white;
    }
  }
  .next_condition_area{
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    .next_condition{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $white;
    }
  }
}
</style>
