class SecuritiesGridStore {
  constructor(securities) {
    if (!securities) {
      this.size = 2;
      this._cache = [];
    } else {
      this._cache = securities;
      this.size = securities.length;
    }
  }

  getRowData(/*number*/ index) /*object*/ {
    return this._cache[index];
  }

  getObjectAt(/*number*/ index) /*?object*/ {
    if (index >= 0) {
      if (index < 0 || index > this.size){
        return undefined;
      }
      return this.getRowData(index);
    } else {
      console.log("index undefined in securitiesGridStore");
    }
  }

  filterObjectsPercentage(/*number*/ index, /*number*/ percentage, /*string*/ operator) /*?object*/ {
    if (percentage < 0 || percentage > 100){
      return undefined;
    }
    if (this._cache[index][percentage] > percentage) {
      return this._cache[index];
    }
  }

  getAll() {
    if (this._cache.length < this.size) {
      for (var i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }
    return this._cache.slice();
  }

  getSize() {
    return this.size;
  }
}

module.exports = SecuritiesGridStore;
