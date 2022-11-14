<template lang="pug">
  .ranking
    ._back(@click="closeMenu")
    .content
      .header
        GeneralButton.back_button(
          @click="closeMenu"
          :disabled="false"
          :flashing="false"
          :width="'160px'"
          :height="'40px'"
          :color="'blue'"
          :label="'とじる'"
        )   
        .title
          | ランキング
      .body
        .tabs
          RankingTab(
            v-for="cid in [1,2,3,4]"
            :key="cid"
            :characterId="cid"
            :characterName="characters[cid].name"
            @selected="onTabClick(cid)"
          )
          RankingTabTotal(
            @selected="onTabClick(-1)"
          )
        .rankings
          RankingBanner.rank(
            :characterId="characterId"
            :characterName="characterName"
            :rankingContent="rankingContent"
          )

</template>

<script lang="javascript">
  import Vue from 'vue';
  import axios from "axios";
  import store from "./packs/store";
  import GeneralButton from "./GeneralButton.vue";
  import RankingBanner from "./RankingBanner.vue";
  import RankingTab from "./RankingTab.vue";
  import RankingTabTotal from "./RankingTabTotal.vue";
  import CharacterFactory from "./packs/characterFactory";

  export default Vue.extend({
    store,
    data(){
      const characterFactory = new CharacterFactory();
      return {
        characters: [1,2,3,4].reduce((iter, x)=>{const c=characterFactory.getCharacterById(x); iter[c.id]=c; return iter}, {}),
        characterId: 1,
        ranking: [],
      }
    },
    components: {
      GeneralButton,
      RankingBanner,
      RankingTab,
      RankingTabTotal
    },
    methods: {
      closeMenu(){
        this.$emit("close");
      },
      onTabClick(cid){
        this.characterId = cid;
        this.$store.commit("playSound", {key: "ok"});
      }
    },
    computed: {
      rankingContent(){
        if(this.characterId === -1){
          return this.ranking.total;
        }
        return this.ranking[this.characterId] || [];
      },
      characterName(){
        if(this.characterId === -1){
          return "総合";
        }
        return this.characters[this.characterId]?.name;
      }
    },
    mounted(){
        axios.get(`/square/ranking`)
        .then((results) => {
          this.ranking = results.data.ranking;
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        })
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .ranking{
    position: absolute;
    width: 80%;
    height: 80%;
    max-height: 600px;
    left: 10%;
    top: 10%;
    border: 2px solid $gray2;
    ._back{
      position: absolute;
      // 画面横幅のなにもない領域 - 20px まで当たり判定を持つ
      right: calc((#{$window-width} - 100vw + 20px)/2);
      top: -100px;
      width: 100vw;
      height: 100vh;
    }
    .content{
      position: absolute;
      background-color: $ingame-background;
      width: 100%;
      height: 100%;
      padding: $space-m;
      .header{
        height: 50px;
        display: flex;
        gap: $space-m;
        align-items: center;
        .title{
          line-height: 100%;
          font-size: $font-size-large;
        }
      }
      .body{
        height: calc(100% - 50px);
        width: 100%;
        display: flex;
        justify-content: center;
        .tabs{

        }
      }
    }
  }
</style>
