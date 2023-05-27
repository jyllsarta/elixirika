<template>
  <div class="table_area">
    <bank-roll-vue class="bankroll" :state="state"/>
    <card-area-vue class="card_area" :state="state" :controller="controller"/>
    <target-area-vue class="target_area" :state="state" />
    <decide-area-vue class="decide_area" :state="state" :controller="controller"/>
  </div>
</template>

<script>
import store from "../packs/store";
import BankRollVue from './BankRoll.vue';
import TargetAreaVue from './TargetArea.vue';
import CardAreaVue from './CardArea.vue';
import DecideAreaVue from './DecideArea.vue';

export default {
  store, 
  components: {
    BankRollVue,
    TargetAreaVue,
    CardAreaVue,
    DecideAreaVue
  },
  props: {
    state: Object,
    controller: Object,
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.table_area{
  height: 100%;
  width: 100%;
  display: flex;
  border-top: 1px dotted $white;

  .bankroll_area{
    width: 20%;
    height: 100%;
  }
  .card_area{
    width: 40%;
    height: 100%;
  }
  .target_area{
    width: 20%;
    height: 100%;
  }
  .decide_area{
    width: 20%;
    height: 100%;
  }
}
</style>
