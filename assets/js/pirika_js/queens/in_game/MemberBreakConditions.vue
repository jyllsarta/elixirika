<template>
  <div class="member_break_condition" v-if="state">
    <div class="label_area">
      <div class="label">
        Target
      </div>
      <div class="description">
        全部破壊したら勝利
      </div>
    </div>
    <div class="conditions">
      <break-condition 
        v-for="condition in restConditions"
        :key="condition.id"
        :condition="condition"
        class="condition normal"
      />
      <break-condition 
        v-for="condition in condencedConditions"
        :key="condition.id"
        :condition="condition"
        :condenced="true"
        class="condition condenced"
      />
    </div>
    <div class="next_condition_area">
      <break-condition 
        class="condition next_condition"
        :condition="headOfCondition"
        v-if="headOfCondition"
      />
    </div>
  </div>
</template>

<script>
import store from "../packs/store";
import BreakCondition from "./BreakCondition.vue";

export default {
  store, 
  components: {
    BreakCondition,
  },
  props: {
    state: Object,
    controller: Object,
    breakConditions: Array,
  },
  computed: {
    headOfCondition(){
      return this.breakConditions[0];
    },
    // 2~4番目の条件
    restConditions(){
      if(!this.breakConditions){
        return [];
      }
      return this.breakConditions.slice(1, 3);
    },
    // 5番目以降の条件
    condencedConditions(){
      if(!this.breakConditions){
        return [];
      }
      return this.breakConditions.slice(3);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.member_break_condition{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid $white;
  .label_area{
    width: 100%;
    height: 15%;
    padding-left: 4px;
    padding-right: 4px;
    .label{
      width: 100%;
      text-align: center;
    }
    .description{
      width: 100%;
      text-align: center;
      font-size: $font-size-mini;
      border-bottom: 1px solid $white;
    }
  }
  .conditions{
    width: 100%;
    height: 55%;
    display: flex;
    flex-direction: column-reverse;
    padding: 4px 4px 0 4px;
    gap: 4px;
    
    .condition{
      display: flex;
      justify-content: center;
      align-items: center;
      color: $white;
    }
    .normal{
      width: 100%;
      height: 50px;
    }
    .condenced{
      width: 100%;
      height: 4px;
    }
  }
  .next_condition_area{
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    .next_condition{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $white;
    }
  }
}
</style>
