class HouseholdsGridStore {
  constructor(records) {
    if (!records) {
      this.size = 200;
      this._cache = [];
    } else {
      this.size = records.length;
      this.householdsDataArray = [];
      this.householdNames = [];
      this.count = 1;

      records.forEach(r => {
        let alreadyAdded = false;
        if (this.householdNames.length) {
          this.householdNames.forEach(h =>{
            console.log("forEach h = ", h);
            if (h === r.households.name) {
              alreadyAdded = true;
            }
          })
        }
        if (!alreadyAdded) {
          let householdsObject = r.households;
          let accountsObject = r.accounts;
          let securitiesObject = r.securities;
          let modelsObject = r.models;
          let rawDate = securitiesObject.maturity_date;
          let trimmedDate = rawDate.substring(0, 10);
          let householdsData = {
            id: this.count,
            name: householdsObject.name,
            description: accountsObject.account_description,
            model: modelsObject.name,
            balance: householdsObject.ladder_to_total_percentage,
            marketValue: securitiesObject.price * 100,
            accounts: [
              {
                accountNumber: accountsObject.account_number,
                securities: [
                  {
                    cusip: securitiesObject.cusip,
                    currentPrice: securitiesObject.price,
                    maturityDate: trimmedDate,
                    quantity: 100,
                  }
                ]
              }
            ]
          }
          this.count++;
          this.householdsDataArray.push(householdsData);
          this._cache = this.householdsDataArray
        } else {
          console.log("addToExistingHousehold function would've been hit!!");
        }
      })
    }
  }

  getRowData(/*number*/ index) /*object*/ {
    let data = this._cache[index];
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      model: data.model,
      accountNumber: data.accounts[0].accountNumber,
      cusip: data.accounts[0].securities[0].cusip,
      currentPrice: data.accounts[0].securities[0].currentPrice,
      maturityDate: data.accounts[0].securities[0].maturityDate,
      quantity: data.accounts[0].securities[0].quantity,
      balance: data.balance,
      marketValue: data.marketValue
    }
  }

  getObjectAt(/*number*/ index) /*?object*/ {
    if (index >= 0) {
      if (index < 0 || index > this.size){
        return undefined;
      }
      return this.getRowData(index);
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
