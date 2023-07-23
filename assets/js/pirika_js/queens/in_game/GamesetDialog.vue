<template>
  <div class="dialog" v-if="state">
    <div class="_back" @click="backToMenu"/>
    <div class="content">
      <div class="title">
        {{ state.isWin() ? "勝利！" : "まけ" }}
      </div>
      <div class="character">
        <img :src="`images/queens/characters/character${quest?.character_id}_1.png`" class="image">
      </div>
      <div class="script">
        {{ state.isWin() ? quest?.win_script : quest?.lose_script }}
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

export default {
  store,
  props: {
    state: State,
  },
  methods: {
    backToMenu(){
      const result = this.state.isWin();
      Savedata.writeQuestResult(this.state.questId, result);
      this.$store.commit("loadScene", {name: "menu"});
    }
  },
  computed: {
    quest(){
      return Masterdata.get("quests", this.state.questId);
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
    top: 20%;
    left: 20%;
    height: 60%;
    width: 60%;
    background-color: $bg3;
    border: 2px solid $base2;
    .title{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20%;
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
    .close{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20%;
      .button{
        border: 1px solid $base2;
        padding: 20px;
      }
    }
  }
}
</style>
