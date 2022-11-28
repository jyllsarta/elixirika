<template>
    <div class="dialog" @click="reset">
        <div class="content" v-if="model.isWin">WIN</div>
        <div class="content" v-if="!model.isWin">LOSE</div>
    </div>
</template>

<script>

import store from './packs/store';
import Model from './packs/model';

export default ({
  store,
  props: {
    model: Model,
  },
  methods: {
    reset() {
      this.$store.commit('guiEvent', {subject: 'reset'});
    },
  },
});
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .dialog{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.642);
    .content{
      color: white;
    }
  }
</style>
