<template>
  <div class="status">
    {{state.fieldEffect?.master.description}}
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    state: Object,
  },
  methods: {
    quarterDots(amount){
      return Math.floor(amount / 25);
    },
    normalDots(amount){
      return amount % 25;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.status{
  width: 100%;
  height: 100%;
  max-height: 170px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
}
</style>
