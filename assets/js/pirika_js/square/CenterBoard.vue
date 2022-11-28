<template>
  <div class="area with_inset_shadow" :style="styleBackground">
    <div
      class="background"
      :style="{
        backgroundImage: `url(/images/square/svg/symbol_character${model.characterId}_small.svg`,
      }"
    ></div>
    <div class="front">
      <div class="indice">
        <div
          class="index with_solid_shadow"
          v-for="index in [0, 1, 2, 3]"
          :key="index"
          :field="board.fields[index]"
          :style="styleIndexBackground(index)"
        >
          <span>{{ expectedCardCount(index) }}</span
          ><span>枚 / {{ expectedScore(index) }}点</span>
        </div>
      </div>
      <div class="fields">
        <Field
          v-for="index in [0, 1, 2, 3]"
          @guiEvent="eventsUp"
          :key="index"
          :field="board.fields[index]"
          :selected="canStackCard(index)"
          :characterId="model.characterId"
          :fieldIndex="index"
        ></Field>
      </div>
    </div>
  </div>
</template>

<script>
import Field from './Field.vue';
import Board from './packs/board';
import Model from './packs/model';

export default {
  props: {
    board: Board,
    model: Model,
  },
  components: {
    Field,
  },
  methods: {
    expectedCardCount(index) {
      if (this.isAttemptingToStack(index)) {
        return this.board.fields[index].cards.length + 1;
      }
      return this.board.fields[index].cards.length;
    },
    expectedScore(index) {
      if (
        this.model.selectingBoardIndex === index &&
        this.canStackCard(index)
      ) {
        const card = this.model.getHoldingCard();
        return this.board.fields[index].scoreWithCard(card);
      }
      return this.board.fields[index].score();
    },
    canStackCard(index) {
      const card = this.model.getHoldingCard();
      return (
        card &&
        this.model.cardStackRule(
            this.model.character,
            this.model,
            card,
            this.model.board.fields[index],
        )
      );
    },
    isAttemptingToStack(index) {
      return (
        this.model.selectingBoardIndex === index && this.canStackCard(index)
      );
    },
    styleIndexBackground(index) {
      const card = this.model.getHoldingCard();
      const style = {};
      if (this.isAttemptingToStack(index) && card.isSenderCard()) {
        style['background-color'] = `var(--color-i2-${this.model.characterId})`;
      } else {
        style['background-color'] = `var(--bg3-${this.model.characterId})`;
      }

      if (this.canStackCard(index)) {
        style.border = `2px solid var(--color-i1-${this.model.characterId})`;
      }
      return style;
    },
    eventsUp(params) {
      this.$emit('guiEvent', params);
    },
  },
  computed: {
    styleBackground() {
      return {
        'background-color': `var(--bg2-${this.model.characterId})`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.area {
  position: relative;
  width: 800px;
  height: unquote("max(350px, 57%)");
  border-radius: $radius;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: 90px;
    opacity: 0.05;
    pointer-events: none;
  }
  .front {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: $space-ll;
    border-radius: $space-l;
    .indice {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: $space-m;
      .index {
        border: 2px solid $primary3;
        border-radius: $radius;
        padding: $space-m;
        width: 180px;
        text-align: center;
        transition: background-color 0.3s;
      }
    }
    .fields {
      width: 100%;
      flex-grow: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: $space-m;
    }
  }
}
</style>
