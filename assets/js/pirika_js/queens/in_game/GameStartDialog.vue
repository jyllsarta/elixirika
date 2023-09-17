<template>
  <div class="dialog">
    <div class="_back" @click="startGame"/>
    <div class="content" @click="startGame">
      <div class="title">
        {{quest.name}}
      </div>
      <div class="description">
        {{quest.description}}
      </div>
      <div class="conditions">
        <div class="break_condition_tltle">
          チャプター条件
        </div>
        <div class="break_conditions">
          <break-condition-vue
            v-for="breakCondition in currentBreakConditions"
            :condition="breakCondition"
            :key="breakCondition.id"
            class="condition"
          />
        </div>
      </div>
      <div class="start">
        <div class="button" @click="startGame">
          はじめる
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Masterdata from "../packs/masterdata";
import BreakConditionVue from "./BreakCondition.vue";
import BreakCondition from "../packs/model/break_condition";

export default {
  props: {
    quest: Object,
  },
  components: {
    BreakConditionVue,
  },
  methods: {
    startGame() {
      console.log("startGame");
      this.$emit("start-game");
    },
  },
  computed: {
    currentBreakConditions() {
      const quest = this.quest;
      const breakConditionMasters = Masterdata.getBy("break_conditions", "quest_id", [quest.id]).sort((a, b) => a.order - b.order);
      return breakConditionMasters.map((master) => {
        return new BreakCondition(master.type, master.count, master.param1, true, null);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.dialog{
  ._back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $bg3-opacity;
  }

  .content{
    position: absolute;
    top: 15%;
    left: 15%;
    height: 70%;
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    .title{
      text-align: center;
      font-size: $font-size-large;
      border-bottom: 1px solid $white;
      width: 100%;
    }
    .description{
      width: 60%;
      text-align: center;
    }
    .conditions{
      width: 100%;
      height: 40%;
      display: flex;
      flex-direction: column;
      .break_condition_tltle{
        width: 100%;
        text-align: center;
        border-bottom: 1px solid $white;
      }
      .break_conditions{
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 8px;
        gap: 8px;
        flex-wrap: wrap;
        .condition{
          width: 120px;
          height: 60px;
        }
      }
    }
    .start{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 15%;
      .button{
        border: 1px solid $base2;
        padding: 20px;
      }
    }
  }
}
</style>
