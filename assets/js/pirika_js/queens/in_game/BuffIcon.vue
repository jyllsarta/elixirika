<template>
  <div class="buff tentative_panel">
    {{ buff.master.title }}({{ buff.restTurn }})
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    buff: Object,
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.buff{
  min-width: 50px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
