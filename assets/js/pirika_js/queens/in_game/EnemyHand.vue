<template>
  <div class="cards" v-if="state">
    <card-vue class="card" v-for="card in state.enemy.hand.cards" :key="card.id" :card="card" :state="state"/>
  </div>
</template>

<script>
import store from "../packs/store";
import CardVue from './Card.vue';

export default {
  store,
  components: {
    CardVue
  }, 
  props: {
    state: Object,
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.cards{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
  .card{
    width: 60px;
    height: 60px;
  }
}
</style>
