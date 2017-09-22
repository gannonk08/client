class HouseholdsGridStore {
  constructor(records) {
    if (!records) {
      this.size = 200;
      this._cache = [];
    } else {
      this.householdsData = records.housesholds;
      this.result = [];
      this.size = this.householdsData.length;
      this.count = 1;
      this.householdName = '';
      this.householdsData.forEach(h => {
        this.householdName = h.household.name;
        if (!h.accounts.length) {
          this.size--;
        } else {
          this.result.push({
            type: "household",
            name: this.householdName,
            description: h.model.sector,
            model: h.model.id,
            balance: h.household.ladder_to_total_percentage,
            marketValue: 10000
          })
          // h.accounts.forEach(a => {
          //   let rawDate = a.securities[0].maturity_date;
          //   let trimmedDate = rawDate.substring(0, 10);
          //   this.result.push({
          //     type: "account",
          //     name: this.householdName,
          //     id: this.count,
          //     accountNumber: a.account_number,
          //     cusip: a.securities[0].cusip,
          //     currentPrice: a.securities[0].price,
          //     maturityDate: trimmedDate,
          //     quantity: 100,
          //   })
          // })
        }
      })
      this._cache = this.result;
    }
  }

  getRowData(/*number*/ index) /*object*/ {
    let data = this._cache[index];
    if (data.type === "household") {
      return {
        name: data.name,
        description: data.description,
        model: data.model,
        balance: data.balance,
        marketValue: 10000
      }
    }
    // else {
    //   return {
    //     id: data.id,
    //     name: data.name,
    //     accountNumber: data.accountNumber,
    //     cusip: data.cusip,
    //     currentPrice: data.currentPrice,
    //     maturityDate: data.maturityDate,
    //     quantity: data.quantity
    //   }
    // }
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
