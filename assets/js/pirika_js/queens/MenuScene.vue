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
      <div class="title">
        メインメニュー
      </div>
    </div>
    <menu-background-vue class="background"/>
    <div class="content">
      <div class="characters">
        <character-vue @select="showDetail(1)" :characterId="1"/>
        <character-vue @select="showDetail(2)" :characterId="2"/>
        <character-vue @select="showDetail(3)" :characterId="3"/>
        <character-vue @select="showDetail(4)" :characterId="4"/>
      </div>
      <div class="footer">
        <coin-vue/>
        <skill-vue :index="1"/>
        <skill-vue :index="2"/>
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
    <character-detail-dialog class="character_detail" v-if="showingDetail" @close="showingDetail = false"/>
    <second-break-dialog-vue class="second_break" v-if="false"/>
  </div>
</template>

<script>
import CharacterDetailDialog from './CharacterDetailDialog.vue';
import SecondBreakDialogVue from './SecondBreakDialog.vue';
import CharacterVue from "./menu/Character.vue";
import CoinVue from './menu/Coin.vue';
import store from "./packs/store";
import Savedata from './packs/savedata';
import SkillVue from './menu/Skill.vue';
import MenuBackgroundVue from './MenuBackground.vue';

export default {
  store,
  components: {
    CharacterDetailDialog,
    SecondBreakDialogVue,
    CharacterVue,
    CoinVue,
    SkillVue,
    MenuBackgroundVue,
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
    },
    saveData(){
      return new Savedata().get();
    }
  },
  computed: {
  }
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
      padding-top: 15px;
      line-height: 100%;
      border-bottom: 1px dotted $white;
    }
  }
  .background{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .content{
    width: 100%;
    height: 100%;
    display: flex;
    gap: 8px;
    flex-direction: column;
    position: absolute;
    z-index: 5;
    .characters{
      height: 85%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 8px;
    }
    .footer{
      height: 15%;
      min-height: 120px;
      display: flex;
      justify-content: space-around;
      gap: 8px;
      padding: 8px;
      .button{
        width: 250px;
        height: 100px;
      }
    }
  }
  .character_detail{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
}
</style>
