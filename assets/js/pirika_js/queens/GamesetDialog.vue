<template>
  <div class="dialog">
    <div class="_back" @click="closeMenu"/>
    <div class="content">
      ゲームセット！
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeMenu() {
      this.$emit("close");
    },
    updateFace(){
      // 要素90px + gap30px
      const scroll = Math.max(this.$refs.says.scrollTop - 60, 0);
      const index = Math.floor(scroll / 120);
      console.log(index);
      this.currentSay = this.says[index];
    }
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.dialog{
  ._back {
    position: absolute;
    // 画面横幅のなにもない領域 - 20px まで当たり判定を持つ
    right: calc((1200px - 100vw + 20px) / 2);
    top: 0;
    width: 100vw;
    height: 90vh;
  }

  .content{
    position: absolute;
    top: 20%;
    left: 20%;
    height: 60%;
    width: 60%;
    background-color: $bg3;
    border: 2px solid $base2;
  }
}
</style>
