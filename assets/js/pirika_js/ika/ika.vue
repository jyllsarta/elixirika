<template>
  <div id="app">
    <div class="main">
      <h1>キャベツを我慢するフグ</h1>
      <div class="words">
        <div class="word" v-for="i in [0, 1, 2]" @click="stop(i)" :key="i">
          {{ words[i][wordIndex[i]] }}
        </div>
      </div>
      <div class="buttons">
        <div
          class="button"
          v-for="i in [0, 1, 2]"
          @click="stop(i)"
          :class="shuffling[i] ? 'active' : 'stopped'"
          :key="i"
        >
          STOP
        </div>
      </div>
      <div class="controls">
        <div
          class="item restart"
          @click="restart"
          v-if="shuffling.every(c=&gt;!c)"
        >
          リスタート
        </div>
        <div class="item tweet" @click="tweet" v-if="shuffling.every(c=&gt;!c)">
          ツイート
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shuffling: [true, true, true],
      wordIndex: [0, 0, 0],
      words: [
        ["キャベツを", "水を", "昼食を"],
        ["食べる", "吐く", "我慢する"],
        ["ウニ", "フグ", "イカ"],
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      setInterval(() => {
        this.update();
      }, 50);
    },
    update() {
      this.shuffle();
    },
    stop(i) {
      this.shuffling[i] = false;
    },
    shuffle() {
      for (const i of [0, 1, 2]) {
        if (this.shuffling[i]) {
          this.wordIndex[i] = this.rand(3);
        }
      }
    },
    rand(max) {
      return Math.floor(Math.random() * max);
    },
    restart() {
      for (const i of [0, 1, 2]) {
        this.shuffling[i] = true;
      }
    },
    tweetingMessage() {
      let msg = "";
      for (const i of [0, 1, 2]) {
        msg += this.words[i][this.wordIndex[i]];
      }
      return msg;
    },
    tweet() {
      const tweetContent = encodeURI(this.tweetingMessage());
      const url = encodeURI("https://jyllsarta.net/ika");
      const fullUrl = `https://twitter.com/intent/tweet?url=${url}&text=${tweetContent}`;
      window.open(fullUrl);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  h1 {
    margin-bottom: 50px;
  }
  width: 80%;
  margin: 10px auto;
  .words {
    margin-bottom: 20px;
    display: flex;
    .word {
      width: 33%;
      height: 30px;
      font-size: 20px;
      padding-top: 5px;
      line-height: 100%;
      text-align: center;
    }
  }
  .buttons {
    display: flex;
    margin-bottom: 50px;
    .button {
      width: 33%;
      height: 40px;
      font-size: 20px;
      padding-top: 10px;
      line-height: 100%;
      text-align: center;
      border-radius: 5px;
      color: white;
      margin: 10px;
    }
    .active {
      background-color: #f08737;
    }
    .stopped {
      background-color: #f7c5b2;
    }
  }
  .controls {
    display: flex;
    justify-content: space-around;
    .item {
      width: 35%;
      height: 50px;
      font-size: 20px;
      padding-top: 15px;
      line-height: 100%;
      text-align: center;
      border-radius: 5px;
      margin: 10px;
      color: white;
    }
    .restart {
      background-color: #63b858;
    }
    .tweet {
      background-color: #4287f5;
    }
  }
}
</style>
