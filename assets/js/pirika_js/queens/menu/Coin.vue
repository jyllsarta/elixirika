<template>
  <div class="coin_area">
    <coin-icon-vue class="coin_icon"/>
    <div class="value">
      {{saveData().coin}}
    </div>
  </div>
</template>

<script>
import store from "../packs/store";
import Savedata from '../packs/savedata';
import CoinIconVue from '../CoinIcon.vue';

export default {
  store, 
  components: {
    CoinIconVue,
  },
  methods: {
    saveData(){
      return new Savedata().get();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.coin_area{
  width: 200px;
  height: 100px;
  border: 1px dotted $white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  line-height: 100%;
  .coin_icon{
    width: 40px;
    height: 40px;
  }
  .value{
    font-size: $font-size-large;
  }
}
</style>
