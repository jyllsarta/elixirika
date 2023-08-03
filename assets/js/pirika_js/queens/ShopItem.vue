<template>
  <div class="wrapper">
    <div class="item">
      <div class="icon_area">
        <item-icon
          :shop-item="shopItem"
          :equipment="equipment"
        />
      </div>
      <div class="main">
        <div class="name">{{equipment.title}}</div>
        <div class="description">{{ equipment.description }}</div>
      </div>
      <div class="price_area">
        <coin-icon-vue class="coin_icon"/>
        <div class="price">{{ shopItem.price }}</div>
      </div>
      <div class="buy_area">
        <div 
          class="buy_button tentative_button"
          @click="buy"
          :class="{disabled: !canBuy()}"
        >
          買う
        </div>
      </div>
    </div>
    <div class="lock_text_area" v-if="!canBuy()">
      <div class="background" />
      <div class="lock_text">
        <div class="text">
          {{ lockText() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoinIconVue from './CoinIcon.vue';
import Masterdata from './packs/masterdata';
import Savedata from './packs/savedata';
import store from "./packs/store";
import ItemIcon from "./ItemIcon.vue";

export default {
  store,
  components: {
    ItemIcon,
    CoinIconVue,
  },
  props: {
    shopItem: Object,
    equipment: Object,
  },
  methods: {
    canBuy(){
      //お金足りてるか
      if(Savedata.coin() < this.shopItem.price){
        return false;
      }
      //すでに所持済みか
      if(Savedata.hasShopItem(this.shopItem.id)){
        return false;
      }
      //前提クエストをクリアしているか
      if(this.shopItem.quest_id && !Savedata.isWin(this.shopItem.quest_id)){
        return false;
      }
      return true;
    },
    buy(){
      if(!this.canBuy()){
        return;
      }
      Savedata.buyShopItem(this.shopItem.price, this.shopItem.id);
      this.$emit("buy");
    },
    disabled(){
      return !this.canBuy();
    },
    lockText(){
      if(Savedata.hasShopItem(this.shopItem.id)){
        return "購入済";
      }
      if(Savedata.coin() < this.shopItem.price){
        return "お金が足りません";
      }
      if(this.shopItem.quest_id && !Savedata.isWin(this.shopItem.quest_id)){
        const quest = Masterdata.get("quests", this.shopItem.quest_id);
        const characterName = Masterdata.get("characters", quest.character_id).name;
        return `${characterName} の ${quest.name} をクリアで入荷`;
      }
      return "";
    }
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.wrapper{
  width: 100%;
  height: 100%;
  position: relative;
  .lock_text_area{
    position: absolute;
    width: 100%;
    height: 100%;
    .background{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: $bg3;
      opacity: 0.3;
    }
    .lock_text{
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .text{
        background-color: $bg3;
        line-height: 100%;
        width: 50%;
        text-align: center;
      }
    }
  }
  .item{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    border: 1px dotted $white;
    &.disabled{
      opacity: 0.5;
    }
    .icon_area{
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon{
        width: 120px;
        height: 80px;
      }
    }
    .main{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      width: 45%;
      padding: 8px;
      .name{
      font-size: $font-size-large;
      line-height: 100%;
      }
      .description{
        flex: 1;
      }
    }
    .price_area{
      width: 25%;
      height: 100%;
      display: flex;
      gap: 8px;
      align-items: center;
      .coin_icon{
        width: 48px;
        height: 48px;
      }
      .price{
        font-size: $font-size-large;
        flex: 1;
        text-align: center;
      }
    }
    .buy_area{
      width: 15%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .buy_button{
        width: 100px;
        height: 64px;
        padding: 8px;
      }
    }
  }
}
</style>
