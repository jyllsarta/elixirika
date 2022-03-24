<template lang="pug">
.sound_button_area
  GeneralButton(
    @click="showMenu"
    v-if="!showingMenu"
    :disabled="false"
    :flashing="false"
    :width="'160px'"
    :height="'40px'"
    :color="'blue'"
    :label="'音量'"
  )
  .menu(v-if="showingMenu")
    ._back(@click="closeMenu")
    .items(v-if="showingMenu")
      GeneralButton(
        @click="closeMenu"
        :disabled="false"
        :flashing="false"
        :width="'160px'"
        :height="'40px'"
        :color="'blue'"
        :label="'とじる'"
      )
      .text
        | マスター
      input.volume(
        type="range"
        v-model.number="volumes.master"
        min="0"
        max="1"
        step="any",
        @change="setVolume"
      )
      .text
        | BGM
      input.volume(
        type="range"
        v-model.number="volumes.bgm"
        min="0"
        max="1"
        step="any",
        @change="setVolume"
      )
      .text
        | SE
      input.volume(
        type="range"
        v-model.number="volumes.se"
        min="0"
        max="1"
        step="any",
        @change="setVolume"
      )

</template>


<script lang="typescript">
  import Vue from 'vue';
  import axios from 'axios';
  import store from './packs/store.js';
  import GeneralButton from "./GeneralButton.vue";

export default Vue.extend({
    store,
    components: {
      GeneralButton,
    },
    data(){
      return {
        sounds: {
          ok: null,
          draw: null,
          reset: null,
          stack: null,
          miss: null,
          special1: null,
          special2: null,
          special3: null,
          special4: null,
          welcome: null,
          gameStart: null,
          gameEnd: null,
          menuOpen: null,
          menuClose: null,
          hover: null,
          pocket: null,
          attack: null,
          defeat: null,
          damage: null,
          shield: null,
          challenge: null,
        },
        bgm: {
          bgm1: null,
          bgm2: null,
          bgm3: null,
          bgm4: null,
          bgm5: null,
          bgm6: null,
          bgm7: null,
          bgm8: null,
          bgm9: null,
          bgm10: null,
          bgm11: null,
          bgm12: null,
        },
        volumes: {
          master: 0.5,
          bgm: 0.2,
          se: 1,
        },
        audioContext: null,
        bgmBufferSource: null,
        showingMenu: false,
      }
    },
    mounted(){
      this.audioContext = new AudioContext();
      this.loadSounds();
      this.loadBgms();
    },
    computed: {
      seVolume(){
        return this.volumes.master * this.volumes.se;
      },
      bgmVolume(){
        return this.volumes.master * this.volumes.bgm;
      },
    },
    methods: {
      loadSound(key, response){
        this.audioContext.decodeAudioData(response, (buffer) => {
            this.sounds[key] = buffer;
        }, function(msg) {console.error(msg)});
      },
      loadBgm(key, response){
        this.audioContext.decodeAudioData(response, (buffer) => {
            this.bgm[key] = buffer;
        }, function(msg) {console.error(msg)});
      },
      loadSounds(){
        for(let key of Object.keys(this.sounds)){
          axios.get(`/game/square/sounds/${key}.wav`, { responseType : 'arraybuffer' })
            .then((results) => {
              this.loadSound(key, results.data);
            })
            .catch((results) => {
              console.warn(results);
              console.warn("NG");
            })
        }
      },
      loadBgms(){
        for(let key of Object.keys(this.bgm)){
          axios.get(`/game/square/sounds/bgm/${key}.mp3`, { responseType : 'arraybuffer' })
            .then((results) => {
              this.loadBgm(key, results.data);
            })
            .catch((results) => {
              console.warn(results);
              console.warn("NG");
            })
        }
      },
      playSound(key, tone = 0){
        this.doPlaySound(key, this.seVolume, tone);
      },
      doPlaySound(key, volume, tone){
        if(!this.sounds[key]){
          console.warn(`undefined sound key: ${key}`);
          return;
        }
        let source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        gainNode.gain.value = volume;
        source.buffer = this.sounds[key];
        source.detune.value += tone * 200;
        source.start(0);
      },
      syncCurrentBgmVolume(){
        if(!this.currentBgmGainNode){
          return;
        }
        this.currentBgmGainNode.gain.value = this.bgmVolume;
      },
      playBgm(key){
        // 無のBGMをプレイ = BGMストップとしたいため再生するBGMの存在チェックをする前に音を止める
        if(this.bgmBufferSource){
          this.bgmBufferSource.stop();
        }
        if(this.bgm[key] === undefined){
          console.warn(`undefined bgm key: ${key}`);
          return;
        }
        if(this.bgm[key] === null){
          console.warn(`loading bgm, retry...`);
          setTimeout(()=>{this.playBgm(key)}, 1000);
          return;
        }
        let source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        gainNode.gain.value = this.bgmVolume;
        source.buffer = this.bgm[key];
        source.loop = true;
        source.start(0);
        this.bgmBufferSource = source;
        this.currentBgmGainNode = gainNode;
      },
      showMenu(){
        this.showingMenu = true;
      },
      closeMenu(){
        this.showingMenu = false;
      },
      setVolume(){
        console.log("todo cookie");
        this.syncCurrentBgmVolume();
      }
    },
    watch: {
      "$store.state.sounds": {
        handler: function(afterSounds, oldSounds){
          if(afterSounds.length === 0){
            return;
          }
          for(let sound of afterSounds){
            const {key, tone} = sound;
            this.playSound(key, tone);
          }
          this.$store.commit("flushSounds");
        }
      },
      "$store.state.bgm": {
        handler: function(key){
          this.playBgm(key);
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.sound_button_area{
  color: $white;
  position: absolute;
  top: $space-m;
  right: $space-m;
  .menu{
    width: 200px;
    display: flex;
    padding: $space-m;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: $space-m;
    border-radius: $radius;
    border: 2px solid $gray2;
    .text{
      width: 100%;
    }
    input{
      width: 100%;
    }
  }
}
</style>
