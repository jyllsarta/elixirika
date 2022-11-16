<template>
    <div class="challenge" :class="isCleared ? 'cleared' : 'not_cleared'">
        <div class="icon" v-if="isCleared &amp;&amp; showIndex">◆</div>
        <div class="icon" v-if="!isCleared &amp;&amp; showIndex">◇</div>
        <div class="rank" v-if="showIndex">{{["I","II","III","IV"][index]}}</div>
        <div class="description">{{showDescription ? challenge.description : challenge.title}}</div>
    </div>
</template>

<script>
  

  export default({
    props: {
      challenge: Object,
      isCleared: Boolean,
      index: Number,
      showDescription: Boolean,
      showIndex: Boolean,
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .challenge{
    display: flex;
    gap: $space-m;
    .icon{
      width: 16px;
    }
    .rank{
      width: 24px;
      text-align: center;
    }
    &.cleared{
      color: $purple1;
    }
    &.not_cleared{
      opacity: $disabled-opacity;
    }
  }
</style>
