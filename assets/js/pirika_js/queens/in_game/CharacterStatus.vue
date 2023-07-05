<template>
  <div class="character_status">
    <div class="capacity_area">
      <div class="text_area">
        <div class="label">
          MP
        </div>
        <div class="value">
          {{member.specialPoint}} / 8
        </div>
      </div>
      <div class="dots">
        <div class="dot" v-for="i in [1,2,3,4,5,6,7,8]" :key="i">{{(i <= member.score) ? "●" : "◯"}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    member: Object,
  },
  components: {
    
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.character_status{
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
    padding: 4px;
    .text_area{
      width: 100%;
      display: flex;
      justify-content: space-around;
      line-height: 100%;
    }
    .dots{
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 8px;
      line-height: 100%;
    }
  }
}
</style>
