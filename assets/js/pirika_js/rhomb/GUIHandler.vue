<template>
  <div class="gui_handler"></div>
</template>

<script>
import store from "./packs/store";
import Model from "./packs/model";
import Controller from "./packs/controller";

export default {
  store,
  props: {
    model: Model,
    controller: Controller,
  },
  data() {
    return {
      // NOTE(jyllsarta): これ自体storeに持っちゃうのも良さそうだが、どうしようかな...
      consumedGUIEventId: 0,
    };
  },
  watch: {
    "$store.state.guiEvents": {
      handler(afterEvents) {
        const unhandledEvents = afterEvents.filter(
          (event) => event.orderedId > this.consumedGUIEventId,
        );
        unhandledEvents.map((event) => this.handleEvent(event));
      },
      deep: true,
    },
  },
  methods: {
    handleEvent(event) {
      if (!this.controller[event.subject]) {
        console.error(
          `subject ${event.subject} is not found in controller! params: ${event}`,
        );
        return;
      }
      this.controller[event.subject](event);
      this.consumedGUIEventId = Math.max(
        this.consumedGUIEventId,
        event.orderedId,
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.gui_handler {
  display: none;
}
</style>
