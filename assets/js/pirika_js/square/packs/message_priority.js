let master = require("../masterdata/message_priorities.js");

module.exports = class MessagePriority {
  constructor() {
    this.idTable = this.getAll().reduce((iter, x) => {
      iter[x.id] = x;
      return iter;
    }, {});
    this.indexWhen = this.constructIndexWhen();
  }

  getAll() {
    return master;
  }

  getById(id) {
    return this.idTable[id];
  }

  getPriorityByWhen(when) {
    const priority = this.indexWhen[when]?.priority;
    if (priority === undefined) {
      console.warn(`message_priorities 's when: ${when} is undefined`);
    }
    return priority;
  }

  // private

  indexKey(characterId, when) {
    return `${characterId}_${when}`;
  }

  constructIndexWhen() {
    let index = {};
    for (let record of this.getAll()) {
      let indexKey = record.when;
      if (index[indexKey]) {
        // when は 特に定義上書いてないけどユニーク制約があることにする
        console.warn(
          `masterdata message_priorities 's when[${record.when}] is duplicated`,
        );
      } else {
        index[indexKey] = record;
      }
    }
    return index;
  }
};
