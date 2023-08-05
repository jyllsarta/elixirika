<template>
  <div class="game_window">
    <div class="header">
      <div class="floating_menu tentative_button" @click="loadMenu">
        メニューに戻る
      </div>
      <div class="title">
        装備
      </div>
    </div>
    <div class="content_area">
      <div class="content">
        <div class="character" @click="onCharacterClick">
          <img src="images/queens/characters/character90_1.png" class="character_image">
        </div>
        <div class="informations">
          <div class="header">
            <div class="baloon tentative_panel">せりふー</div>
            <div class="detail">
              <div class="item_area">
                <item-icon-vue class="equipment_icon" :equipment="currentEquipment" />
              </div>
              <div class="description_area">
                <div class="name">
                  {{ currentEquipment.title }}
                </div>
                <div class="description">
                  {{ currentEquipment.description }}
                </div>
              </div>
            </div>
          </div>
          <div class="main">
            <div class="equipment_area">
              <div class="header">
                <div class="label">
                  装備
                </div>
              </div>
              <div class="equipment_parts">
                <div class="equipment_part">
                  <div class="label_area">
                    <div class="label">ターゲット</div>
                    <div class="description">メイン盾</div>
                  </div>
                  <div class="equipments">
                    <item-icon-vue
                      class="equipment"
                      v-for="equipment in targets"
                      :key="equipment.id"
                      :equipment="equipment"
                      @mouseenter="currentEquipmentId = equipment.id"
                      @click="removeEquipment(equipment)"
                    />
                  </div>
                </div>
                <div class="equipment_part">
                  <div class="label_area">
                    <div class="label">スキル</div>
                    <div class="description">バトル中にMPを使って発動</div>
                  </div>
                  <div class="equipments">
                    <item-icon-vue
                      class="equipment"
                      v-for="equipment in skills"
                      :key="equipment.id"
                      :equipment="equipment"
                      @mouseenter="currentEquipmentId = equipment.id"
                      @click="removeEquipment(equipment)"
                    />
                  </div>
                </div>
                <div class="equipment_part">
                  <div class="label_area">
                    <div class="label">インスタント</div>
                    <div class="description">パッシブ効果</div>
                  </div>
                  <div class="equipments">
                    <item-icon-vue
                      class="equipment"
                      v-for="equipment in instants"
                      :key="equipment.id"
                      :equipment="equipment"
                      @mouseenter="currentEquipmentId = equipment.id"
                      @click="removeEquipment(equipment)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="stock_area">
              <div class="header">
                <div class="label">
                  ストック
                </div>
              </div>
              <div class="stocks">
                <item-icon-vue
                  class="equipment_icon"
                  v-for="equipment in stocks"
                  :key="equipment.id"
                  :equipment="equipment"
                  @mouseenter="currentEquipmentId = equipment.id"
                  @click="equip(equipment)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "./packs/store";
import Masterdata from "./packs/masterdata";
import Savedata from "./packs/savedata";
import ItemIconVue from "./ItemIcon.vue";

