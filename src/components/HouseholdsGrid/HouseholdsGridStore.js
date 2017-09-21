class HouseholdsGridStore {
  constructor(records) {
    if (!records) {
      this.size = 200;
      this._cache = [];
    } else {
      this.size = records.length;
      let refinedDataArray = [];
      let count = 0;
      records.forEach(r => {
        let householdsObject = r.households;
        let accountsObject = r.accounts;
        let securitiesObject = r.securities;
        let modelsObject = r.models;
        let rawDate = securitiesObject.maturity_date;
        let trimmedDate = rawDate.substring(0, 10);
        let refinedData = {
          id: count + 1,
          name: householdsObject.name,
          description: accountsObject.account_description,
          model: modelsObject.name,
          accountNumber: accountsObject.account_number,
          cusip: securitiesObject.cusip,
          currentPrice: securitiesObject.price,
          maturityDate: trimmedDate,
          quantity: 100,
          balance: householdsObject.ladder_to_total_percentage,
          marketValue: securitiesObject.price * 100
        }
        count++;
        refinedDataArray.push(refinedData);
      })
      this._cache = refinedDataArray;
    }
  }

  getRowData(/*number*/ index) /*object*/ {
    let householdsObject = this._cache[index]["households"];
    let accountsObject = this._cache[index]["accounts"];
    let securitiesObject = this._cache[index]["securities"];
    let modelsObject = this._cache[index]["models"];
    return {
      id: index,
      name: householdsObject.name,
      description: accountsObject.account_description,
      model: modelsObject.name,
      accountNumber: accountsObject.account_number,
      cusip: securitiesObject.cusip,
      currentPrice: securitiesObject.price,
      maturityDate: securitiesObject.maturity_date,
      quantity: 100,
      balance: householdsObject.ladder_to_total_percentage,
      marketValue: securitiesObject.price * 100
    }
    // return {
    //   id: index,
    //   name: "Test Home",
    //   description: "fake description",
    //   model: "test model",
    //   accountNumber: Math.floor(Math.random() * 100),
    //   cusip: "123ABC",
    //   currentPrice: 107,
    //   maturityDate: "Sep 10, 2017",
    //   quantity: 100,
    //   balance: 80,
    //   marketValue: Math.floor(Math.random() * 10000)
    // }
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
