const PATH_GET_IMPORTS = '/clients/dumby';
let PATH_BASE = '';
process.env.NODE_ENV === 'production'
? PATH_BASE = process.env.REACT_APP_API_PROD
: PATH_BASE = process.env.REACT_APP_API_DEV;

class GridStore {
  constructor(listSize) {
    this.size = listSize || 1000;
    this._cache = [];
  }

  getObjectAt(/*number*/ index) /*?object*/ {
    if (index < 0 || index > this.size){
      return undefined;
    }
    if (this._cache[index] === undefined) {
      return undefined;
    }
    return this._cache[index];
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
      fetch(PATH_BASE + PATH_GET_IMPORTS, {
        mode: 'cors',
        credentials: 'include',
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      })
      .then (res => res.json())
      .then(res => {
        if (res.status === "OK") {
          console.log("dumby data: ", res.records);
          let dataArray = res.records;
          this.size = dataArray.length;
          this._cache = dataArray;
          for (var i = 0; i < this.size; i++) {
            this.getObjectAt(i);
          }
          return this._cache.slice();
        }
      })
      .catch(e => console.log(e));
    }
  }

  getSize() {
    return this.size;
  }
}

module.exports = GridStore;
