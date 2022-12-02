<template>
  <transition name="show-in">
    <div class="_message">
      <div class="_back" @click="close"></div>
      <div class="content">
        <div class="header">
          <GeneralButton
            class="back_button"
            @click="close"
            :disabled="false"
            :flashing="false"
            :width="'160px'"
            :height="'40px'"
            :color="'blue'"
            :label="'とじる'"
          >
          </GeneralButton>
          <div class="title">おたより</div>
        </div>
        <div class="description">
          簡単なメッセージを送れます。バグ報告や仕様質問などにご活用ください！感想いただけると大喜びします
        </div>
        <div class="sender">
          <input
            class="sending_message"
            type="text"
            name="sending_message"
            v-model="sendingMessage"
          />
          <GeneralButton
            class="send"
            @click="send"
            :disabled="false"
            :flashing="false"
            :width="'160px'"
            :height="'30px'"
            :color="'blue'"
            :label="'送信'"
          >
          </GeneralButton>
        </div>
        <div class="body">
          <div class="messages">
            <div class="__message index">
              <div class="created_at column">日付</div>
              <div class="text column">内容</div>
              <div class="response column">返信</div>
            </div>
            <div class="__message" v-for="(message, index) in messages" :key="index">
              <div class="created_at column">{{ message.created_at }}</div>
              <div class="text column">{{ message.message }}</div>
              <div class="response column">{{ message.response }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';
import store from './packs/store';
import GeneralButton from './GeneralButton.vue';

export default {
  store,
  components: {
    GeneralButton,
  },
  data() {
    return {
      messages: [],
      sendingMessage: '',
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    close() {
      this.$store.commit('closeMessage');
      this.$store.commit('playSound', {key: 'menuClose'});
    },
    fetch() {
      axios
          .get('/square/messages')
          .then((results) => {
            this.messages = results.data;
          })
          .catch((results) => {
            console.warn(results);
            console.warn('NG');
          });
    },
    send() {
      axios
          .post('/square/messages/create', {
            _csrf_token: document.querySelector('meta[name=csrf-token]')
                .attributes.content.textContent,
            username: localStorage.rawNameSquare,
            message: this.sendingMessage,
          })
          .then((results) => {
            this.sendingMessage = '';
            this.$store.commit('playSound', {key: 'special2'});
            this.fetch();
          })
          .catch((results) => {
            console.warn(results);
            console.warn('NG');
          });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
._message {
  border: 2px solid $gray2;
  color: $white;
  ._back {
    position: absolute;
    // 画面横幅のなにもない領域 - 20px まで当たり判定を持つ
    right: calc((#{$window-width} - 100vw + 20px) / 2);
    top: -100px;
    width: 100vw;
    height: 90vh;
  }
  .content {
    position: absolute;
    background-color: $ingame-background;
    width: 100%;
    height: 100%;
    padding: $space-m;
    .header {
      height: 50px;
      display: flex;
      gap: $space-m;
      align-items: center;
      .title {
        line-height: 100%;
        font-size: $font-size-large;
      }
    }
    .description {
      border-bottom: 1px solid $gray3;
      font-size: $font-size-mini;
    }
    .sender {
      padding: $space-m;
      display: flex;
      align-items: center;
      gap: $space-m;
      .sending_message {
        flex: 1;
      }
    }
    .body {
      height: calc(100% - 120px);
      width: 100%;
      display: flex;
      justify-content: center;
      padding-top: $space-m;
      .messages {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        gap: $space-m;
        padding-right: $space-m;
        &::-webkit-scrollbar {
          width: 10px;
        }
        &::-webkit-scrollbar-track {
          background: transparent;
          border: none;
          border-radius: $radius;
          box-shadow: inset 0 0 2px #777;
        }
        &::-webkit-scrollbar-thumb {
          background: $gray2;
          border-radius: $radius;
          box-shadow: none;
        }

        .__message {
          display: flex;
          gap: $space-m;
          width: 100%;
          &.index {
            border-bottom: 1px solid $gray3;
            padding-bottom: $space-m;
          }
          .column {
            border-left: 1px solid $gray3;
            padding-left: $space-m;
          }
          .created_at {
            width: 14%;
          }
          .text {
            width: 43%;
            white-space: pre-line;
            word-break: break-all;
          }
          .response {
            width: 43%;
            white-space: pre-line;
            word-break: break-all;
          }
        }
      }
    }
  }
}
</style>
