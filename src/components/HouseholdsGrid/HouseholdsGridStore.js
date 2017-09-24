class HouseholdsGridStore {
  constructor(records) {
    if (!records) {
      this.size = 200;
      this._cache = [];
    } else {
      this.householdsData = records.housesholds;
      this.accountsData = [];
      let result = [];
      this.size = this.householdsData.length;
      this.numHouseholds = 0;
      this.numAccounts = 0;
      this.numSecurities = 0;
      this.householdName = '';

      this.householdsData.forEach(h => {
        this.householdName = h.household.name;
        if (!h.accounts.length) {
          this.size--;
        } else {
          let addAccounts = this.addAccountsData(h.accounts);
          this.accountsData.push(addAccounts);
          result.push({
            houseIndex: this.numHouseholds,
            type: "household",
            name: this.householdName,
            description: h.model.sector,
            model: h.model.id,
            balance: h.household.ladder_to_total_percentage,
            2017: 10000,
            2018: 10000,
            2019: 10000,
            2020: 10000,
            2021: 10000,
            accounts: addAccounts
          })
          this.numHouseholds++;
        }
      })
      this._cache = result;
    }
  }

  addAccountsData(accounts) {
    let result = [];
    accounts.forEach(a => {
      let addSecurities = this.addSecuritiesData(a.securities, a.account_number);
      result.push({
        type: "account",
        name: this.householdName,
        id: this.numAccounts + 1,
        houseIndex: this.numHouseholds,
        accountNumLabel: 'Acct #',
        accountNumber: a.account_number,
        balance: 0,
        2017: 10000,
        2018: 10000,
        2019: 10000,
        2020: 10000,
        2021: 10000,
        securities: addSecurities
      })
      this.numAccounts++;
    })
    return result;
  }

  addSecuritiesData(securities, accountNumber) {
    let result = [];
    let securitiesIndex = 1;
    securities.forEach(s => {
      result.push({
        type: "security",
        accountNumber: accountNumber,
        name: this.householdName,
        id: securitiesIndex,
        accountsIndex: this.numAccounts,
        houseIndex: this.numHouseholds,
        cusipLabel: 'CUSIP',
        cusip: s.cusip,
        currentPrice: s.price,
        quantity: s.face_value,
        balance: '-',
        2017: 10000,
        2018: 10000,
        2019: 10000,
        2020: 10000,
        2021: 10000,
      })
      this.numSecurities++;
      securitiesIndex++;
    })
    return result;
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
      console.log("index undefined in clientsGridStore");
    }
  }

  getAccountsData(/*number*/ index) /*object*/ {
    return this._cache[index].accounts;
  }

  getAccountsAt(/*number*/ index) /*?object*/ {
    if (index >= 0) {
      if (index < 0 || index > this.size){
        return undefined;
      }
      return this.getAccountsData(index);
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
