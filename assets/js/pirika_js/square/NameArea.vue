<template lang="pug">
  .name_input_area
    span.prefix
      | 名前(進捗の記録に使います)：
    .fixed_name(v-if="!inputting")
      | {{fullName === "" ? "ななし(適当な名前がランダムに入ります)" : fullName}}
    button.change_button(@click="setInputMode", v-if="!inputting")
      | 変更
    input.name_input_box(type="text", @blur="onBlur", v-model="rawName", v-if="inputting", ref="focusTarget" maxlength="8")
</template>

<script>
import Vue from 'vue';
import jsSHA from 'jssha';

export default {
  data: function(){
    return {
      rawName: "",
      inputting: false,
    };
  },
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
      const sliced = sha.getHash("HEX").slice(0, 6);
      return `${displayName}📛${sliced}`;
    },
  },
  methods: {
    onBlur(){
      this.inputting = false;
      localStorage.rawNameSquare = this.rawName;
    },
    setInputMode(){
      this.inputting = true;
      Vue.nextTick(()=>{
        this.$refs.focusTarget.focus();
      });
    },
  },
};
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";

  .name_input_area {
    display: inline-flex;
    .fixed_name{
      margin-right: 10px;
    }
  }
</style>
