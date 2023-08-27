<template>
  <div class="baloon" v-if="state">
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
  background-color: $bg2;
  border: 1px solid $white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
