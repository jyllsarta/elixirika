<template>
  <div class="table_area">
    <bank-roll-vue class="bankroll" />
    <target-area-vue class="target_area" />
    <card-area-vue class="card_area" />
    <decide-area-vue class="decide_area" />
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
  }
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
  .target_area{
    width: 20%;
    height: 100%;
  }
  .card_area{
    width: 40%;
    height: 100%;
  }
  .decide_area{
    width: 20%;
    height: 100%;
  }
}
</style>
