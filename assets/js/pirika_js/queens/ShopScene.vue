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
      <div class="content tentative_panel">
        <div class="character tentative_panel">キャラ</div>
        <div class="main">
          <div class="information_area">
            <div class="baloon tentative_panel">もってってー</div>
            <div class="coin tentative_panel">コイン: 1111</div>
          </div>
          <div class="items">
            <div class="item tentative_panel">1</div>
            <div class="item tentative_panel">2</div>
            <div class="item tentative_panel">3</div>
            <div class="item tentative_panel">4</div>
            <div class="item tentative_panel">5</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "./packs/store";

export default {
  store, 
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
