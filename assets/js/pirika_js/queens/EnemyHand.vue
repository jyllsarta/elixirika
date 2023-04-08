<template>
  <div class="enemy_hand" v-if="state">
    <field-area :field="state.enemyHand" :hidden="true" />
  </div>
</template>

<script>
import FieldArea from './FieldArea.vue';
import State from "./packs/model/state";

export default {
  props: {
    state: State
  },
  components: {
    FieldArea,
  }
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
</style>
