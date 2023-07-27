<template>
  <div class="item">
    <div class="icon_area">
      <div class="icon tentative_panel"></div>
    </div>
    <div class="main">
      <div class="name">{{equipment.title}}</div>
      <div class="description">{{ equipment.description }}</div>
    </div>
    <div class="price_area">
      <div class="coin_icon tentative_panel"></div>
      <div class="price">5</div>
    </div>
    <div class="buy_area">
      <div class="buy_button tentative_button">買う</div>
    </div>
  </div>
</template>

<script>
import store from "./packs/store";

export default {
  store,
  props: {
    shopItem: Object,
    equipment: Object,
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.item{
  display: flex;
  border: 1px dotted $white;
  .icon_area{
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon{
      width: 64px;
      height: 64px;
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
      width: 64px;
      height: 64px;
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
