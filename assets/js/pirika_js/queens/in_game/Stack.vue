<template>
  <div class="stack">
    <div class="coins">
      <div class="chips" v-if="chips(amount).ones > 0">
        <div class="chip one" v-for="(chip, index) in new Array(chips(amount).ones)" :key="index">{{1}}</div>
      </div>
      <div class="chips" v-if="chips(amount).fives > 0">
        <div class="chip five" v-for="(chip, index) in new Array(chips(amount).fives)" :key="index">{{5}}</div>
      </div>
      <div class="chips" v-if="chips(amount).quarters > 0">
        <div class="chip quarter" v-for="(chip, index) in new Array(chips(amount).quarters)" :key="index">{{25}}</div>
      </div>
    </div>
    <div class="amount">
      {{amount}}
    </div>
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store,
  props: {
    amount: Number
  },
  methods: {
    // 1, 5, 25チップに分解する
    chips(amount){
      const quarters = Math.floor(amount / 25);
      const fives = Math.floor((amount - quarters *25)/5);
      const ones = amount % 5;
      return {
        ones: ones,
        fives: fives,
        quarters: quarters,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.stack{
  padding: 8px;
  display: flex;
  justify-content: space-around;
  height: 50%;
  .coins{
    width: 70%;
    display: flex;
    align-items: space-around;
    .chips{
      display: flex;
      flex-direction: column-reverse;
      height: 100%;
      width: 100%;
      gap: 2px;
      .chip{
        width: 30px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $font-size-mini;
        color: $white;
        &.one{
          border: 1px solid $accent3;
        }
        &.five{
          border: 1px solid $accent2;
        }
        &.quarter{
          border: 1px solid $accent1;
        }
      }
    }
  }
  .amount{
    width: 30%;
  }
}

</style>
