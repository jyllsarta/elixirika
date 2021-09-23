<template lang="pug">
  .main_menu
    .header
      .title
        | メインメニュー
      .description
        | タイルをクリックすると詳細を確認できます。
    .content
      // TODO: 本番用マスタ投入タイミングで[1,2,3,4] を読み込む
      .row(v-for="characterId, index in [1,2,1,2]", :key="index")
        .character
          CharacterBanner(:character="characters[characterId]")
        .tile(v-for="tileIndex, index in [1,2,3,4]", :key="index")
          ClearStateTile(:index="index")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import CharacterBanner from "./CharacterBanner.vue";
  import ClearStateTile from "./ClearStateTile.vue";
  import CharacterFactory from "./packs/characterFactory"

export default Vue.extend({
    components: {
      CharacterBanner,
      ClearStateTile,
    },
    data(){
      // methods は頻繁に呼ばれちゃい、キャラファクトリからまいどまいど生成するのはどう考えても高コスト
      // このシーンではキャラマスタの取得結果をストアしちゃう
      const characterFactory = new CharacterFactory();
      
      return {
        characters: [1,2].reduce((iter, x)=>{const c=characterFactory.getCharacterById(x); iter[c.id]=c; return iter}, {}),
      }
    },
    methods: {
      onClick(characterId){
        this.$emit("loadScene", {sceneName: "inGame", params: {characterId: characterId, chapterId: -1}});
      },
    },
    mounted(){
    },
    computed: {
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .main_menu{
    width: 100%;
    height: 100%;
    color: $white;
    padding: $space-m;
    .title{
      font-size: $font-size-large;
    }
    .description{
      font-size: $font-size-normal;
      border-bottom: 1px solid $gray2;
    }
    .content{
      margin-left: 10%;
      margin-top: $space-m;
      width: 80%;
      height: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: $space-m;
      .row{
        display: flex;
        gap: $space-m;
        .character{
          width: 300px;
          height: 100px;
        }
        .tile{
          width: 100px;
          height: 100px;
        }
      }
    }
  }
</style>
