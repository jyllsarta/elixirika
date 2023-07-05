<template>
  <div class="left_area tentative_panel" v-if="state">
    ひだり
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
.left_area{
  height: 100%;
  width: 100%;
}
</style>
