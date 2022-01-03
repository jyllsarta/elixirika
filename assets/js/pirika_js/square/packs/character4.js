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
  constructor(){
    this.id = 4;
    this.name = "アヤメ";
    this.defaultMessage = "いきますよー！";

    this.uniqueParameters = {
      abilities: [
        new AbilityAddCardWithMp( [new Card( 11, "s", "sender"), new Card( 11, "h", "sender")], Constants.costOfAbilityAddSenderCard),
        new AbilityDamageWithMp(5,10),
        new AbilityDrawWithMp(1,1),
      ],
      // initializeEnemy で実体化する
      enemies: [],
      mp: 0,
    }
    this.defaultCallback = new Character4_Default();
    this.callbacks = {
      1: new Character4_1(),
      2: new Character4_2(),
      3: new Character4_3(),
      4: new Character4_4()
    }
  }

  getCallback(callbackName, index){
    console.log(callbackName, index)
    return this.callbacks[index][callbackName] || this.defaultCallback[callbackName];
  }

  damageToNextEnemy(power, isAbilityDamage=false){
    let nextEnemy = this.uniqueParameters.enemies.find(enemy=>enemy.hp>0);
    if(!nextEnemy){
      console.warn("no damage target!")
      return;
    }
    nextEnemy.hp -= power;
    nextEnemy.damageHistory.push({power: power, isAbilityDamage: isAbilityDamage});
  }

  initializeEnemy(enemyParameters){
    let enemies = [];
    for(let param of enemyParameters){
      let enemy = {
        id: param.id,
        hp: param.hp,
        hpMax: param.hp,
        image: param.image,
        damageHistory: [],
      }
      enemies.push(enemy)
    };
    this.uniqueParameters.enemies = enemies;
  }

  hasSufficientMp(cost){
    return this.uniqueParameters.mp >= cost;
  }

  isAllEnemyDefeated(){
    return this.uniqueParameters.enemies.every(enemy=>enemy.hp<=0)
  }
};
