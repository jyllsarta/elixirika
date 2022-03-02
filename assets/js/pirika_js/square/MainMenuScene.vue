<template lang="pug">
  .main_menu
    .header
      .title
        | メインメニュー
      .description
        | タイルをクリックすると詳細を確認できます。
    .content
      .row(v-for="characterId, index in [1,2,3,4]", :key="index")
        .character
          CharacterBanner(
            :character="characters[characterId]"
            @selected="onCharacterSelected",
          )
        .tile(v-for="chapter in chapters(characterId)", :key="chapter.id")
          ClearStateTile(
            :chapter="chapter"
            :character="characters[characterId]"
            @selected="onTileSelected",
            :challenge-clear-state="challengeClearState(chapter)"
          )
    .main_menu_detail_dialog(v-if="showsDetailDialog")
      MainMenuDetailDialog(
        :character="selectedCharacter"
        :chapter="selectedChapter"
        :challenge-clear-state="challengeClearState(selectedChapter)"
        :high-score="highScore(selectedChapter)"
        :challenge-master="challengeMaster"
        @cancel="showsDetailDialog = false"
        @start="startGame"
      )

</template>

<script lang="typescript">
  import Vue from 'vue';
  import CharacterBanner from "./CharacterBanner.vue";
  import ClearStateTile from "./ClearStateTile.vue";
  import MainMenuDetailDialog from "./MainMenuDetailDialog.vue";
  import CharacterFactory from "./packs/characterFactory";
  import Chapter from "./packs/chapter";
  import Challenge from "./packs/challenge";
  import axios from "axios";

  export default Vue.extend({
    components: {
      CharacterBanner,
      ClearStateTile,
      MainMenuDetailDialog,
    },
    data(){
      // methods は頻繁に呼ばれちゃい、キャラファクトリからまいどまいど生成するのはどう考えても高コスト
      // このシーンではマスタの取得結果をストアしちゃう
      const characterFactory = new CharacterFactory();
      const chapterMaster = new Chapter();
      const challengeMaster = new Challenge();
      return {
        characters: [1,2,3,4].reduce((iter, x)=>{const c=characterFactory.getCharacterById(x); iter[c.id]=c; return iter}, {}),
        chapterMaster: chapterMaster,
        challengeMaster: challengeMaster,
        showsDetailDialog: false,
        selectedCharacterId: -1,
        selectedChapterId: -1,
        userStatus: {
          challenges: [],
          high_score: []
        },
      }
    },
    methods: {
      onTileSelected(params){
        const {characterId: characterId, chapterId: chapterId} = params;
        this.selectedCharacterId = characterId;
        this.selectedChapterId = chapterId;
        this.showsDetailDialog = true;
      },
      onCharacterSelected(params){
        const {characterId: characterId} = params;
        this.selectedCharacterId = characterId;
        this.selectedChapterId = this.findBestChapter(characterId)?.id;
        this.showsDetailDialog = true;
      },
      hideDetailDialog(){
        this.showsDetailDialog = false;
      },
      startGame(){
        this.hideDetailDialog();
        this.$emit("loadScene", {sceneName: "inGame", params: {characterId: this.selectedCharacterId, chapterId: this.selectedChapterId}});
      },
      chapters(characterId){
        return this.chapterMaster.getByCharacterId(characterId).sort(x=>x.index);
      },
      challengeClearState(chapter){
        return this.userStatus.challenges[chapter.id] || [];
      },
      highScore(chapter){
        return this.userStatus.high_score[chapter.id] || 0;
      },
      findBestChapter(characterId){
        const chapters = this.chapters(characterId);
        console.log(chapters)
        return chapters.find(chapter=>!chapter.challenge_ids.every(x=>this.userStatus.challenges[chapter.id]?.indexOf(x) !== -1)) || chapters[0];
      },
      fetchMyScore(){
        const params = {
          username: localStorage.rawNameSquare
        }
        axios.get(`/square/status`, {params: params})
        .then((results) => {
          this.userStatus = this.constructUserStatus(results.data);
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        })
      },
      constructUserStatus(apiResponse){
        const {high_score: high_scores, challenges: challenge_records} = apiResponse;
        // chapter_id: score の形にしちゃう
        const highScoreIdTable = high_scores.reduce((iter, x)=>{iter[x.chapter_id]=x.score; return iter}, {})
        // chapter_id: [challenge_ids(NOT sorted)] の形にしちゃう
        const challengeIdTable = challenge_records.reduce((iter, x)=>{iter[x.chapter_id]=(iter[x.chapter_id] ? iter[x.chapter_id].concat(x.challenge_id) : [x.challenge_id]); return iter}, {})
        return {
          high_score: highScoreIdTable,
          challenges: challengeIdTable,
        }
      },
    },
    mounted(){
      this.fetchMyScore();
    },
    computed: {
      selectedCharacter(){
        return this.characters[this.selectedCharacterId];
      },
      selectedChapter(){
        return this.chapterMaster.idTable[this.selectedChapterId];
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .main_menu{
    position: relative;
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
    .main_menu_detail_dialog{
      position: absolute;
      width: 80%;
      height: 70%;
      top: 15%;
      left: 10%;
      z-index: 100;
    }
  }
</style>
