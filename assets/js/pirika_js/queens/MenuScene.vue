<template>
  <div class="game_window">
    <div class="floating_menu">
      <div class="buttons">
        <div class="tentative_button button disabled">
          戻る
        </div>
        <div class="tentative_button button disabled">
          メニュー
        </div>
      </div>
      <div class="title tentative_panel disabled">
        メインメニュー
      </div>
    </div>
    <div class="content">
      <div class="characters">
        <div class="character" @click="showDetail(1)">
          <div class="tentative_button floating_image">
            キャラ1
          </div>
          <div class="tentative_panel panel">
            色々と説明するよ！
          </div>
        </div>
        <div class="character" @click="showDetail(2)">
          <div class="tentative_button floating_image">
            キャラ2
          </div>
          <div class="tentative_panel panel">
            色々と説明するよ！
          </div>
        </div>
        <div class="character" @click="showDetail(3)">
          <div class="tentative_button floating_image">
            キャラ3
          </div>
          <div class="tentative_panel panel">
            色々と説明するよ！
          </div>
        </div>
        <div class="character" @click="showDetail(4)">
          <div class="tentative_button floating_image">
            キャラ4
          </div>
          <div class="tentative_panel panel">
            色々と説明するよ！
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="tentative_panel coin">
          所持コイン: 150
        </div>
        <div class="tentative_panel skill">
          スキル1
        </div>
        <div class="tentative_panel skill">
          スキル2
        </div>
        <div class="tentative_button button" @click="loadScene('shop')">
          ショップへ
        </div>
        <div class="tentative_button button" @click="loadScene('equipment')">
          装備へ
        </div>
        <div class="tentative_button button disabled">
          実績へ
        </div>
      </div>
    </div>
    <character-detail-dialog v-if="showingDetail" @close="showingDetail = false"/>
    <second-break-dialog-vue class="second_break" v-if="false"/>
  </div>
</template>

<script>
import CharacterDetailDialog from './CharacterDetailDialog.vue';
import SecondBreakDialogVue from './SecondBreakDialog.vue';
import store from "./packs/store";

export default {
  store,
  components: {
    CharacterDetailDialog,
    SecondBreakDialogVue,
  },
  data(){
    return {
      showingDetail: false
    }
  },
  methods: {
    loadScene(name){
      this.$store.commit("loadScene", {name: name});
    },
    showDetail(id){
      this.showingDetail = true;
    }
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.game_window{
  width: 100%;
  height: 100%;
  background-color: $bg4;
  position: relative;
  .second_break{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .floating_menu{
    position: absolute;
    display: flex;
    padding: 8px;
    gap: 8px;
    z-index: 10;
    .buttons{
      height: 140px;
      gap: 8px;
      display: flex;
      flex-direction: column;
      .button{
        width: 60px;
        height: 60px;
      }
    }
    .title{
      font-size: 30px;
      width: 300px;
      height: 60px;
    }
  }
  .content{
    width: 100%;
    height: 100%;
    display: flex;
    gap: 8px;
    flex-direction: column;
    z-index: 5;
    .characters{
      height: 80%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 8px;
      .character{
        width: 200px;
        height: 400px;
        position: relative;
        .floating_image{
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .panel{
          width: 100%;
          height: 100px;
          position: absolute;
          bottom: 0;
        }
      }
    }
    .footer{
      height: 20%;
      display: flex;
      justify-content: space-around;
      gap: 8px;
      padding: 8px;
      .coin{
        width: 100px;
        height: 100px;
      }
      .skill{
        width: 150px;
        height: 100px;
      }
      .button{
        width: 250px;
        height: 100px;
      }
    }
  }
}
</style>
