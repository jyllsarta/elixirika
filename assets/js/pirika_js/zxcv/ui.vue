<template>
  <div class="ui">
    <div
      class="score"
      v-if="
        gameState === constants.gameStates.inGame ||
        gameState === constants.gameStates.gameOver
      "
      v-bind:class="[isHighScoreUpdated ? 'high_score_updated' : '']"
    >
      {{ score }}
    </div>
    <transition name="left-show-in">
      <div
        class="high_score_text"
        v-if="isHighScoreUpdated &amp;&amp; gameState === constants.gameStates.gameOver"
      >
        high score!
      </div>
    </transition>
    <transition name="left-show-in">
      <result
        v-if="gameState === constants.gameStates.cleared"
        v-bind:score="score"
        v-bind:speedScore="speedScore"
        v-bind:isHighScoreUpdated="isHighScoreUpdated"
        v-bind:totalScore="totalScore"
      ></result>
    </transition>
    <transition name="delay">
      <div
        class="r_to_reset delay"
        v-if="
          gameState === constants.gameStates.cleared ||
          gameState === constants.gameStates.gameOver
        "
      >
        (r to reset)
      </div>
    </transition>
    <life-gauge
      v-if="gameState !== constants.gameStates.title"
      v-bind:life="life"
    ></life-gauge>
    <transition name="left-show-in">
      <div class="game_over" v-if="gameState === constants.gameStates.gameOver">
        GAME OVER
      </div>
    </transition>
    <transition name="bounce">
      <div
        class="title"
        v-if="gameState === constants.gameStates.title && loadCompleted"
      >
        Z X C V<br />
        kick zxcv to start
      </div>
    </transition>
    <transition name="bounce"
      ><img
        class="tweet"
        src="/images/zxcv/twitter.png"
        v-on:click="tweet"
        v-if="showingTweetButton"
    /></transition>
    <transition name="left-show-in">
      <div
        class="ui_background_panel"
        v-if="gameState === constants.gameStates.title"
      ></div>
    </transition>
    <transition name="left-show-in">
      <volume
        v-if="gameState === constants.gameStates.title"
        v-bind:volume="volume"
        v-on:setVolume="setVolume"
      ></volume>
    </transition>
    <transition name="left-show-in">
      <name-input-area
        v-if="gameState === constants.gameStates.title"
        v-bind:volume="volume"
        @setName="setName"
        @inputStateChanged="(state)=&gt;{this.$emit('inputStateChanged', state)}"
      ></name-input-area>
    </transition>
    <transition name="left-show-in">
      <div class="high_score" v-if="gameState === constants.gameStates.title">
        ハイスコア： {{ highScore }}
      </div>
    </transition>
    <transition name="left-show-in">
      <ranking v-if="showingRanking" v-bind:ranking="ranking"></ranking>
    </transition>
    <div
      class="hide_ranking_area"
      v-if="showingRanking"
      @click="$emit('hideRanking')"
    ></div>
    <transition name="left-show-in"
      ><img
        class="show_ranking_button"
        v-if="gameState === constants.gameStates.title &amp;&amp; !showingRanking"
        @click="$emit('showRanking')"
        src="/images/zxcv/ranking.png"
    /></transition>
    <minus-list v-bind:minuses="minuses"></minus-list>
    <spark-list v-bind:sparks="sparks"></spark-list>
  </div>
</template>

<script>
import Constants from './packs/constants.js';
import volume from './volume.vue';
import result from './result.vue';
import ranking from './ranking.vue';
import lifeGauge from './lifeGauge.vue';
import minusList from './minusList.vue';
import sparkList from './sparkList.vue';
import nameInputArea from './nameInputArea.vue';

