<template>
  <div class="flg">
    スキル発動
  </div>
</template>

<script>
import State from "../../packs/model/state";
import store from '../../packs/store';

export default {
  store,
  props: {
    state: State,
  },
  mounted(){
    setTimeout(() => {
      this.$store.commit("hideFragment", {name: "skill_activation"});
    }, 1000);
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "../../stylesheets/global_settings";
.flg{
  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 50px);
  width: 400px;
  height: 100px;
  background-color: $bg1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
