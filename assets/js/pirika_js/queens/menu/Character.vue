<template>
  <div class="character" @click="showDetail()">
    <div class="character_image">
      <img src="images/queens/characters/character1_1.png" class="image">
    </div>
    <div class="panel">
      <div class="name">トローズ</div>
      <div class="quests">
        <div class="quest tentative_panel">1</div>
        <div class="quest tentative_panel">2</div>
        <div class="quest tentative_panel">3</div>
        <div class="quest tentative_panel">4</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
  },  
  computed: {
  },
  methods: {
    showDetail(){
      this.$emit("select");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.character{
  width: 20%;
  height: 80%;
  position: relative;
  .character_image{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .image{
      width: 100%;
    }
  }
  .panel{
    width: 100%;
    height: 200px;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .name{
      font-size: 20px;
      text-align: center;
      margin-bottom: 10px;
      background-color: $bg3;
    }
    .quests{
      display: flex;
      justify-content: space-around;
      .quest{
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
