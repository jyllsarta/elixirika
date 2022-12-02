<template>
  <div class="star_palette">
    <div class="background with_drop_shadow">
      <img src="/images/square/svg/star_palette3.svg" />
    </div>
    <div class="container">
      <div
        class="star"
        v-for="param in params"
        :class="starClass(param)"
        :key="param"
      >
        <div
          class="pattern_flash"
          v-if="model.starPalette.isSatisfied(param)"
        ></div>
        <div
          class="pattern_flash2"
          v-if="model.starPalette.isSatisfied(param)"
        ></div>
        <div class="text">{{ stringExpression(param) }}</div>
      </div>
    </div>
    <div class="progress">
      <div class="current">{{ currentProgressCache }}</div>
      <div class="sep">/</div>
      <div class="total">{{ totalProgress }}</div>
    </div>
  </div>
</template>

<script>
import Model from "./packs/model";
import store from "./packs/store";

export default {
  store,
  props: {
    model: Model,
  },
  data() {
    return {
      params: [],
      currentProgressCache: 0,
    };
  },
  mounted() {
    this.params = this.model.character.getCallback(
      "starPaletteParameter",
      this.model.chapter.index,
    )()?.kinds;
  },
  methods: {
    stringExpression(param) {
      return param.upper ? `${param.value}+` : param.value;
    },
    expectedCardLength() {
      const index = this.model.selectingBoardIndex;
      const card = this.model.getHoldingCard();
      const board = this.model.board.fields[index];
      const holdingCardIsSender = card && card.isSenderCard();
      if (
        board &&
        card &&
        holdingCardIsSender &&
        this.model.cardStackRule(this.model.character, this.model, card, board)
      ) {
        return board.cards.length + 1;
      }
      return 0;
    },
    starClass(starPaletteParam) {
      const satisfiedClass = this.model.starPalette.isSatisfied(
        starPaletteParam,
      )
        ? "enabled"
        : "disabled";
      const expectedClass = this.model.starPalette.willBeSatisfiedWith(
        starPaletteParam,
        this.expectedCardLength(),
      )
        ? "will_be"
        : "";
      return [satisfiedClass, expectedClass].join(" ");
    },
  },
  computed: {
    currentProgress() {
      return this.params.filter((param) =>
        this.model.starPalette.isSatisfied(param),
      ).length;
    },
    totalProgress() {
      return this.params.length;
    },
  },
  watch: {
    "model.starPalette.fields.length": function (after, before) {
      const afterProgress = this.currentProgress;
      if (afterProgress > this.currentProgressCache) {
        this.$store.commit("playSound", { key: "special1" });
      } else if (
        afterProgress === this.currentProgressCache &&
        after > before
      ) {
        this.$store.commit("playSound", { key: "special3" });
      }
      this.currentProgressCache = afterProgress;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";

$palette_gold: #e1cc87;
$palette_gold2: #fff7dd;
$palette_base: #1f2d4a;
$palette_base2: #2f3a52;
$palette_base3: #38455f;
$palette_expected: #be82b9;

.star_palette {
  position: absolute;
  width: 100%;
  height: 100%;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
    }
  }
  .container {
    position: absolute;
    top: -4px;
    left: 10%;
    width: 80%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: $space-ll * 2;
    .star {
      position: relative;
      border-radius: $radius;
      border: 2px solid $palette_gold;
      height: 50px;
      width: 50px;
      box-shadow: inset 6px 6px 6px $palette_base3,
        inset -6px -6px 4px $palette_base3;
      background-color: $palette_base2;
      transition: 0.5s background-color;
      .pattern_flash {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        animation: pattern-flash 1s;
        border-radius: $radius;
        background-color: $palette_gold;
      }
      .pattern_flash2 {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        animation: pattern-flash 1s;
        animation-delay: 0.1s;
        border-radius: $radius;
        background-color: $palette_gold;
      }
      .text {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .enabled {
      border: 2px solid $palette_gold;
      background-color: $palette_gold;
      color: $palette_base;
      box-shadow: none;
      animation: flash 5s linear infinite;
    }
    .disabled {
      color: $white;
    }
    .will_be {
      background-color: $palette_expected;
    }
  }
  .progress {
    position: absolute;
    width: 30%;
    height: 30px;
    bottom: 14px;
    left: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $space-m;
    .current {
      text-shadow: 0px 0px 4px $yellow1;
    }
    .total {
      text-shadow: 0px 0px 4px $blue1;
    }
  }
}

@keyframes flash {
  0% {
    box-shadow: 0 0 2px $palette_gold2;
  }
  50% {
    box-shadow: 0 0 10px $palette_base;
  }
}
@keyframes pattern-flash {
  0% {
    opacity: 0;
    transform: scale(4);
  }
  80% {
    opacity: 1;
    transform: scale(1);
  }
  90% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