export default {
  components: {
    volume,
    result,
    ranking,
    lifeGauge,
    minusList,
    sparkList,
    nameInputArea,
  },
  data() {
    return {
      loadCompleted: false,
    };
  },
  name: 'ui',
  props: [
    'gameState',
    'life',
    'score',
    'volume',
    'minuses',
    'sparks',
    'speedScore',
    'totalScore',
    'highScore',
    'isHighScoreUpdated',
    'showingRanking',
    'ranking',
  ],
  mounted() {
    this.loadCompleted = true;
  },
  computed: {
    constants() {
      return Constants;
    },
    tweetingMessage() {
      return `ZXCVで ${this.totalScore}点取ったよ！`;
    },
    showingTweetButton() {
      return [
        this.constants.gameStates.cleared,
        this.constants.gameStates.gameOver,
      ].includes(this.gameState);
    },
  },
  methods: {
    tweet() {
      const tweetContent = encodeURI(this.tweetingMessage);
      const url = encodeURI('http://jyllsarta.net/zxcvs');
      const fullUrl = `https://twitter.com/intent/tweet?url=${url}&text=${tweetContent}`;
      window.open(fullUrl);
    },
    setVolume(v) {
      // 最上位のzxcvにvolumeをリレーする
      this.$emit('setVolume', v);
    },
    setName(n) {
      // 最上位のzxcvにnameをリレーする
      this.$emit('setName', n);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/constants";

div {
  font-family: "Kanit", sans-serif;
}

.title {
  white-space: pre;
  position: absolute;
  left: 10%;
  bottom: 40%;
  width: 80%;
  opacity: $transparent_normal;
  font-size: $title_font_size;
  text-align: center;
  color: $letter_color;
}

.game_over {
  position: absolute;
  left: 20%;
  bottom: 44%;
  width: 60%;
  opacity: $transparent_normal;
  font-size: $title_font_size;
  text-align: center;
  color: $negative_color;
}

.score {
  position: absolute;
  left: 20%;
  bottom: 30%;
  width: 60%;
  text-align: center;
  opacity: $transparent_normal;
  font-size: $title_font_size;
  color: $letter_color;
}

.r_to_reset {
  position: absolute;
  left: 20%;
  bottom: 15%;
  width: 60%;
  text-align: center;
  opacity: $transparent_normal;
  font-size: $title_font_size;
}

.tweet {
  position: absolute;
  right: 10%;
  bottom: 10%;
  width: 64px;
  height: 64px;
}

.show_ranking_button {
  position: absolute;
  top: 30%;
  left: -1%;
  width: 64px;
  height: 64px;
  padding: 10px;
  opacity: $transparent_normal;
  background-color: $black;
  border-radius: 8px;
}

.ranking {
  position: absolute;
  top: 35%;
  left: 10%;
  width: 80%;
  height: 60%;
  color: $white;
  background-color: $black;
  opacity: $transparent_normal;
  border-radius: 8px;
}

.hide_ranking_area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.high_score {
  color: $white;
  position: absolute;
  top: 24%;
  left: 0;
  width: 50%;
}

.high_score_updated {
  color: $primary_color;
}

.high_score_text {
  position: absolute;
  left: 30%;
  bottom: 28%;
  width: 60%;
  text-align: center;
  opacity: $transparent_normal;
  font-size: $title_font_size * 0.5;
  color: $primary_color;
}

.ui_background_panel {
  position: absolute;
  top: 10%;
  left: -1%;
  width: 52%;
  height: 19%;
  background-color: $black;
  opacity: $transparent_normal;
  border-radius: 8px;
}

.left-show-in-enter-active {
  transition: all 0.3s;
}
.left-show-in-leave-active {
  transition: all 0.3s;
}
.left-show-in-enter-from {
  transform: translateX(10px);
  opacity: 0;
}
.left-show-in-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.delay-enter-active {
  animation: delay 1.5s;
}
.delay-leave-active {
  animation: delay 1.5s reverse;
}
@keyframes delay {
  0% {
    transform: translateX(0px);
    opacity: 0;
  }
  90% {
    transform: translateX(10px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: $transparent_normal;
  }
}

.bounce-enter-active {
  animation: bounce 0.5s;
}
@keyframes bounce {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
