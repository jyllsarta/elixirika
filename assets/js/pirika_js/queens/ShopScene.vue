<template>
  <div class="game_window">
    <div class="header">
      <div class="floating_menu tentative_button" @click="loadMenu">
        メニューに戻る
      </div>
      <div class="title">
        ショップ
      </div>
    </div>
    <div class="content_area">
      <div class="content">
        <div class="character tentative_panel">キャラ</div>
        <div class="main">
          <div class="information_area">
            <div class="baloon tentative_panel">誰でも持ってる50シールドですね～。大したことないんですが、それでも2手くらいは耐えるので最低限の仕事はしますよね。</div>
            <div class="coin tentative_panel">コイン: 1111</div>
          </div>
          <div class="items">
            <shop-item-vue class="item"/>
            <shop-item-vue class="item"/>
            <shop-item-vue class="item"/>
            <shop-item-vue class="item"/>
            <shop-item-vue class="item"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "./packs/store";
import ShopItemVue from "./ShopItem.vue";

export default {
  store,
  components: {
    ShopItemVue,
  },
  methods: {
    loadMenu(){
      this.$store.commit("loadScene", {name: "menu"});
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
  display: flex;
  flex-direction: column;
  .header{
    display: flex;
    padding: 8px;
    gap: 8px;
    height: 80px;
    .floating_menu{
      width: 160px;
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
  .content_area{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .content{
      width: 100%;
      height: 100%;
      max-width: 1200px;
      max-height: 600px;
      padding: 8px;
      display: flex;
      border: 1px dotted $white;
      .character{
        width: 30%;
        height: 100%;
      }
      .main{
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        .information_area{
          padding: 8px;
          height: 20%;
          display: flex;
          gap: 8px;
          .baloon{
            width: 50%;
            height: 100%;
          }
          .coin{
            width: 50%;
            height: 100%;
          }
        }
        .items{
          height: 80%;
          overflow-y: scroll;
          .item{
            margin: 8px 8px 0 8px;
            width: calc(100% - 16px);
            height: 100px;
          }
        }
      }
    }
  }
}
</style>
