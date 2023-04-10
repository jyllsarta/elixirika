<template>
  <div class="dialog">
    <div class="_back" @click="closeMenu"/>
    <div class="content">
      チュートリアル
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeMenu() {
      console.log("close")
      this.$emit("close");
    },
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
    height: 100vh;
  }

  .content{
    position: absolute;
    top: 10%;
    left: 10%;
    height: 80%;
    width: 80%;
    background-color: aliceblue;
    border: 1px solid black;
  }
}
</style>
