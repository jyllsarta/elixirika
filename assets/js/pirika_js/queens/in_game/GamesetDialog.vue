<template>
  <div class="dialog" v-if="state">
    <div class="_back" @click="backToMenu"/>
    <div class="content">
      <div class="title">
        {{ state.isWin() ? "勝利！" : "まけ" }}
      </div>
      <div class="character">
        <img :src="`images/queens/characters/character${quest?.character_id}_${faceId}.png`" class="image">
      </div>
      <div class="script">
        {{ state.isWin() ? quest?.win_script : quest?.lose_script }}
      </div>
      <div class="reward" v-if="state.isWin()">
        <coin-icon-vue class="coin_icon"/>
        <div class="value">
          +{{ quest?.win_coin }}
        </div>
      </div>
      <div class="close">
        <div class="button" @click="backToMenu">
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
import Masterdata from '../packs/masterdata';
import CoinIconVue from '../CoinIcon.vue';

export default {
  store,
  components: {
    CoinIconVue,
  },
  props: {
    state: State,
  },
  methods: {
    backToMenu(){
      const result = this.state.isWin();
      // 勝利時には入場料も返却される
      const rewardCoin = this.quest.win_coin + this.quest.lose_coin;
      Savedata.writeQuestResult(this.state.questId, result, rewardCoin);
      this.$store.commit("loadScene", {name: "menu"});
    }
  },
  computed: {
    quest(){
      return Masterdata.get("quests", this.state.questId);
    },
    faceId(){
      const key = this.state.isWin() ? "win_face_id" : "lose_face_id";
      return this.quest[key];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.dialog{
  ._back {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 90vh;
  }

  .content{
    position: absolute;
    top: 15%;
    left: 15%;
    height: 70%;
    width: 70%;
    background-color: $bg3;
    border: 2px solid $base2;
    .title{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 15%;
      font-size: $font-size-large;
    }
    .character{
      position: relative;
      width: 100%;
      height: 50%;
      overflow: hidden;
      .image{
        transform: translateY(-10%);
        width: 100%;
      }
    }
    .script{
      height: 10%;
      padding: 8px;
      width: 100%;
      text-align: center;
    }

    .reward{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 10%;
      .coin_icon{
        width: 40px;
        height: 40px;
      }
      .value{
        font-size: $font-size-large;
      }
    }
    .close{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 15%;
      .button{
        border: 1px solid $base2;
        padding: 20px;
      }
    }
  }
}
</style>
