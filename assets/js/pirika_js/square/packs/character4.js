let Character4_Default = require("./callbacks/character4_default");
let Character4_1 = require("./callbacks/character4_1");
let Character4_2 = require("./callbacks/character4_2");
let Character4_3 = require("./callbacks/character4_3");
let Character4_4 = require("./callbacks/character4_4");
let AbilityAddCardWithMp = require("./abilityAddCardWithMp");
let AbilityDamageWithMp = require("./abilityDamageWithMp");
let AbilityDrawWithMp = require("./abilityDrawWithMp");
let Constants = require("./constants");
let Card = require("./card");

module.exports = class Character4 {
  constructor() {
    this.id = 4;
    this.name = "アヤメ";
    this.defaultMessage = "いきますよー！";
    this.clearMessage = "見事 敵を全滅させた！";
    this.bgm = "bgm11";

    this.uniqueParameters = {
      abilities: [
        new AbilityDamageWithMp(1, 5, 70),
        new AbilityAddCardWithMp(
          2,
          [new Card(11, "s", "sender"), new Card(11, "h", "sender")],
          50,
        ),
        new AbilityDrawWithMp(3, 1, 4),
      ],
      // initializeEnemy で実体化する
      enemies: [],
      mp: 50,
      maxMp: 100,
    };
    this.defaultCallback = new Character4_Default();
    this.callbacks = {
      1: new Character4_1(),
      2: new Character4_2(),
      3: new Character4_3(),
      4: new Character4_4(),
    };
  }

  getCallback(callbackName, index) {
    return (
      this.callbacks[index][callbackName] || this.defaultCallback[callbackName]
    );
  }

  damageToNextEnemy(power, model, isAbilityDamage = false) {
    let nextEnemy = this.uniqueParameters.enemies.find((enemy) => enemy.hp > 0);
    if (!nextEnemy) {
      console.warn("no damage target!");
      return;
    }
    if (nextEnemy.shield > 0) {
      nextEnemy.shield = Math.max(nextEnemy.shield - power, 0);
    } else {
      // maxDamage はシールドの場合取り扱わず、本体のダメージ時のみ かつ -1 以外が指定されている場合に有効
      const adjustedDamage =
        nextEnemy.maxDamage === -1
          ? power
          : Math.min(power, nextEnemy.maxDamage);
      nextEnemy.hp = Math.max(nextEnemy.hp - adjustedDamage, 0);
    }
    if (nextEnemy.hp <= 0) {
      model.messageManager.register("specialAbilityDefeatEnemy");
    }
    nextEnemy.damageHistory.push({
      power: power,
      isAbilityDamage: isAbilityDamage,
    });
    const cleared = model.character.getCallback(
      "isClearedMainTarget",
      model.chapter.index,
    )(model.character, model);
    if (cleared) {
      model.calculateScore();
      model.checkAndUpdateClearedChallenges();
      model.setForceStalemate(model.character.clearMessage, true);
    }
  }

  initializeEnemy(enemyParameters) {
    let enemies = [];
    for (let param of enemyParameters) {
      let enemy = {
        id: param.id,
        order: param.order,
        hp: param.hp,
        hpMax: param.hp,
        image: param.image,
        shield: param.shield || 0,
        shieldMax: param.shield || 0,
        // maxDamage は マイナス1の場合無効扱いとして処理する
        maxDamage: param.maxDamage || -1,
        damageHistory: [],
      };
      enemies.push(enemy);
    }
    this.uniqueParameters.enemies = enemies;
  }

  hasSufficientMp(cost) {
    return this.uniqueParameters.mp >= cost;
  }

  isAllEnemyDefeated() {
    return this.uniqueParameters.enemies.every((enemy) => enemy.hp <= 0);
  }
};
