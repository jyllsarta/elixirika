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


<script lang="javascript">
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
          se: {
            ok: {volume: 0.7},
            draw: {volume: 1.0},
            reset: {volume: 1.0},
            stack: {volume: 1.0},
            miss: {volume: 1.0},
            special1: {volume: 1.2},
            special2: {volume: 0.8},
            special3: {volume: 0.8},
            special4: {volume: 0.6},
            welcome: {volume: 1.0},
            gameStart: {volume: 1.0},
            gameEnd: {volume: 1.0},
            menuOpen: {volume: 1.0},
            menuClose: {volume: 1.0},
            hover: {volume: 0.4},
            pocket: {volume: 0.7},
            attack: {volume: 1.0},
            defeat: {volume: 1.0},
            damage: {volume: 1.0},
            shield: {volume: 1.0},
            challenge: {volume: 1.0},
            end: {volume: 1.0},
            bad: {volume: 1.0},
            piano: {volume: 1.0},
          },
          bgm: {
            bgm3: {volume: 1.0},
            bgm5: {volume: 0.6},
            bgm6: {volume: 1.0},
            bgm7: {volume: 0.8},
            bgm11: {volume: 0.8},
            bgm13: {volume: 1.0},
          },
        },
        volumes: {
          master: 0.7,
          bgm: 0.7,
          se: 0.7,
        },
        loadedSounds: {
          se:{},
          bgm: {},
        },
        audioContext: null,
        bgmBufferSource: null,
        showingMenu: false,
      }
    },
    mounted(){
      this.audioContext = new AudioContext();
      this.loadVolume();
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
      decrypt(binary){
        // 直ダウンロードしても再生不可能なバイナリにする
        return binary.slice(6);
      },
      loadSound(key, response){
        this.audioContext.decodeAudioData(response, (buffer) => {
            this.loadedSounds.se[key] = buffer;
        }, function(msg) {console.error(msg)});
      },
      loadBgm(key, response){
        this.audioContext.decodeAudioData(response, (buffer) => {
            this.loadedSounds.bgm[key] = buffer;
        }, function(msg) {console.error(msg)});
      },
      loadSounds(){
        for(let key of Object.keys(this.sounds.se)){
          axios.get(`/game/square/sounds/${key}.wav.enc`, { responseType : 'arraybuffer' })
            .then((results) => {
              const decrypted = this.decrypt(results.data);
              this.loadSound(key, decrypted);
            })
            .catch((results) => {
              console.warn(results);
              console.warn("NG");
            })
        }
      },
      loadBgms(){
        for(let key of Object.keys(this.sounds.bgm)){
          axios.get(`/game/square/sounds/bgm/${key}.mp3.enc`, { responseType : 'arraybuffer' })
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
        if(!this.sounds.se[key]){
          console.warn(`undefined sound key: ${key}`);
          return;
        }
        if(this.loadedSounds.se[key] === null){
          console.warn(`se not loaded, failed to play`);
          return;
        }

        let source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        const finalVolune = volume * this.sounds.se[key].volume;
        gainNode.gain.value = finalVolune;

        source.buffer = this.loadedSounds.se[key];
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
        if(this.sounds.bgm[key] === undefined){
          console.warn(`undefined bgm key: ${key}`);
          return;
        }
        if(this.loadedSounds.bgm[key] === null){
          console.warn(`loading bgm, retry...`);
          setTimeout(()=>{this.playBgm(key)}, 1000);
          return;
        }
        setTimeout(()=>{this.doPlayBgm(key)}, 500);
      },
      doPlayBgm(key){
        // カエルの歌対策で、こっちでも音を止める
        if(this.bgmBufferSource){
          this.bgmBufferSource.stop();
        }

        let source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        const finalVolune = this.bgmVolume * this.sounds.bgm[key].volume;
        gainNode.gain.value = finalVolune;

        source.buffer = this.loadedSounds.bgm[key];
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
        localStorage.volumeMaster = this.volumes.master;
        localStorage.volumeBgm = this.volumes.bgm;
        localStorage.volumeSe = this.volumes.se;
        this.syncCurrentBgmVolume();
      },
      loadVolume: function(){
        if (localStorage.volumeMaster) {
          this.volumes.master = localStorage.volumeMaster || 1;
          this.volumes.bgm = localStorage.volumeBgm || 1;
          this.volumes.se = localStorage.volumeSe || 1;
        }
      },
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
  background-color: $ingame-background;
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
