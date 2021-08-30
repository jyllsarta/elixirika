<template lang="pug">
  .name_input_area
    span.prefix
      | 名前：
    .fixed_name( v-if="!inputting")
      | {{fullName === "" ? "ななし(ランキング登録されません)" : fullName}}
    button.change_button(@click="setInputMode", v-if="!inputting")
      | 変更
    input.name_input_box(type="text", @blur="onBlur", v-model="rawName", v-if="inputting", ref="focusTarget")
</template>

<script>
import Vue from 'vue';
import LeaderBoard from './LeaderBoard.vue';
import jsSHA from 'jssha'

export default {
  data: function(){
    return {
      rawName: "",
      inputting: false,
    };
  },
  props: {
    leaderBoard: LeaderBoard,
  },

  name: "nameInputArea",
  mounted: function(){
    if(localStorage.rawNameSquare){
      this.rawName = localStorage.rawNameSquare;
    }
  },
  computed: {
    fullName: function(){
      const splitted = this.rawName.replace(/📛/g, "").split("#");
      const displayName = splitted[0];
      if (splitted.length === 1) {
          return displayName;
      }
      const target = splitted.slice(1).join("");
      const sha = new jsSHA("SHA-256", "TEXT");
      sha.update(target);
      const sliced = sha.getHash("HEX").slice(0, 10);
      return `${displayName}📛${sliced}`;
    },
  },
  methods: {
    onBlur: function(){
      this.inputting = false;
      localStorage.rawNameSquare = this.rawName;
      this.leaderBoard.fetchMyScore();
    },
    setInputMode: function(){
      this.inputting = true;
      Vue.nextTick(()=>{
        this.$refs.focusTarget.focus();
      });
    },
  },
};
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";

  .name_input_area {
    display: flex;
    margin-bottom: 10px;
    .fixed_name{
      margin-right: 10px;
    }
  }
</style>
