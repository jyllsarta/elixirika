<template>
  <div class="general_icon tentative_button" :class="{disabled: disabled}">
    {{ text }}
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    disabled: Boolean,
    text: String,
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.general_icon{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &.disabled{
    opacity: 0.5;
  }
}
</style>
