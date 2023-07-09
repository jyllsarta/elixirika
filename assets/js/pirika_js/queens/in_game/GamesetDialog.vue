<template>
  <div class="dialog" v-if="state">
    <div class="_back" @click="backToMenu"/>
    <div class="content">
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

export default {
  store,
  props: {
    state: State,
  },
  methods: {
    backToMenu(){
      // TODO: 勝敗判定
      Savedata.writeQuestResult(this.state.questId, true);
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
