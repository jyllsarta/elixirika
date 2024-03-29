<template>
  <div id="app">
    <h1>zxcv</h1>
    <back
      v-bind:notes="notes"
      v-bind:initialNoteCount="initialNoteCount"
    ></back>
    <div class="window">
      <notes v-bind:notes="recentNotes"></notes>
      <ui
        v-bind:life="life"
        v-bind:gameState="gameState"
        v-bind:score="score"
        v-bind:volume="volume"
        v-bind:minuses="minuses"
        v-bind:sparks="sparks"
        v-bind:speedScore="speedScore"
        v-bind:totalScore="totalScore"
        v-bind:highScore="highScore"
        v-bind:isHighScoreUpdated="isHighScoreUpdated"
        v-bind:showingRanking="showingRanking"
        v-bind:ranking="ranking"
        v-on:setVolume="setVolume"
        v-on:setName="setName"
        v-on:hideRanking="showingRanking = false"
        v-on:showRanking="showingRanking = true"
        v-on:inputStateChanged="(state)=&gt;{this.inputtingName = state}"
      ></ui>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notes from "./notes.vue";
import back from "./back.vue";
import ui from "./ui.vue";
import DefaultNotePattern from "./packs/defaultNotePattern.js";
import Constants from "./packs/constants.js";
import Keyboard from "./packs/keyboard.js";

