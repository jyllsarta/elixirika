<template>
  <div class="item" :class="{disabled: disabled()}">
    <div class="icon_area">
      <shop-item-icon
        :shop-item="shopItem"
        :equipment="equipment"
      />
    </div>
    <div class="main">
      <div class="name">{{equipment.title}}</div>
      <div class="description">{{ equipment.description }}</div>
    </div>
    <div class="price_area">
      <div class="coin_icon tentative_panel"></div>
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
</template>

<script>
import Savedata from './packs/savedata';
import store from "./packs/store";
import ShopItemIcon from "./ShopItemIcon.vue";

export default {
  store,
  components: {
    ShopItemIcon,
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
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.item{
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
</style>
