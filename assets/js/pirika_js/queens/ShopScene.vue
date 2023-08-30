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
            <div class="coin_area">
              <div class="label">所持</div>
              <coin-icon-vue class="coin_icon"/>
              <div class="coin"> : {{ coin() }}</div>
            </div>
          </div>
          <div class="items">
            <shop-item-vue
              v-for="shopItem in shopItems"
              :key="shopItem.id"
              :shop-item="shopItem"
              :equipment="equipment(shopItem.id)"
              @mouseenter="updateCurrentShopItemId(shopItem.id)"
              @buy="onBuy(shopItem.id)"
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
import Savedata from "./packs/savedata";
import CoinIconVue from "./CoinIcon.vue";

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
    CoinIconVue,
  },
  methods: {
    loadMenu(){
      this.$store.commit("loadScene", {name: "menu"});
    },
    equipment(shopItemId){
      const equipment = Masterdata.getBy("equipments", "shop_id", [shopItemId])[0];
      if(!equipment){
        console.warn("equipment not found", shopItemId);
      }
      return equipment;
    },
    updateCurrentShopItemId(id){
      this.currentShopItemId = id;
      this.currentScript = Masterdata.getBy("equipments", "shop_id", [this.currentShopItemId])[0]?.message;
    },
    onCharacterClick(){
      const characterId = 90;
      const scripts = Masterdata
                        .getBy("character_scripts", "character_id", [characterId])
                        .filter(script => script.when == "click")
                        .sort((a, b) => a.order - b.order);
      const script = scripts[this.clickCount % scripts.length];
      this.currentScript = script.message;
      this.clickCount++;
    },
    onBuy(shopItemId){
      // NOTE: 地味にこのcurrentScriptの更新による再計算によって、ShopItemのdisabledが更新される
      // ここで再計算が走らないと、買った後になにかupdateCurrentShopItemIdが呼ばれる用事が発生するまでdisabledが更新されない
      const characterId = 90;
      const script = Masterdata
                      .getBy("character_scripts", "character_id", [characterId])
                      .filter(script => script.when == "buy")[0];
      this.currentScript = script.message;
    },
    coin(){
      return Savedata.coin();
    },
  },
  computed: {
    shopItems(){
      // セーブデータがVue管轄のオブジェクトじゃないことによって購入後にownedのステータスが更新されなかったりするが、逆に直感的な挙動なのでそのままにしておく
      const items = Masterdata.getAll("shop_items");
      const owned = Object.keys(new Savedata().get().shopItems).map(id => parseInt(id));
      const ownedItems = items.filter(item => owned.includes(item.id)).sort((a, b) => a.order - b.order);
      const notOwnedItems = items.filter(item => !owned.includes(item.id)).sort((a, b) => a.order - b.order);
      return notOwnedItems.concat(ownedItems);
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
    height: calc(100% - 80px);
    padding-bottom: 8px;
    .content{
      width: 100%;
      height: 100%;
      max-width: 1200px;
      max-height: 800px;
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
          .coin_area{
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            .label{
              line-height: 100%;
            }
            .coin_icon{
              width: 40px;
              height: 40px;
            }
            .coin{
              line-height: 100%;
            }
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
