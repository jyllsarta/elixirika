<template>
  <div class="dialog" v-if="state">
    <div class="_back" @click="proceed"/>
    <div class="content">
      <div class="result">
        <div class="score_row">
          <div class="name">プレイヤー</div>
          <div class="score">{{state.player.score}}</div>
          <div class="tie">-</div>
          <div class="score">{{state.enemy.score}}</div>
          <div class="name">トローズ</div>
        </div>
        <div class="row">
          <div class="name">トローズ</div>
          <div class="before">{{state.uiState.prevPersistentData.enemyBankroll}}</div>
          <div class="arrow">→</div>
          <div class="after">{{state.persistentData.enemyBankroll}}</div>
        </div>
        <div class="row">
          <div class="name">プレイヤー</div>
          <div class="before">{{state.uiState.prevPersistentData.playerBankroll}}</div>
          <div class="arrow">→</div>
          <div class="after">{{state.persistentData.playerBankroll}}</div>
        </div>
      </div>
      <div class="close">
        <div class="button" @click="proceed" v-if="!state.persistentData.isGameEnd()">
          次のマッチへ
        </div>
        <div class="button" @click="proceed" v-if="state.persistentData.isGameEnd()">
          メニューに戻る
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import State from "../packs/model/state";
import Savedata from '../packs/savedata';
import store from '../packs/store';

export default {
  store,
  props: {
    state: State,
  },
  methods: {
    proceed() {
      if(this.state.persistentData.isGameEnd()){
        this.backToMenu();
      }
      else{
        this.nextGame();
      }
    },
    nextGame() {
      console.log("close");
      this.$emit("close");
    },
    backToMenu(){
      Savedata.writeQuestResult(this.state.questId, this.state.persistentData.isWin())
      this.$store.commit("loadScene", {name: "menu"});
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.dialog{
  ._back {
    position: absolute;
    // 画面横幅のなにもない領域 - 20px まで当たり判定を持つ
    right: calc((1200px - 100vw + 20px) / 2);
    top: 0;
    width: 100vw;
    height: 90vh;
  }

  .content{
    position: absolute;
    top: 20%;
    left: 20%;
    height: 60%;
    width: 60%;
    background-color: $bg3;
    border: 2px solid $base2;
    .result{
      width: 100%;
      height: 70%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
      .score_row{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        gap: 8px;
        font-size: 20px;
        div{
          width: 15%;
          text-align: center;
        }
      }
      .row{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        div{
          width: 15%;
          text-align: center;
        }
      }
    }
    .close{
      display: flex;
      justify-content: center;
      align-items: center;
      .button{
        border: 1px solid $base2;
        padding: 20px;
      }
    }
  }
}
</style>
