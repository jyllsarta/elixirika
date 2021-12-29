<template lang="pug">
  .star_palette
    .background.with_drop_shadow
      img(src="/images/square/svg/star_palette5.svg")
    .field
      .player
        .img
          img(:src="`/images/square/characters/spica.png`")
      transition(name="enemy-appear")
        .foreground_enemy(v-if="foregroundEnemy.hp > 0", :key="foregroundEnemy.id")
          .img
            img(:src="`/images/square/characters/${foregroundEnemy.image}.png`")
          .hp
            | {{foregroundEnemy.hp}}
      transition-group(class="background_enemies" name="background")
        .enemy(v-for="enemy in backgroundEnemies" :key="enemy.id")
          .content
            .img
              img(:src="`/images/square/characters/${enemy.image}.png`")
            .hp
              | {{enemy.hpMax}}
      .cleared(v-if="!foregroundEnemy.hp")
        .text
          | 勝利！
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model"

  export default Vue.extend({
    props: {
      model: Model,
    },
    computed: {
      aliveEnemies(){
        return this.model.character.uniqueParameters.enemies.filter(enemy=>enemy.hp>0);
      },
      foregroundEnemy(){
        return this.aliveEnemies[0] || {};
      },
      backgroundEnemies(){
        return this.aliveEnemies.slice(1, Math.inf);
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
          .content{
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
      .cleared{
        position: absolute;
        width: 100%;
        height: 100%;
        .text{
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        // 今後 アヤメちゃんイラストが追加される
      }
    }

    .enemy-appear-enter-active {
      transition: all 1.3s;
    }
    .enemy-appear-leave-active {
      transition: all 1s linear;
    }
    .enemy-appear-enter{
      transform: translateX(30px);
      opacity: 0;
    }
    .enemy-appear-leave-to{
      transform: translate(130px, -40px) rotate(270deg);
      opacity: 0;
    }

    .background-enter-active {
      position: absolute;
      transition: all 0.4s;
    }
    .background-leave-active {
      position: absolute;
      transition: all 0.4s;
    }
    .background-enter{
      transform: translateX(20px);
      opacity: 0;
    }
    .background-leave-to{
      transform: translateX(-20px);
      opacity: 0;
    }
    .background-move {
      transition: transform 1s;
    }
  }

</style>
