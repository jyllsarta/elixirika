<template>
  <div class="result">
    <div class="win">win!</div>
    <div class="hit_score result_row">
      <span class="index">HIT</span><span class="delimiter">:</span
      ><span class="value">{{ score }}</span>
    </div>
    <div class="speed_score result_row">
      <span class="index">SPEED</span><span class="delimiter">:</span
      ><span class="value">{{ speedScore }}</span>
    </div>
    <div
      class="total_score result_row"
      v-bind:class="[isHighScoreUpdated ? 'high_score_updated' : '']"
    >
      <span class="index">TOTAL</span><span class="delimiter">:</span
      ><span class="value">{{ totalScore }}</span
      ><span class="high_score_text" v-if="isHighScoreUpdated"
        >high score!</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "result",
  props: ["score", "speedScore", "totalScore", "isHighScoreUpdated"],
};
</script>

<style lang="scss" scoped>
@import "stylesheets/constants";

.win {
  position: absolute;
  left: 10%;
  bottom: 110%;
  width: 80%;
  opacity: $transparent_normal;
  font-size: $title_font_size;
  text-align: center;
  color: $primary_color;
}

.result {
  position: absolute;
  left: 20%;
  bottom: 30%;
  width: 60%;
  height: $title_font_size * 4;
  display: flex;
  flex-direction: column;
  .result_row {
    width: 100%;
    height: 1em;
    text-align: left;
    font-size: $title_font_size;
    span {
      display: inline-block;
    }
    .index {
      width: 28%;
    }
    .delimiter {
      width: 2%;
    }
    .value {
      width: 18%;
      text-align: right;
    }
    .high_score_text {
      width: 30%;
      padding-left: 5%;
      text-align: left;
      font-size: $title_font_size * 0.5;
      color: $primary_color;
    }
  }
  .high_score_updated {
    color: $primary_color;
  }
}
</style>
