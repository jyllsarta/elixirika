<template>
  <div class="game_window">
    <div class="header">
      <floating-menu-vue class="floating_menu"/>
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
      </div>
      <div class="footer">
        <coin-vue/>
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
    <character-detail-dialog class="character_detail" v-if="showingDetail" @close="showingDetail = false" @showScene="showScene" :characterId="showingCharacterId"/>
    <scene-dialog-vue class="scene" v-if="showingScene" @close="showingScene = false" :sceneId="sceneId"/>
  </div>
</template>

<script>
import CharacterDetailDialog from './CharacterDetailDialog.vue';
import SceneDialogVue from './SceneDialog.vue';
import CharacterVue from "./menu/Character.vue";
import CoinVue from './menu/Coin.vue';
import store from "./packs/store";
import SkillVue from './menu/Skill.vue';
import MenuBackgroundVue from './MenuBackground.vue';
import FloatingMenuVue from './FloatingMenu.vue';

export default {
  store,
  components: {
    CharacterDetailDialog,
    SceneDialogVue,
    CharacterVue,
    CoinVue,
    SkillVue,
    MenuBackgroundVue,
    FloatingMenuVue
  },
  data(){
    return {
      showingDetail: false,
      showingCharacterId: 1,
      showingScene: false,
      sceneId: 0,
    }
  },
  methods: {
    loadScene(name){
      this.$store.commit("loadScene", {name: name});
    },
    showDetail(id){
      this.showingDetail = true;
      this.showingCharacterId = id;
    },
    showScene(sceneId){
      this.showingScene = true;
      this.sceneId = sceneId;
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
  .scene{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
  .header{
    position: absolute;
    display: flex;
    padding: 8px;
    gap: 8px;
    z-index: 10;
    .floating_menu{
      width: 70px;
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
      gap: 16px;
      padding: 8px;
      .button{
        flex: 1;
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
