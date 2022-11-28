<template>
    <div class="scene" @click="proceed"><img class="enemy" src="/images/rhomb/title.png" /><img class="logo" src="/images/rhomb/logo.png" />
        <div class="text">クリックしてはじめる</div>
    </div>
</template>

<script>

export default ({
  data() {
    return {
    };
  },
  methods: {
    proceed() {
      this.$emit('loadScene', {sceneName: 'mainMenu'});
    },
  },
  mounted() {
    // シーン飛ばし用
    // this.$emit("loadScene", {sceneName: "mainMenu"});
    // this.$emit("loadScene", {sceneName: "inGame"});
  },
});
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .scene{
    position: relative;
    color: $white;
    width: 100%;
    height: 100%;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .enemy{
      width: 600px;
      animation: fuwa 3.6s alternate infinite;
    }
    .logo{
      width: 500px;
    }
    .text{
      animation: tika 1.1s linear alternate infinite;
    }

    @keyframes fuwa {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-5px);
      }
    }

    @keyframes tika {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0.5;
      }
    }
  }
</style>
