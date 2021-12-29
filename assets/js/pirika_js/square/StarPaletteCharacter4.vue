<template lang="pug">
  .star_palette
    .background.with_drop_shadow
      img(src="/images/square/svg/star_palette5.svg")
    .field
      .player
        .img
          img(:src="`/images/square/characters/spica.png`")
      .foreground_enemy
        .img
          img(:src="`/images/square/characters/${foregroundEnemy.image}.png`")
        .hp
          | {{foregroundEnemy.hp}}
      .background_enemies
        .enemy(v-for="enemy in backgroundEnemies")
          .img
            img(:src="`/images/square/characters/${enemy.image}.png`")
          .hp
            | {{enemy.hpMax}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model"

  export default Vue.extend({
    props: {
      model: Model,
    },
    computed: {
      enemies(){
        return this.model.character.uniqueParameters.enemies;
      },
      foregroundEnemy(){
        return this.enemies[0] || {};
      },
      backgroundEnemies(){
        return this.enemies.slice(1, Math.inf);
      }
    },
    methods: {
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .star_palette{
    position: absolute;
    width: 100%;
    height: 100%;
    .background{
      position: absolute;
      width: 100%;
      height: 100%;
      img{
        width: 100%;
      }
    }
    .field{
      position: absolute;
      width: 100%;
      height: unquote("calc(100% - 27px)");
      .player{
        position: absolute;
        left: 100px;
        width: 80px;
        height: 80px;
        bottom: 0;
        .img img{
          width: 100%;
          height: 100%;
        }
      }
      .foreground_enemy{
        position: absolute;
        left: 300px;
        width: 80px;
        height: 80px;
        bottom: 0;
        .img img{
          width: 100%;
          height: 100%;
        }
        .hp{
          position: absolute;
          top: -10px;
          left: 0;
          width: 100%;
          text-align: center;
        }
      }
      .background_enemies{
        display: flex;
        flex-direction: row;
        position: absolute;
        left: 500px;
        bottom: 0;
        width: 400px;
        height: 60px;
        gap: $space-m;
        .enemy{
          position: relative;
          width: 60px;
          height: 60px;
          .img img{
            width: 100%;
            height: 100%;
          }
          .hp{
            position: absolute;
            top: -20px;
            left: 0;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }

</style>
