<template>
  <div class="baloon tentative_panel" v-if="state">
    {{ state.uiState.currentScript }}
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    state: Object,
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.baloon{
  width: 100%;
  height: 100%;
}
</style>
