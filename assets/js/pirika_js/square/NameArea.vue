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
import jsSHA from 'jssha'

export default {
  data: function(){
    return {
      rawName: "",
      inputting: false,
    };
  },
  name: "nameInputArea",
  mounted: function(){
    if(localStorage.rawNameSquare){
      this.rawName = localStorage.rawNameSquare;
    }
    console.log("loaded name!");
    this.setName();
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
      this.$emit("inputStateChanged", false);
      this.setName();
    },
    setInputMode: function(){
      this.inputting = true;
      this.$emit("inputStateChanged", true);
      // inputtingをオンにしても次のフレームまで待たないとまだ入力欄は作られない
      Vue.nextTick(()=>{
        this.$refs.focusTarget.focus();
      });
      console.log(this.$refs)
    },
    setName: function(){
      this.$emit("setName", this.fullName);
    }
  },
};
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";

  .name_input_area {
    display: flex;
    margin-bottom: 10px;
    .prefix{
    }
    .fixed_name{
      margin-right: 10px;
    }
    .name_input_box{
    }
    .change_button{
    }
  }
</style>
