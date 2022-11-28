let master = require("../masterdata/messages.js");

module.exports = class Message {
  constructor() {
    this.idTable = this.getAll().reduce((iter, x) => {
      iter[x.id] = x;
      return iter;
    }, {});
    this.indexSituation = this.constructIndexSituation();
  }

  getAll() {
    return master;
  }

  getById(id) {
    return this.idTable[id];
  }

  getBySituation(characterId, when, chapterIndex) {
    const records = this.indexSituation[this.indexKey(characterId, when)] || [];
    return records.filter(
      (x) => x.chapter_indexes.indexOf(chapterIndex) !== -1,
    );
  }

  // private

  indexKey(characterId, when) {
    return `${characterId}_${when}`;
  }

  constructIndexSituation() {
    let index = {};
    for (let record of this.getAll()) {
      let indexKey = this.indexKey(record.character_id, record.when);
      if (index[indexKey]) {
        index[indexKey].push(record);
      } else {
        index[indexKey] = [record];
      }
    }
    return index;
  }
};
