<template>
    <div class="tab" @click="$emit('selected')">
        <div class="base"><img class="sheet" :style="{backgroundImage: `url(/images/square/characters/total.png`}" />
            <div class="shadow"></div>
            <div class="content">
                <div class="name">総合</div>
            </div>
        </div>
    </div>
</template>

<script>
  
  import store from "./packs/store";

  export default({
    store,
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .tab{
    .base{
      position: relative;
      width: 200px;
      height: 20%;
      transition: all 0.1s;
      .sheet{
        transition: all 0.1s;
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: 300px;
        background-position: -10px 35%;
        background-repeat: no-repeat;
      }
      .shadow{
        position: absolute;
        width: 100%;
        height: 100%;
        // TODO: もしかするとキャラ固有色みたいなものをグラデーションに指定するときれいかも
        background: linear-gradient(to right, $ingame-background 5%, transparent 200%);        
      }
      .content{
        position: absolute;
        width: 100%;
        height: 100%;
        .name{
          padding: $space-m;
        }
      }
      &:hover{
        .sheet{
          background-size: 310px;
          background-position: -30px 35%;
        }
      }
    }
  }
</style>
