<template>
  <div class="card_area" v-if="state">
    <div class="container">
      <div class="cards" v-if="condencedCards.length > 0">
        <card-vue
          v-for="card in condencedCards"
          :key="card.id"
          :card="card"
          :state="state"
          :condenced="true"
          class="condenced_card"
        />
      </div>
      <div class="cards flex">
        <card-vue
          v-for="card in normalCards"
          :key="card.id"
          :card="card"
          :state="state"
          :condenced="false"
          class="normal_card"
        />
      </div>
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
  computed: {
    // cardsのうち、最新10枚は通常サイズで表示する
    normalCards(){
      if(!this.state.board.cards){
        return [];
      }
      return this.state.board.cards.slice(-8);
    },
    condencedCards(){
      if(!this.state.board.cards){
        return [];
      }
      return this.state.board.cards.slice(0, -8);
    },
  },
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
  .container{
    width: 100%;
    height: 100%;
    border: 1px solid $white;
    display: flex;
    flex-direction: column;
    .cards{
      padding: 8px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 8px;
      .condenced_card{
        width: 10px;
        height: 10px;
      }
      .normal_card{
        width: 100px;
        height: 80px;
      }
    }
  }
  .flex{
    flex: 1;
  }
}
</style>
