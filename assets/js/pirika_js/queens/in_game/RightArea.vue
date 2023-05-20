<template>
  <div class="right_area">
    <div class="skills">
      <div class="skill tentative_panel">敵スキル1</div>
      <div class="skill tentative_panel">敵スキル2</div>
    </div>
    <right-main-area-vue class="right_main_area"/>
    <div class="skills">
      <div class="skill tentative_panel">プレイヤースキル1</div>
      <div class="skill tentative_panel">プレイヤースキル2</div>
    </div>
  </div>
</template>

<script>
import store from "../packs/store";
import RightMainAreaVue from './RightMainArea.vue';

export default {
  store, 
  components: {
    RightMainAreaVue,
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.right_area{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .skills{
    width: 100%;
    height: 20%;
    max-height: 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .skill{
      width: 150px;
      height: 90px;
    }
  }
  .right_main_area{
    width: 100%;
    height: 60%;
    flex: 1;
  }
}
</style>
