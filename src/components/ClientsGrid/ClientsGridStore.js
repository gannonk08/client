const PATH_GET_IMPORTS = '/clients/dumby';
let PATH_BASE = '';
process.env.NODE_ENV === 'production'
? PATH_BASE = process.env.REACT_APP_API_PROD
: PATH_BASE = process.env.REACT_APP_API_DEV;

class ClientsGridStore {
  constructor() {
    this.size = 8;
    fetch(PATH_BASE + PATH_GET_IMPORTS, {
      mode: 'cors',
      credentials: 'include',
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    .then (res => res.json())
    .then(res => {
      if (res.status === "OK") {
        console.log("dumby data in store constructor: ", res.records);
        this._cache = res.records;
        this._cache.shift();
        this.size = this._cache.length;
      }
    })
    .catch(e => console.log(e));
  }

  getRowData(/*number*/ index) /*object*/ {
    console.log("getRowData was hit");
    console.log("getRowData index", index);
    let rowData = this._cache[index];
    return rowData;
  }

  getObjectAt(/*number*/ index) /*?object*/ {
    console.log('getObjectAt index: ', index);
    if (index >= 0) {
      if (index < 0 || index > this.size){
        return undefined;
      }
      if (this._cache[index] === undefined) {
        this._cache[index] = this.getRowData(index);
      }
      return this._cache[index];
    } else {
      console.log("index undefined in clientsGridStore");
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
    console.log("getAll was hit");
    if (this._cache.length < this.size) {
      for (var i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }
    return this._cache.slice();
  }

  getSize() {
    console.log('getSize was hit');
    return this.size;
  }
}

module.exports = ClientsGridStore;
