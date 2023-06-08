<template>
  <div class="coin">
    <div class="label">
      所持コイン
    </div>
    <div class="value">
      {{saveData().coin}}
    </div>
  </div>
</template>

<script>
import store from "../packs/store";
import Savedata from '../packs/savedata';

export default {
  store, 
  methods: {
    saveData(){
      return new Savedata().get();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.coin{
  width: 100px;
  height: 100px;
  border: 1px dotted $white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  line-height: 100%;
  .label{
    font-size: $font-size-mini;
  }
  .value{
    font-size: $font-size-large;
  }
}
</style>
