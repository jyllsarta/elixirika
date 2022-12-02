<template>
  <div class="main_menu">
    <div class="header">
      <div class="title">メインメニュー</div>
      <div class="description">
        タイルをクリックしてステージ詳細を開き、妖精たちのお手伝いをしてみましょう。
      </div>
    </div>
    <div class="content">
      <div class="tile_section">
        <div class="index">進捗</div>
        <div class="body">
          <div
            class="row"
            v-for="(characterId, index) in [1, 2, 3, 4]"
            :key="index"
          >
            <div class="character">
              <CharacterBanner
                :character="characters[characterId]"
                @selected="onCharacterSelected"
                :bestChapter="findBestChapter(characterId)"
              ></CharacterBanner>
            </div>
            <div
              class="tile"
              v-for="chapter in chapters(characterId)"
              :key="chapter.id"
            >
              <ClearStateTile
                :chapter="chapter"
                :character="characters[characterId]"
                @selected="onTileSelected"
                :challenge-clear-state="challengeClearState(chapter)"
              ></ClearStateTile>
            </div>
            <div class="chapter_scores">
              <div
                class="score"
                v-for="chapter in chapters(characterId)"
                :key="chapter.id"
                :class="{great: highScore(chapter) &gt;= 200}"
              >
                {{ highScore(chapter) }}
              </div>
            </div>
            <div
              class="total_score"
              :class="{great: totalScore(characterId) &gt;= 1000}"
            >
              <div class="score">{{ totalScore(characterId) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="score_section">
        <div class="index">まとめて</div>
        <div class="body">
          <div class="main" :class="{great: finalScore() &gt;= 5000}">
            <div class="score">{{ finalScore() }}</div>
          </div>
          <div
            class="clear_button"
            @click="showClearImage(1)"
            :class="{ active: isClearedImage(1) }"
          >
            ≧ 5000
          </div>
          <div
            class="clear_button"
            @click="showClearImage(2)"
            :class="{ active: isClearedImage(2) }"
          >
            ■ 64
          </div>
        </div>
      </div>
    </div>
    <transition name="detail">
      <div class="main_menu_detail_dialog" v-if="showsDetailDialog">
        <MainMenuDetailDialog
          :character="selectedCharacter"
          :chapter="selectedChapter"
          :challenge-clear-state="challengeClearState(selectedChapter)"
          :high-score="highScore(selectedChapter)"
          :challenge-master="challengeMaster"
          @cancel="showsDetailDialog = false"
          @start="startGame"
        ></MainMenuDetailDialog>
      </div>
    </transition>
    <transition name="clear">
      <ClearImage
        class="clear_image"
        @close="closeClearImage"
        v-if="showsClearImage"
        :clearImageId="clearImageId"
      ></ClearImage>
    </transition>
    <GeneralButton
      class="back_to_title"
      @click="backToTitle"
      :disabled="false"
      :flashing="false"
      :width="'160px'"
      :height="'40px'"
      :color="'blue'"
      :label="'タイトルに戻る'"
    ></GeneralButton>
  </div>
</template>

<script>
import axios from "axios";
import CharacterBanner from "./CharacterBanner.vue";
import ClearStateTile from "./ClearStateTile.vue";
import MainMenuDetailDialog from "./MainMenuDetailDialog.vue";
import GeneralButton from "./GeneralButton.vue";
import ClearImage from "./ClearImage.vue";
import CharacterFactory from "./packs/characterFactory";
import Chapter from "./packs/chapter";
import Challenge from "./packs/challenge";
import store from "./packs/store";

export default {
  store,
  components: {
    CharacterBanner,
    ClearStateTile,
    ClearImage,
    MainMenuDetailDialog,
    GeneralButton,
  },
  data() {
    // methods は頻繁に呼ばれちゃい、キャラファクトリからまいどまいど生成するのはどう考えても高コスト
    // このシーンではマスタの取得結果をストアしちゃう
    const characterFactory = new CharacterFactory();
    const chapterMaster = new Chapter();
    const challengeMaster = new Challenge();

    return {
      characters: [1, 2, 3, 4].reduce((iter, x) => {
        const c = characterFactory.getCharacterById(x);
        iter[c.id] = c;
        return iter;
      }, {}),
      chapterMaster,
      challengeMaster,
      showsDetailDialog: false,
      showsClearImage: false,
      clearImageId: -1,
      selectedCharacterId: -1,
      selectedChapterId: -1,
      userStatus: {
        challenges: [],
        high_score: [],
        challengeClearCount: 0,
      },
    };
  },
  methods: {
    onTileSelected(params) {
      const { characterId, chapterId } = params;
      this.selectedCharacterId = characterId;
      this.selectedChapterId = chapterId;
      this.showsDetailDialog = true;
    },
    onCharacterSelected(params) {
      const { characterId } = params;
      this.selectedCharacterId = characterId;
      this.selectedChapterId = this.findBestChapter(characterId)?.id;
      this.showsDetailDialog = true;
    },
    hideDetailDialog() {
      this.showsDetailDialog = false;
    },
    startGame() {
      this.hideDetailDialog();
      this.$emit("loadScene", {
        sceneName: "inGame",
        params: {
          characterId: this.selectedCharacterId,
          chapterId: this.selectedChapterId,
        },
      });
    },
    chapters(characterId) {
      return this.chapterMaster
        .getByCharacterId(characterId)
        .sort((x) => x.index);
    },
    challengeClearState(chapter) {
      return this.userStatus.challenges[chapter.id] || [];
    },
    highScore(chapter) {
      return this.userStatus.high_score[chapter.id] || 0;
    },
    totalScore(characterId) {
      const chapters = this.chapters(characterId);
      return chapters.reduce((a, b) => this.highScore(b) + a, 0);
    },
    finalScore() {
      return Object.values(this.userStatus.high_score).reduce(
        (a, b) => b + a,
        0,
      );
    },
    isChallengeCleared(chapterId, challengeId) {
      const status =
        this.userStatus.challenges[chapterId]?.indexOf(challengeId);
      return status !== undefined && status !== -1;
    },
    isAllChallengeCleared(chapter) {
      return chapter.challenge_ids.every((x) =>
        this.isChallengeCleared(chapter.id, x),
      );
    },
    findBestChapter(characterId) {
      const chapters = this.chapters(characterId);
      return (
        chapters.find((chapter) => !this.isAllChallengeCleared(chapter)) ||
        chapters[chapters.length - 1]
      );
    },
    fetchMyScore() {
      const params = {
        username: localStorage.rawNameSquare,
      };
      axios
        .get("/square/status", { params })
        .then((results) => {
          this.userStatus = this.constructUserStatus(results.data);
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        });
    },
    constructUserStatus(apiResponse) {
      const { high_score: highScores, challenges: challengeRecords } =
        apiResponse;
      // chapter_id: score の形にしちゃう
      const highScoreIdTable = highScores.reduce((iter, x) => {
        iter[x.chapter_id] = x.score;
        return iter;
      }, {});
      // chapter_id: [challenge_ids(NOT sorted)] の形にしちゃう
      const challengeIdTable = challengeRecords.reduce((iter, x) => {
        iter[x.chapter_id] = iter[x.chapter_id]
          ? iter[x.chapter_id].concat(x.challenge_id)
          : [x.challenge_id];
        return iter;
      }, {});
      return {
        high_score: highScoreIdTable,
        challenges: challengeIdTable,
        challengeClearCount: challengeRecords.length,
      };
    },
    backToTitle() {
      this.$store.commit("playSound", { key: "ok" });
      this.$store.commit("playBgm", "");
      this.$emit("loadScene", { sceneName: "title", params: {} });
    },
    showClearImage(clearImageId) {
      if (!this.isClearedImage(clearImageId)) {
        this.$store.commit("playSound", { key: "miss" });
        return;
      }
      this.$store.commit("playSound", { key: "piano" });
      this.$store.commit("playBgm", "bgm13");
      this.showsClearImage = true;
      this.clearImageId = clearImageId;
    },
    closeClearImage() {
      this.showsClearImage = false;
      this.$store.commit("playBgm", "bgm5");
    },
    isClearedImage(clearImageId) {
      switch (clearImageId) {
        case 1:
          return this.finalScore() >= 5000;
        case 2:
          return this.userStatus.challengeClearCount >= 64;
      }
      return false;
    },
  },
  mounted() {
    this.fetchMyScore();
    this.$store.commit("playBgm", "bgm5");
    this.$store.commit("updateBg", this.characterId);
  },
  computed: {
    selectedCharacter() {
      return this.characters[this.selectedCharacterId];
    },
    selectedChapter() {
      return this.chapterMaster.idTable[this.selectedChapterId];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.main_menu {
  position: relative;
  width: 100%;
  height: 100%;
  color: $white;
  padding: $space-m;
  display: flex;
  flex-direction: column;
  .header {
    .title {
      font-size: $font-size-medium;
    }
    .description {
      font-size: $font-size-normal;
      border-bottom: 1px solid $gray1;
    }
  }
  .content {
    flex: 1;
    min-height: 450px;
    display: flex;
    align-items: top;
    justify-content: center;
    gap: $space-m;
    .tile_section {
      .index {
        margin-top: $space-m;
        margin-bottom: $space-m;
        border-bottom: 1px solid $purple1;
        text-align: center;
      }
      .body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: $space-m;
        .row {
          display: flex;
          gap: $space-m;
          .character {
            width: 300px;
            height: 100px;
          }
          .tile {
            width: 100px;
            height: 100px;
          }
          .chapter_scores {
            height: 100px;
            width: 50px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .score {
              text-align: center;
              width: 100%;
              background-color: $purple4;
              &.great {
                background-color: $purple2;
              }
            }
          }
          .total_score {
            height: 100px;
            width: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: $purple4;
            &.great {
              background-color: $purple2;
            }
          }
        }
      }
    }
    .score_section {
      width: 100px;
      .index {
        margin-top: $space-m;
        margin-bottom: $space-m;
        border-bottom: 1px solid $purple1;
        text-align: center;
      }
      .body {
        display: flex;
        height: 100px * 4 + $space-m * 3;
        gap: $space-m;
        flex-direction: column;
        .main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: $purple4;
          &.great {
            background-color: $purple2;
          }
        }
        .clear_button {
          @include centeringWithBorder($height: 28px, $border: 1px);
          border: 1px solid $purple1;
          transition: transform 0.2s;
          opacity: 0.5;
          &.active {
            opacity: 1;
            animation: activeclear 5s linear alternate infinite;
          }
          &.active:hover {
            transform: scale(1.2);
          }
          @keyframes activeclear {
            0% {
              background-color: $purple2;
            }
            100% {
              background-color: $purple1;
            }
          }
        }
      }
    }
  }
  .main_menu_detail_dialog {
    position: absolute;
    width: 80%;
    height: 70%;
    top: 8%;
    left: 10%;
    z-index: 100;
  }
  .clear_image {
    z-index: 200;
  }
  .back_to_title {
    position: absolute;
    bottom: $space-m;
    right: $space-m;
  }
}

.detail-enter-active {
  transition: all 0.1s;
}
.detail-leave-active {
  transition: all 0.1s;
}
.detail-enter-from {
  transform: scale(0.95);
  opacity: 0;
}
.detail-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>