export default {
  store,
  components: {
    ItemIconVue,
  },
  data(){
    return {
      currentEquipmentId: 1,
      maxSlot: 2,
      dataWatcher: 1,
    }
  },
  computed: {
    currentEquipment(){
      return Masterdata.get("equipments", this.currentEquipmentId);
    },
    allEquipmentsMap(){
      // dataWatcherに依存していることにして、セーブデータの変更を検知する
      this.dataWatcher++;
      // TODO: 未所持の装備を除外する
      return Masterdata.getAllMap("equipments");
    },
    stocks(){
      // stocks は すべての装備から targets, skills, instants を除いたもの
      const save = new Savedata().get().equipments;
      const allEquipments = Object.values(this.allEquipmentsMap);
      const alreadyEquipedIds = [
        ...save.targets,
        ...save.skills,
        ...save.instants,
      ];
      return allEquipments.filter(equipment=> !alreadyEquipedIds.includes(equipment.id));
    },
    targets(){
      const save = new Savedata().get().equipments.targets;
      return save.map(id=> this.allEquipmentsMap[id]);
    },
    skills(){
      const save = new Savedata().get().equipments.skills;
      return save.map(id=> this.allEquipmentsMap[id]);
    },
    instants(){
      const save = new Savedata().get().equipments.instants;
      return save.map(id=> this.allEquipmentsMap[id]);
    },
  },
  methods: {
    loadMenu(){
      this.$store.commit("loadScene", {name: "menu"});
    },
    equip(equipment){
      let save = new Savedata().get();
      const toFieldName = equipment.type + "s";
      if(save.equipments[toFieldName].length >= this.maxSlot){
        console.warn("exceed max slot");
        return;
      }
      save.equipments[toFieldName].push(equipment.id);
      new Savedata().write(save);
      // 不要な処理だが、allEquipmentsにセーブデータの変更を検知させる
      this.dataWatcher++;
    },
    removeEquipment(equipment){
      let save = new Savedata().get();
      const toFieldName = equipment.type + "s";
      save.equipments[toFieldName] = save.equipments[toFieldName].filter(id=> id !== equipment.id);

      //targetsに限り、最後の一つを外すことはできない
      if(toFieldName === "targets" && save.equipments[toFieldName].length === 0){
        console.warn("cannot remove last target");
        return;
      }

      new Savedata().write(save);
      // 不要な処理だが、allEquipmentsにセーブデータの変更を検知させる
      this.dataWatcher++;
    },
  }
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.game_window{
  width: 100%;
  height: 100%;
  background-color: $bg4;
  display: flex;
  flex-direction: column;
  .header{
    display: flex;
    padding: 8px;
    gap: 8px;
    height: 80px;
    .floating_menu{
      width: 160px;
    }
    .title{
      font-size: 30px;
      width: 300px;
      height: 60px;
      padding-top: 15px;
      line-height: 100%;
      border-bottom: 1px dotted $white;
    }
  }
  .content_area{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .content{
      width: 100%;
      height: 100%;
      max-width: 1200px;
      max-height: 600px;
      padding: 8px;
      display: flex;
      border: 1px dotted $white;
      .character{
        width: 25%;
        height: 100%;
        overflow: hidden;
        .character_image{
          width: 130%;
          transform: translateX(-10%);
        }
      }
      .informations{
        width: 75%;
        height: 100%;
        .header{
          padding: 8px;
          display: flex;
          gap: 8px;
          height: 25%;
          width: 100%;
          .baloon{
            width: 35%;
            height: 100%;
            border: 1px dotted $white;
          }
          .detail{
            width: 65%;
            height: 100%;
            border: 1px dotted $white;
            display: flex;
            .item_area{
              width: 30%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              .equipment_icon{
                width: 120px;
                height: 80px;
              }
            }
            .description_area{
              width: 70%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              padding: 8px;
              .name{
                width: 100%;
                font-size: $font-size-large;
              }
              .description{
                width: 100%;
              }
            }
          }
        }
        .main{
          width: 100%;
          height: 75%;
          display: flex;
          gap: 8px;

          .equipment_area{
            height: 100%;
            width: 70%;
            padding: 8px;


            .header{
              height: 10%;
              display: flex;
              justify-content: center;
              align-items: center;
              border-bottom: 1px dotted $white;
            }
            .equipment_parts{
              height: 90%;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              background-color: $bg3;
              .equipment_part{
                flex: 1;
                max-height: 100px;
                width: 100%;
                display: flex;
                padding: 8px;
                .label_area{
                  width: 30%;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-evenly;
                  gap: 8px;
                  border-right: 1px dotted $white;
                  margin-right: 8px;
                  .label{
                    width: 100%;
                    font-size: $font-size-large;
                  }
                  .description{
                    width: 100%;
                    font-size: $font-size-mini;
                  }
                }
              }
              .equipments{
                width: 80%;
                display: flex;
                gap: 8px;
                .equipment{
                  width: 33%;
                  height: 100%;
                }
              }
            }
          }
        }
        .stock_area{
          width: 30%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 8px;
          .header{
            height: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px dotted $white;
          }
          .stocks{
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            align-content: flex-start;
            gap: 8px;
            padding: 8px;
            .equipment_icon{
              width: calc(50% - 4px);
              height: 84px;
            }
          }
        }
      }
    }
  }
}
</style>
