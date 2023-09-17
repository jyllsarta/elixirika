<template>
  <div class="global_detail">
    <div class="bg" @click="close" />
    <div class="content_area">
      <div class="content">
        <div class="title">{{ fetchDetails().title }}</div>
        <break-condition-vue
          v-if="type === 'break_condition'"
          :condition="params"
          :condenced="false"
          class="main_content"
        />
        <skill-icon-vue
          v-if="type === 'skill'"
          :skill="params"
          class="main_content"
        />
        <div class="description">{{ fetchDetails().description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "./packs/store";
import BreakConditionVue from "./in_game/BreakCondition.vue";
import SkillIconVue from "./in_game/SkillIcon.vue";
import Masterdata from "./packs/masterdata";

export default {
  store,
  components: {
    BreakConditionVue,
    SkillIconVue,
  },
  methods: {
    close() {
      this.$store.commit("hideGlobalDetail");
    },
    fetchDetails() {
      switch (this.type) {
      case "break_condition":
        return this.fetchBreakCondition();
      case "skill":
        return this.fetchSkill();
      }
    },
    fetchBreakCondition() {
      const description = Masterdata.getOne("break_condition_descriptions", "type", this.params.type);
      return {
        title: description.title,
        description: description.description,
      };
    },
    fetchSkill() {
      return {
        title: this.params.name,
        description: this.params.description,
      };
    },
  },
  computed: {
    type() {
      return this.$store.state.global_detail.type;
    },
    params() {
      return this.$store.state.global_detail.params;
    },
  },
};
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 400px;
      height: 300px;
      gap: 16px;
      .title{
        font-size: $font-size-large;
        width: 80%;
        text-align: center;
        border-bottom: 1px solid $white;
      }
      .main_content{
        width: 200px;
        height: 100px;
      }
      .description{
        width: 80%;
        white-space: pre-wrap;
      }
    }
  }
}
</style>
