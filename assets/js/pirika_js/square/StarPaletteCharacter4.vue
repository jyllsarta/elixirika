<template lang="pug">
  .star_palette
    .background.with_drop_shadow
      img(src="/images/square/svg/star_palette5.svg")
    .player
    .foreground_enemy
      | {{foregroundEnemy.hp}}
    .background_enemies
      .background_enemy(v-for="enemy in backgroundEnemies")
        | {{enemy.hp}}
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
    .player{
      position: absolute;
      left: 100px;
      width: 100px;
      height: 100px;
      background-color: aquamarine;
      bottom: 0;
    }
  }

</style>
