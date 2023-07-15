<template>
  <div class="card_area" v-if="state">
    <div class="cards">
      <card-vue
        v-for="card in state.board.cards"
        :key="card.id"
        :card="card"
        :state="state"
        class="card"
      />
    </div>
  </div>
</template>

<script>
import store from "../packs/store";
import CardVue from "./Card.vue";

export default {
  store, 
  components: {
    CardVue
  },
  props: {
    state: Object,
    controller: Object,
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.card_area{
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .cards{
    width: 100%;
    height: 100%;
    border: 1px solid $white;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 8px;
    .card{
      width: 100px;
      height: 100px;
    }
  }
}
</style>
