<template>
    <div class="fields">
        <transition-group class="field" name="cards" v-if="emphasisTopCards" tag="span">
            <div class="card top" v-for="card in topCards" :style="colorSchemedStyle(card)" :key="card.id"></div>
            <div class="card" v-for="card in notTopCards" :style="colorSchemedStyle(card)" :key="card.id"></div>
        </transition-group>
        <transition-group class="field" name="cards" v-if="!emphasisTopCards" tag="span">
            <div class="card" v-for="card in field.cards" :style="colorSchemedStyle(card)" :key="card.id"></div>
        </transition-group>
    </div>
</template>

<script>

import Field from './packs/field';

export default ({
  props: {
    field: Field,
    emphasisTopCards: Boolean,
    characterId: Number,
  },
  computed: {
    topCards() {
      return this.field.cards.slice(0, 4);
    },
    notTopCards() {
      return this.field.cards.slice(4, Math.inf);
    },
  },
  methods: {
    colorSchemedStyle(card) {
      if (card.category === 'normal') {
        return {
          opacity: 0.6,
        };
      }
      return {
        backgroundColor: `var(--color-${card.suit}1-${this.characterId})`,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
  @import "stylesheets/global_settings";
  .fields{
    width: 100%;
    height: 100%;
    .field{
      width: 100%;
      display: flex;
      gap: $space-s;
      flex-wrap: wrap;
      align-items: center;
      padding-top: $space-m;
      padding-bottom: $space-m;
      padding-left: 5px;
      padding-right: 5px;
      .card{
        background-color: $white;
        width: $space-s;
        height: 20px;
        border-radius: $radius;
        &.top{
          width: $space-s;
          height: 25px;
        }
      }
    }
  }

  .cards-leave-active {
    position: absolute;
    transition: all 1.3s;
  }
  .cards-enter-from{
    transform: translateX(20px);
    opacity: 0;
  }
  .cards-leave-to{
    transform: translateX(-20px);
    opacity: 0;
  }
  .cards-move {
    transition: transform 0.3s;
  }
</style>
