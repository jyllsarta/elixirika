<template>
  <div class="bankroll_area" v-if="state">
    <stack-vue class="enemy" :amount="state.persistentData.enemyBankroll"></stack-vue>
    <stack-vue :amount="state.persistentData.playerBankroll"></stack-vue>
  </div>
</template>

<script>
import store from "../packs/store";
import StackVue from "./Stack.vue";

export default {
  store,
  props: {
    state: Object,
  },
  components: {
    StackVue
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.bankroll_area{
  width: 100%;
  height: 100%;
  padding: 4px;
  .enemy{
    border-bottom: 1px dotted $white;
  }
}
</style>
