// const PATH_GET_CLIENTS = '/clients/088B5FAE-E78C-4817-9724-C93DF2AEB14D';
// let PATH_BASE = '';
// process.env.NODE_ENV === 'production'
// ? PATH_BASE = process.env.REACT_APP_API_PROD
// : PATH_BASE = process.env.REACT_APP_API_DEV;

class HouseholdsGridStore {
  constructor() {
    this.size = 200;
    this._cache = [];
  }

  getRowData(/*number*/ index) /*object*/ {
    // let householdsObject = this._cache[index]["households"];
    // let accountsObject = this._cache[index]["accounts"];
    // let securitiesObject = this._cache[index]["securities"];
    // let modelsObject = this._cache[index]["models"];
    // return {
    //   id: index,
    //   name: householdsObject.name,
    //   description: accountsObject.account_description,
    //   model: modelsObject.name,
    //   accountNumber: accountsObject.account_number,
    //   cusip: securitiesObject.cusip,
    //   currentPrice: securitiesObject.price,
    //   maturityDate: securitiesObject.maturity_date,
    //   quantity: 100,
    //   balance: householdsObject.ladder_to_total_percentage,
    //   marketValue: securitiesObject.price * 100
    // }
    return {
      id: index,
      name: "Test Home",
      description: "fake description",
      model: "test model",
      accountNumber: Math.floor(Math.random() * 100),
      cusip: "123ABC",
      currentPrice: 107,
      maturityDate: "Sep 10, 2017",
      quantity: 100,
      balance: 80,
      marketValue: Math.floor(Math.random() * 10000)
    }
  }

  getObjectAt(/*number*/ index) /*?object*/ {
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

module.exports = HouseholdsGridStore;
