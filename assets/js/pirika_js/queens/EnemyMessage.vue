<template>
<div class="enemy_message" v-if="state">
  うーーーん...
</div>
</template>

<script>
import State from "./packs/model/state";
export default {
  props: {
    state: State
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.enemy_message{
  border-radius: 10px;
  padding: 8px;
  border: 1px solid white;
}
</style>
