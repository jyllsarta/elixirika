<template>
<div class="enemy_image" v-if="state">
<img :src="`/images/queens/characters/queens${faceId}.png`" alt="" class="enemy">
</div>
</template>

<script>
import State from "./packs/model/state";
export default {
  props: {
    state: State
  },
  computed: {
    faceId(){
      const target = this.state.board.targetValue();
      const distance = target - this.state.enemyBoard.targetValue(target);
      if(distance === 0){
        return 1;
      }
      if(distance < 0){
        return 4;
      } 
      if(distance <= 2){
        return 2;
      }
      return 3;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.enemy{
  position: relative;
  width: 350px;
  top: -50px;
}
</style>
