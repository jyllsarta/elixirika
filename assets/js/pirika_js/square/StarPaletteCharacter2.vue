<template>
  <div class="star_palette">
    <div class="background with_drop_shadow">
      <img src="/images/square/svg/star_palette2.svg" />
    </div>
    <div class="container">
      <div
        class="star"
        v-for="index in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
        :class="starClass(index)"
        :key="index"
      >
        <div
          class="pattern_flash"
          v-if="currentProgressCache &gt;= index"
        ></div>
        <div
          class="pattern_flash2"
          v-if="currentProgressCache &gt;= index"
        ></div>
        <div class="fill">
          <div class="number">{{ romanNumerals[index] }}</div>
        </div>
      </div>
    </div>
    <div class="descriptions">
      <div class="description" v-if="!params.banCardGap">~ ルール ~</div>
      <div class="description" v-if="params.banSendCard">
        2枚か3枚でスターパレットに送るべからず
      </div>
      <div class="description" v-if="params.banDiscard">
        1枚たりとも捨札にするべからず
      </div>
      <div class="description" v-if="params.banCardGap">
        同じ数値のカードを重ねるべからず
      </div>
      <div class="description">4枚で ■ , 8枚で ■ ■ ■ (その他は 0)</div>
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
      params: {
        banSendCard: true,
        banDiscard: true,
        banCardGap: true,
      },
      currentProgressCache: 0,
    };
  },
  mounted() {
    this.params = this.model.character.getCallback(
      "starPaletteParameter",
      this.model.chapter.index,
    )();
  },
  methods: {
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
    expectedAdditionalArityStyleScore() {
      const length = this.expectedCardLength();
      if (length === 4) {
        return 1;
      }
      if (length === 8) {
        return 3;
      }
      return 0;
    },
    starClass(index) {
      const current = this.currentProgress;
      const satisfiedClass = current >= index ? "enabled" : "disabled";
      const additionalScore = this.expectedAdditionalArityStyleScore();
      const expectedClass =
        current < index && current + additionalScore >= index ? "will_be" : "";
      return [satisfiedClass, expectedClass].join(" ");
    },
  },
  computed: {
    currentProgress() {
      return this.model.starPalette.arityStyleScore();
    },
    totalProgress() {
      return 12;
    },
    romanNumerals() {
      return [
        "zero",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
      ];
    },
  },
  watch: {
    "model.starPalette.fields.length": function (after, before) {
      const afterProgress = this.currentProgress;
      if (afterProgress - this.currentProgressCache === 3) {
        this.$store.commit("playSound", { key: "special4" });
      } else if (afterProgress > this.currentProgressCache) {
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
  .descriptions {
    position: absolute;
    top: 0;
    left: 13%;
    width: 30%;
    height: 60%;
    display: flex;
    flex-direction: column;
    color: $palette_gold;
    padding-top: 4px;
    font-size: 12px;
    align-items: center;
    justify-content: space-around;
  }
  .container {
    position: absolute;
    top: 0;
    right: 5%;
    width: 50%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: $space-m;
    .star {
      position: relative;
      border: 2px solid $palette_gold;
      height: 50px;
      width: 30px;
      box-shadow: inset 6px 6px 6px $shadow, inset -6px -6px 4px $shadow;
      background-color: $palette_base2;
      transition: 0.5s background-color;
      .pattern_flash {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        animation: pattern-flash 1s;
        background-color: $palette_gold;
      }
      .pattern_flash2 {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        animation: pattern-flash 1s;
        animation-delay: 0.1s;
        background-color: $palette_gold;
      }
      .fill {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .number {
          line-height: 100%;
          font-size: $font-size-mini;
        }
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
    width: 10%;
    height: 30px;
    bottom: 50px;
    left: 1%;
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
