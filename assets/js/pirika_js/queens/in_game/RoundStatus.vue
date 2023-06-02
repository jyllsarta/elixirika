<template>
  <div class="round_status">
    <div class="pot_area">
      <div class="label">
        POT: {{state.pot}}
      </div>
      <div class="dots">
        <div class="dot quarter" v-for="(i, index) in new Array(quarterDots(state.pot))" :key="index" />
        <div class="dot" v-for="(i, index) in new Array(normalDots(state.pot))" :key="index" />
      </div>
      <div class="description">
        キャパシティへのダメージ量
      </div>
    </div>
    <div class="round_area">
      <div class="label">
        Round
      </div>
      <div class="value">
        {{state.round}}
      </div>
      <div class="dots">
        <div class="dot quarter" v-for="(i, index) in new Array(quarterDots(state.round))" :key="index" />
        <div class="dot" v-for="(i, index) in new Array(normalDots(state.round))" :key="index" />
      </div>
      <div class="description">
        ポット増加量
      </div>
    </div>
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    state: Object,
  },
  methods: {
    quarterDots(amount){
      return Math.floor(amount / 25);
    },
    normalDots(amount){
      return amount % 25;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.round_status{
  width: 100%;
  height: 100%;
  max-height: 170px;
  padding: 4px;
  display: flex;
  .pot_area{
    width: 60%;
    height: 100%;
    padding: 4px;
    border-right: 1px dotted $white;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .label{
      width: 100%;
      text-align: center;
    }
    .dots{
      display: flex;
      gap: 6px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      .dot{
        width: 12px;
        height: 12px;
        background-color: $white;
        border-radius: 10px;
        &.quarter{
          background-color: $accent1;
        }
      }
    }
    .description{
      width: 100%;
      text-align: center;
      font-size: $font-size-mini;
      white-space: pre;
    }
  }
  .round_area{
    width: 40%;
    height: 100%;
    padding: 4px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .label{
      width: 100%;
      text-align: center;
    }
    .value{
      width: 100%;
      text-align: center;
      font-size: $font-size-xlarge;
    }
    .dots{
      display: flex;
      gap: 6px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      .dot{
        width: 12px;
        height: 12px;
        background-color: $white;
        border-radius: 10px;
        &.quarter{
          background-color: $accent1;
        }
      }
    }
    .description{
      width: 100%;
      text-align: center;
      font-size: $font-size-mini;
      white-space: pre;
    }
  }
}
</style>