export default {
  components: {
    notes,
    ui,
    back,
  },
  data() {
    return {
      notes: [],
      keyboard: null,
      username: "",
      highScore: 0,
      score: 0,
      life: 0,
      gameState: 0,
      startedTime: 0,
      clearedTime: 0,
      currentTime: 0,
      timeDelta: 0,
      sounds: {},
      volume: 1,
      minuses: [],
      sparks: [],
      initialNoteCount: 0,
      inputtingName: false,
      isHighScoreUpdated: false,
      showingRanking: false,
      ranking: [],
    };
  },
  created() {
    this.reset();
    this.invokeUpdate();
    this.loadSounds();
    this.mountKeyboard();
    this.loadCookieSoundVolume();
  },
  mounted() {
    this.getHighScore();
    this.getRanking();
  },
  watch: {
    volume(altered) {
      localStorage.volume = altered;
    },
    showingRanking(altered) {
      this.playSound("heal", true);
    },
  },
  computed: {
    recentNotes() {
      return this.notes.slice(0, Constants.displayNotes).reverse();
    },
    isDanger() {
      return this.life < Constants.dangerLine;
    },
    alive() {
      return this.life > 0;
    },
    bpm() {
      return Math.floor(
        (this.initialNoteCount / (this.clearedTime - this.startedTime)) *
          60 *
          1000,
      );
    },
    speedScore() {
      return Math.floor(this.bpm / 5) || 0;
    },
    totalScore() {
      let { score } = this;
      if (this.gameState === Constants.gameStates.cleared) {
        score += this.speedScore;
      }
      return score;
    },
  },
  methods: {
    // initializers
    initNotes() {
      // ノーツ列を取得
      const notePattern = DefaultNotePattern.generateNotes();
      this.notes = [];
      for (const note of notePattern) {
        this.notes.push(this.newNote(note, 2));
      }
      // 40ノーツごとに回復ノーツにする
      for (let i = 0; i < this.notes.length; i++) {
        if (i % Constants.healNotesInterval === 0) {
          this.notes[i].heal = true;
        }
      }

      // 100ノーツごとに色を変える
      for (let i = 0; i < this.notes.length; i++) {
        this.notes[i].colorId = Math.floor(i / 100) + 1;
      }

      this.initialNoteCount = this.notes.length;
    },

    newNote(note) {
      return {
        id: Math.floor(Math.random() * 100000000000),
        note,
        z: note & Constants.notes.z,
        x: note & Constants.notes.x,
        c: note & Constants.notes.c,
        v: note & Constants.notes.v,
        bad: false,
        heal: false,
        colorId: 1,
      };
    },

    createMinusEffect() {
      this.minuses.push({
        id: Math.floor(Math.random() * 100000000000),
      });
    },

    createSparkEffect() {
      this.sparks.push({
        id: Math.floor(Math.random() * 100000000000),
      });
    },

    flushMinusEffects() {
      this.minuses = [];
    },

    flushSparkEffects() {
      this.sparks = [];
    },

    reset() {
      this.gameState = Constants.gameStates.title;
      this.initNotes();
      this.score = 0;
      this.life = Constants.maxLife;
      this.currentTime = 0;
      this.currentTime = 0;
      this.timeDelta = 0;
      this.startedTime = 0;
      this.clearedTime = 0;
      this.flushMinusEffects();
      this.flushSparkEffects();
      this.getHighScore();
      this.getRanking();
      this.inputtingName = false;
      this.isHighScoreUpdated = false;
      this.showingRanking = false;
    },

    loadSounds() {
      this.sounds.z = new Audio("/game/zxcv/sounds/z.wav");
      this.sounds.x = new Audio("/game/zxcv/sounds/x.wav");
      this.sounds.c = new Audio("/game/zxcv/sounds/c.wav");
      this.sounds.v = new Audio("/game/zxcv/sounds/v.wav");
      this.sounds.miss = new Audio("/game/zxcv/sounds/miss.wav");
      this.sounds.heal = new Audio("/game/zxcv/sounds/heal.wav");
      this.sounds.dead = new Audio("/game/zxcv/sounds/dead.wav");
      this.sounds.clear = new Audio("/game/zxcv/sounds/clear.wav");
      this.sounds.reset = new Audio("/game/zxcv/sounds/reset.wav");
      this.sounds.start = new Audio("/game/zxcv/sounds/start.wav");
      this.sounds.high_score = new Audio("/game/zxcv/sounds/high_score.wav");
    },

    loadCookieSoundVolume() {
      if (localStorage.volume) {
        this.volume = localStorage.volume;
      }
    },

    mountKeyboard() {
      this.keyboard = new Keyboard();
      this.keyboard.mount();
      this.keyboard.addKeyboardEvent(this.triggerKeyboardEvents);
    },

    playSound(soundId, interruptPreviousSound = true) {
      if (interruptPreviousSound) {
        this.sounds[soundId].currentTime = 0;
      }
      this.sounds[soundId].volume = this.volume;
      this.sounds[soundId].play();
    },

    invokeUpdate() {
      this.updateTime();
      switch (this.gameState) {
      case Constants.gameStates.title:
        break;
      case Constants.gameStates.inGame:
        this.updateInGame();
        break;
      case Constants.gameStates.gameOver:
        break;
      case Constants.gameStates.cleared:
        break;
      default:
        console.error(`undefined game mode set: ${this.gameState} on update`);
        break;
      }
      requestAnimationFrame(this.invokeUpdate);
    },

    updateTime() {
      const prevTime = this.currentTime;
      const now = new Date().getTime();
      this.timeDelta = now - prevTime;
      this.currentTime = now;
    },

    updateInGame() {
      // 既存のエフェクトをすべて飛ばす
      this.flushMinusEffects();
      this.flushSparkEffects();

      // 死亡判定
      if (!this.alive) {
        this.playSound("dead", false);
        this.sendResult();
        this.gameState = Constants.gameStates.gameOver;
        return;
      }

      let damage = Math.max(
        this.score * Constants.damageIncreaseSpeed,
        Constants.minDamagePerLife,
      );
      damage *= this.timeDelta / 17; // 1F=17msに合わせて補正する
      if (this.isDanger) {
        damage *= 1 - Constants.dangerDamageReduceRate;
      }
      this.life -= damage;
    },

    triggerKeyboardEvents() {
      switch (this.gameState) {
      case Constants.gameStates.title:
        this.handleKeyTitle();
        break;
      case Constants.gameStates.inGame:
        this.handleKeyInGame();
        break;
      case Constants.gameStates.gameOver:
        this.handleKeyGameOver();
        break;
      case Constants.gameStates.cleared:
        this.handleKeyCleared();
        break;
      default:
        console.error(
          `undefined game mode set: ${this.gameState} on trigger Key Event`,
        );
        break;
      }
    },

    keyboardStatus() {
      let result = 0;
      for (const [key, value] of Object.entries(Constants.notes)) {
        if (this.keyboard.get(key)) {
          result += value;
        }
      }
      return result;
    },

    // zxcvと1248の相互変換がめんどいでござる
    lastKey() {
      for (const key of Object.keys(Constants.notes)) {
        if (this.keyboard.get(key) === 1) {
          return key;
        }
      }
      return "";
    },

    handleKeyTitle() {
      if (this.keyboardStatus() && !this.inputtingName) {
        this.playSound("start", false);
        this.startedTime = new Date().getTime();
        this.showingRanking = false;
        this.gameState = Constants.gameStates.inGame;
      }
    },

    handleKeyInGame() {
      // 死んでたらキーの処理をしない
      if (!this.alive) {
        return;
      }

      // rでいつでもリトライ可能(でもプレイログ送信はする)
      if (this.keyboard.get("r")) {
        this.playSound("reset", false);
        this.sendResult();
        this.reset();
        return;
      }

      const keyStatus = this.keyboardStatus();
      const lastKey = this.lastKey();

      // 「今」押されたキーが次のノーツと一切関係がなかったらBAD
      // 全押しは想定外だった... 全押し扱いになってもBADとします
      // https://twitter.com/shuymn/status/1171479428267794433
      if ((keyStatus & this.notes[0].note) === 0 || keyStatus === 0b1111) {
        this.score -= 1;
        this.life -= Constants.badDamage;
        this.notes[0].bad = true;
        this.playSound("miss");
        this.createMinusEffect();
        return;
      }

      if ((keyStatus & this.notes[0].note) === this.notes[0].note) {
        // 現状の構造だとキーが押されているかどうかしか判定されないので
        this.playSound(lastKey);
        this.score++;
        if (this.notes[0].heal) {
          this.life += Constants.recoverPerHealNote;
          this.playSound("heal", false);
        } else {
          this.life += Constants.recoverPerNote;
        }
        this.life = Math.min(this.life, Constants.maxLife);
        this.createSparkEffect();
        this.notes.shift();
      }

      // クリア判定
      if (this.notes.length === 0) {
        this.playSound("clear", false);
        this.clearedTime = new Date().getTime();
        this.gameState = Constants.gameStates.cleared;
        this.sendResult();
      }
    },

    handleKeyGameOver() {
      if (this.keyboard.get("r")) {
        this.playSound("reset", false);
        this.reset();
      }
    },

    handleKeyCleared() {
      if (this.keyboard.get("r")) {
        this.playSound("reset", false);
        this.reset();
      }
    },

    sendResult() {
      axios
        .post(location.href, {
          // jQueryを別途読み込んでいる
          // eslint-disable-next-line no-undef
          _csrf_token: $("meta[name=csrf-token]").attr("content"),
          username: this.username,
          speed_score: this.speedScore,
          score: this.score,
          total_score: this.totalScore,
        })
        .then((results) => {
          if (
            results.data.is_high_score &&
            this.gameState !== Constants.gameStates.title
          ) {
            this.isHighScoreUpdated = true;
            this.playSound("high_score", false);
          }
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        });
    },

    getHighScore() {
      axios
        .get(`${location.href}/high_score?username=${this.username}`)
        .then((results) => {
          if (this.username !== "") {
            this.highScore = results.data.high_score;
          } else {
            console.warn("ユーザ名未設定のためハイスコアは埋めません");
          }
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        });
    },

    getRanking() {
      axios
        .get(`${location.href}/ranking`)
        .then((results) => {
          this.ranking = results.data.ranking;
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        });
    },

    setVolume(vol) {
      this.volume = vol;
      this.playSound("z");
    },
    setName(name) {
      this.username = name;
      this.getHighScore();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/constants";
#app {
  position: relative;
  padding: 10px;
}

.menu_item {
  font-size: 100px;
}

.window {
  display: block;
  position: relative;
  width: $note_width * 4 + 50;
  height: $note_height * $note_count + 100;
  padding: 50px 25px 150px 25px;
  margin: auto;
}

.ui {
  z-index: 100;
}
</style>
