<template>
<div class="player_hand" v-if="state">
  <div class="card" v-for="card in state.playerHand.cards" :key="card.id" @click="controller.sendToBoardByCardId(card.id)">
    {{card}}
  </div>
</div>
</template>

<script>
import State from "./packs/model/state";
import Controller from "./packs/service/controller";

export default {
  props: {
    state: State,
    controller: Controller,
  },
}
</script>

<style lang="scss">
@import "stylesheets/global_settings";
</style>
