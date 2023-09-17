<template>
  <div class="flg">
    スキル発動: {{skill().name}}
  </div>
</template>

<script>
import Masterdata from "../../packs/masterdata";
import State from "../../packs/model/state";
import store from "../../packs/store";

export default {
  store,
  props: {
    state: State,
  },
  mounted() {
    setTimeout(() => {
      this.$store.commit("hideFragment", { name: "skill_activation" });
    }, 1000);
  },
  methods: {
    skill() {
      const skillId = this.$store.state.fragments_extra.skill_activation.skillId;
      return Masterdata.get("skills", skillId);
    },
  },
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
