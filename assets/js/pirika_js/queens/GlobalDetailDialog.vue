<template>
  <div class="global_detail">
    <div class="bg" @click="close" />
    <div class="content_area">
      <div class="content">
        <break-condition-vue 
          v-if="type === 'break_condition'"
          :condition="params"
          :condenced="false"
          class="break_condition"
        />
      </div>
    </div>
  </div>
</template>

<script>
import store from "./packs/store";
import BreakConditionVue from "./in_game/BreakCondition.vue";

export default {
  store,
  components: {
    BreakConditionVue,
  },
  methods: {
    close(){
      this.$store.commit("hideGlobalDetail");
    }
  },
  computed: {
    type(){
      return this.$store.state.global_detail.type;
    },
    params(){
      return this.$store.state.global_detail.params;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./stylesheets/global_settings";
.global_detail{
  width: 100%;
  height: 100%;
  .bg{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: $bg2-opacity;
  }
  .content_area{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    .content{
      width: 300px;
      height: 100px;
      .break_condition{
        width: 80%;
        height: 80%;
      }
    }
  }
}
</style>
