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
      this.accounts2017 = 0;
      this.accounts2018 = 0;
      this.accounts2019 = 0;
      this.accounts2020 = 0;
      this.accounts2021 = 0;
      this.houses2017 = 0;
      this.houses2018 = 0;
      this.houses2019 = 0;
      this.houses2020 = 0;
      this.houses2021 = 0;

      this.householdsData.forEach(h => {
        this.houses2017 = 0;
        this.houses2018 = 0;
        this.houses2019 = 0;
        this.houses2020 = 0;
        this.houses2021 = 0;
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
            2017: this.houses2017,
            2018: this.houses2018,
            2019: this.houses2019,
            2020: this.houses2020,
            2021: this.houses2021,
            accounts: addAccounts
          })
          this.numHouseholds++;
        }
      })
      this._cache = result;
      console.log('this._cache', this._cache);
    }
  }

  addAccountsData(accounts) {
    let result = [];
    this.houses2017 = 0;
    this.houses2018 = 0;
    this.houses2019 = 0;
    this.houses2020 = 0;
    this.houses2021 = 0;
    accounts.forEach(a => {
      let addSecurities = this.addSecuritiesData(a.securities, a.account_number);
      this.houses2017 += this.accounts2017;
      this.houses2018 += this.accounts2018;
      this.houses2019 += this.accounts2019;
      this.houses2020 += this.accounts2020;
      this.houses2021 += this.accounts2021;
      result.push({
        type: "account",
        name: this.householdName,
        id: this.numAccounts + 1,
        houseIndex: this.numHouseholds,
        accountNumLabel: 'Acct #',
        accountNumber: a.account_number,
        balance: 0,
        2017: this.accounts2017,
        2018: this.accounts2018,
        2019: this.accounts2019,
        2020: this.accounts2020,
        2021: this.accounts2021,
        securities: addSecurities
      })
      this.numAccounts++;
    })
    return result;
  }

  addSecuritiesData(securities, accountNumber) {
    let result = [];
    let securitiesIndex = 1;
    let marketValue17 = 0;
    let marketValue18 = 0;
    let marketValue19 = 0;
    let marketValue20 = 0;
    let marketValue21 = 0;
    this.accounts2017 = 0;
    this.accounts2018 = 0;
    this.accounts2019 = 0;
    this.accounts2020 = 0;
    this.accounts2021 = 0;
    securities.forEach(s => {
      let rawMaturityDate = s.maturity_date;
      let rawMaturityDate2 = s.maturity_date;
      let monthDay = rawMaturityDate.substring(3,9);
      let year = rawMaturityDate2.substring(24, 28);
      let maturityDate = monthDay + ', ' + year;
      let quantity = parseFloat(s.face_value.replace(/\$|,/g, ''));
      switch (year) {
        case '2017':
          marketValue17 = s.price * quantity;
          this.accounts2017 += marketValue17;
          break;
        case '2018':
          marketValue18 = s.price * quantity;
          this.accounts2018 += marketValue18;
          break;
        case '2019':
          marketValue19 = s.price * quantity;
          this.accounts2019 += marketValue19;
          break;
        case '2020':
          marketValue20 = s.price * quantity;
          this.accounts2020 += marketValue20;
          break;
        case '2021':
          marketValue21 = s.price * quantity;
          this.accounts2021 += marketValue21;
          break;
        default:
          console.log('switch dont work!!');
      }
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
        quantity: quantity,
        balance: '-',
        maturityDate: maturityDate,
        2017: marketValue17,
        2018: marketValue18,
        2019: marketValue19,
        2020: marketValue20,
        2021: marketValue21
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
