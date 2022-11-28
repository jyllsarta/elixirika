<template>
  <div class="area">
    <div class="hand">
      <Card
        :card="card"
        v-for="card in cards"
        :key="card.id"
        @hover="onCardHover"
        :characterId="model.characterId"
        @guiEvent="eventsUp"
      >
      </Card>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import Hand from './packs/hand';
import Model from './packs/model';
import store from './packs/store.js';

export default {
  props: {
    hand: Hand,
    model: Model,
  },
  store,
  components: {
    Card,
  },
  computed: {
    actualCards() {
      return this.hand.field.cards;
    },
  },
  data() {
    return {
      touchDragging: false,
      cards: [],
    };
  },
  mounted() {
    this.react();
  },
  watch: {
    actualCards: {
      handler() {
        this.react();
      },
      deep: true,
    },
  },
  methods: {
    eventsUp(params) {
      this.$emit('guiEvent', params);
    },
    react() {
      const {actualCards} = this;
      // なくなったカードを消す
      this.cards = this.cards.filter(
          (card) => actualCards.findIndex((a) => a.id === card.id) !== -1,
      );
      // 追加されたカードがあれば一つ足す
      const addedCardIndex = actualCards.findIndex(
          (a) => this.cards.findIndex((card) => card.id === a.id) === -1,
      );

      if (addedCardIndex !== -1) {
        this.cards.splice(addedCardIndex, 0, actualCards[addedCardIndex]);
      }
      // 少し待つ
      if (this.cards.length !== actualCards.length) {
        setTimeout(() => this.react(), 70);
      }
    },
    onCardHover(card) {
      this.$emit('guiEvent', {type: 'selectCard', card});
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.area {
  width: 840px;
  height: 100px;
  .hand {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: $space-m;
  }
}
</style>
