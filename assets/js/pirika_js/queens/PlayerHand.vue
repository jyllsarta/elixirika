<template>
<div class="player_hand" v-if="state">
  <div class="hand" v-for="hand in state.playerHand.cards" :key="hand.id">
    {{hand}}
  </div>
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

<style lang="scss">
@import "stylesheets/global_settings";
</style>
