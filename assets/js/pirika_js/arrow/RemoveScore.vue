<template>
    <transition name="show-long">
        <div v-if="show" class="remove_score" :style="{ transform: 'translate(' + x + 'px,' + y + 'px)'}">+{{value}}</div>
    </transition>
</template>
<script>
  export default {
    name: "RemoveScore",
    props: [
      "x",
      "y",
      "value",
      "show"
    ]
  }
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
  .remove_score{
    pointer-events: none;
    z-index: 11;
    position: absolute;
    width: 20%;
    height: 10%;
    left: -10%;
    top: -5%;
    text-align: center;
    font-family: 'Cute Font', cursive;
    font-size: $main-font-size;
    color: $accent-color;
  }
  .show-long-leave-active {
    transition: all 1s;
  }
  .show-long-leave-to{
    opacity: 0;
  }

</style>
