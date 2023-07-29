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
        <div class="character" @click="onCharacterClick">
          <img src="images/queens/characters/character90_1.png" class="character_image">
        </div>
        <div class="main">
          <div class="information_area">
            <div class="baloon tentative_panel">{{ currentScript }}</div>
            <div class="coin tentative_panel">コイン: 1111</div>
          </div>
          <div class="items">
            <shop-item-vue
              v-for="shopItem in shopItems"
              :key="shopItem.id"
              :shop-item="shopItem"
              :equipment="equipment(shopItem.id)"
              @mouseenter="updateCurrentShopItemId(shopItem.id)"
              class="item"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "./packs/store";
import ShopItemVue from "./ShopItem.vue";
import Masterdata from "./packs/masterdata";

export default {
  store,
  data(){
    return {
      currentShopItemId: null,
      currentScript: "-",
      clickCount: 0,
    }
  },
  components: {
    ShopItemVue,
  },
  methods: {
    loadMenu(){
      this.$store.commit("loadScene", {name: "menu"});
    },
    equipment(shopItemId){
      return Masterdata.getBy("equipments", "shop_id", [shopItemId])[0];
    },
    updateCurrentShopItemId(id){
      this.currentShopItemId = id;
      this.currentScript = Masterdata.getBy("equipments", "shop_id", [this.currentShopItemId])[0]?.message;
    },
    onCharacterClick(){
      const characterId = 90;
      const scripts = Masterdata.getBy("character_scripts", "character_id", [characterId]).sort((a, b) => a.order - b.order);
      const script = scripts[this.clickCount % scripts.length];
      this.currentScript = script.message;
      this.clickCount++;
    }
  },
  computed: {
    shopItems(){
      return Masterdata.getAll("shop_items");
    },
  }
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
        overflow: hidden;
        .character_image{
          width: 130%;
          transform: translateX(-10%);
        }
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
