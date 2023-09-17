<template>
  <div class="table_area">
    <div class="bg"/>
    <div class="content">
      <card-area-vue class="card_area" :state="state" :controller="controller"/>
      <combo-area-vue class="combo_area" :state="state"/>
      <decide-area-vue class="decide_area" :state="state" :controller="controller"/>
    </div>
  </div>
</template>

<script>
import store from "../packs/store";
import CardAreaVue from "./CardArea.vue";
import DecideAreaVue from "./DecideArea.vue";
import ComboAreaVue from "./ComboArea.vue";

export default {
  store,
  components: {
    CardAreaVue,
    DecideAreaVue,
    ComboAreaVue,
  },
  props: {
    state: Object,
    controller: Object,
  },
};
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.table_area{
  height: 100%;
  width: 100%;
  border-top: 1px dotted $white;
  position: relative;
  .bg{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: $bg3;
    opacity: 0.7;
  }
  .content{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    .card_area{
      width: 65%;
      height: 100%;
    }
    .combo_area{
      width: 15%;
      height: 100%;
    }

    .decide_area{
      width: 20%;
      height: 100%;
    }
  }
}
</style>
