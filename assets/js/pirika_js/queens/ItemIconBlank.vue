<template>
  <div class="icon" :class="{disabled: disabled}">
    {{message}}
  </div>
</template>

<script>
import store from "./packs/store";

export default {
  store,
  props: {
    message: String,
    disabled: Boolean,
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.icon{
  width: 100%;
  height: 100%;
  border: 1px solid $white;
  background-color: $bg3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: $font-size-mini;
  &.disabled{
    opacity: 0.5;
  }
}
</style>
