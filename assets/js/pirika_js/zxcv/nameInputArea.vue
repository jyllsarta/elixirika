<template>
  <div class="name_input_area">
    <span class="prefix">名前：</span>
    <div class="fixed_name" v-if="!inputting">
      {{ fullName === "" ? "ななし(ランキング登録されません)" : fullName }}
    </div>
    <button class="change_button" @click="setInputMode" v-if="!inputting">
      変更</button
    ><input
      class="name_input_box"
      type="text"
      @blur="onBlur"
      v-model="rawName"
      v-if="inputting"
    />
  </div>
</template>

<script>
import jsSHA from 'jssha';

export default {
  data() {
    return {
      rawName: '',
      inputting: false,
    };
  },
  name: 'nameInputArea',
  mounted() {
    if (localStorage.rawName) {
      this.rawName = localStorage.rawName;
    }
    this.setName();
  },
  computed: {
    fullName() {
      const splitted = this.rawName.replace(/📛/g, '').split('#');
      const displayName = splitted[0];
      if (splitted.length === 1) {
        return displayName;
      }
      const target = splitted.slice(1).join('');
      const sha = new jsSHA('SHA-256', 'TEXT');
      sha.update(target);
      const sliced = sha.getHash('B64').slice(0, 10);
      return `${displayName}📛${sliced}`;
    },
  },
  methods: {
    onBlur() {
      this.inputting = false;
      localStorage.rawName = this.rawName;
      this.$emit('inputStateChanged', false);
      this.setName();
    },
    setInputMode() {
      this.inputting = true;
      this.$emit('inputStateChanged', true);
      // inputtingをオンにしても次のフレームまで待たないとまだ入力欄は作られない
      Vue.nextTick(() => {
        $('.name_input_box')[0].focus();
      });
    },
    setName() {
      this.$emit('setName', this.fullName);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/constants";

.name_input_area {
  position: absolute;
  top: 18%;
  left: 0;
  width: 50%;
  .prefix {
    color: $white;
  }
  .fixed_name {
    color: $white;
    position: absolute;
    top: 0;
    left: 55px;
  }
  .name_input_box {
    position: absolute;
    top: 0;
    left: 55px;
  }
  .change_button {
    position: absolute;
    right: 2%;
  }
}
</style>
