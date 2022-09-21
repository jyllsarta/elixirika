
<template lang="pug">
  .player_ui
    .slot
      .title
        | ITEM
      .items.content
        .item_slot
        .item_slot
        .item_slot
    .slot
      .title
        | HP
      .hp.content
        .bar
          .skew
            .base
            .current
    .slot
      .title
        | LOCK
      .locks.content
        .skew
          .lock_box
            .lock_slot.locked
            .lock_slot.locked
            .lock_slot.locked
            .lock_slot.locked
            .lock_slot
            .lock_slot
    .slot
      .title
        | MP
      .mp.content
        .bar
          .skew
            .base
            .current
</template>

<script lang="typescript">
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .player_ui{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 2px;
    padding: 8px;
    .slot{
      .title{
        font-size: 8px;
        color: cyan;
        line-height: 100%;
      }
    }
    .items{
      display: flex;
      gap: 8px;
      padding-left: 40px;
      .item_slot{
        width: 40px;
        height: 40px;
        border: 1px solid cyan;
      }
    }
    .hp{
      width: 240px;
      padding-left: 32px;
    }
    .locks{
      padding-left: 24px;
      .skew{
        transform: skewX(-20deg);
        width: 100%;
        height: 100%;
        .lock_box {
          width: 100%;
          height: 100%;
          display: flex;
          gap: 8px;
          .lock_slot{
            width: 16px;
            height: 32px;
            border: 1px solid cyan;
          }
          .locked{
            background-color: cyan;
          }
        }
      }
    }
    .mp{
      width: 480px;
      padding-left: 16px;
    }
  }

  .bar{
    width: 100%;
    height: 32px;
    position: relative;
    .skew{
      transform: skewX(-20deg);
      width: 100%;
      height: 100%;
      .base{
        border: 1px solid cyan;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgb(52, 69, 73);
      }
      .current{
        position: absolute;
        width: 40%;
        height: 100%;
        background-color: rgb(0, 255, 255);
      }
    }
  }
</style>
