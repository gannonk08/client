class HouseholdsGridStore {
  constructor(records) {
    let dataRecords = records;
    console.log('records', dataRecords);
    if (!dataRecords.housesholds.length) {
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
      this.accounts2022 = 0;
      this.accounts2023 = 0;
      this.accounts2024 = 0;
      this.accounts2025 = 0;
      this.accounts2026 = 0;
      this.accounts2027 = 0;
      this.accounts2028 = 0;
      this.accounts2029 = 0;
      this.accounts2030 = 0;
      this.accounts2031 = 0;
      this.accounts2032 = 0;
      this.accounts2033 = 0;
      this.accounts2034 = 0;
      this.accounts2035 = 0;
      this.accounts2036 = 0;
      this.accounts2037 = 0;
      this.accounts2038 = 0;
      this.accounts2039 = 0;
      this.accounts2040 = 0;
      this.accounts2041 = 0;
      this.accounts2042 = 0;
      this.accounts2043 = 0;
      this.accounts2044 = 0;
      this.accounts2045 = 0;
      this.accounts2046 = 0;

      this.latestYear = 2017;

      this.householdsData.forEach(h => {
        this.houses2017 = 0;
        this.houses2018 = 0;
        this.houses2019 = 0;
        this.houses2020 = 0;
        this.houses2021 = 0;
        this.houses2022 = 0;
        this.houses2023 = 0;
        this.houses2024 = 0;
        this.houses2025 = 0;
        this.houses2026 = 0;
        this.houses2027 = 0;
        this.houses2028 = 0;
        this.houses2029 = 0;
        this.houses2030 = 0;
        this.houses2031 = 0;
        this.houses2032 = 0;
        this.houses2033 = 0;
        this.houses2034 = 0;
        this.houses2035 = 0;
        this.houses2036 = 0;
        this.houses2037 = 0;
        this.houses2038 = 0;
        this.houses2039 = 0;
        this.houses2040 = 0;
        this.houses2041 = 0;
        this.houses2042 = 0;
        this.houses2043 = 0;
        this.houses2044 = 0;
        this.houses2045 = 0;
        this.houses2046 = 0;
        this.householdName = h.household.name;
        if (!h.accounts.length) {
          this.size--;
        } else {
          let addAccounts = this.addAccountsData(h.accounts);
          let getBalance = this.getBalancePercentage();
          this.accountsData.push(addAccounts);
          result.push({
            houseIndex: this.numHouseholds,
            type: "household",
            name: this.householdName,
            description: 'sector',
            model: 'model id',
            balance: getBalance + ' %',
            2017: '$ ' + this.houses2017.toLocaleString(),
            2018: '$ ' + this.houses2018.toLocaleString(),
            2019: '$ ' + this.houses2019.toLocaleString(),
            2020: '$ ' + this.houses2020.toLocaleString(),
            2021: '$ ' + this.houses2021.toLocaleString(),
            2022: '$ ' + this.houses2022.toLocaleString(),
            2023: '$ ' + this.houses2023.toLocaleString(),
            2024: '$ ' + this.houses2024.toLocaleString(),
            2025: '$ ' + this.houses2025.toLocaleString(),
            2026: '$ ' + this.houses2026.toLocaleString(),
            2027: '$ ' + this.houses2027.toLocaleString(),
            2028: '$ ' + this.houses2028.toLocaleString(),
            2029: '$ ' + this.houses2029.toLocaleString(),
            2030: '$ ' + this.houses2030.toLocaleString(),
            2031: '$ ' + this.houses2031.toLocaleString(),
            2032: '$ ' + this.houses2032.toLocaleString(),
            2033: '$ ' + this.houses2033.toLocaleString(),
            2034: '$ ' + this.houses2034.toLocaleString(),
            2035: '$ ' + this.houses2035.toLocaleString(),
            2036: '$ ' + this.houses2036.toLocaleString(),
            2037: '$ ' + this.houses2037.toLocaleString(),
            2038: '$ ' + this.houses2038.toLocaleString(),
            2039: '$ ' + this.houses2039.toLocaleString(),
            2040: '$ ' + this.houses2040.toLocaleString(),
            2041: '$ ' + this.houses2041.toLocaleString(),
            2042: '$ ' + this.houses2042.toLocaleString(),
            2043: '$ ' + this.houses2043.toLocaleString(),
            2044: '$ ' + this.houses2044.toLocaleString(),
            2045: '$ ' + this.houses2045.toLocaleString(),
            2046: '$ ' + this.houses2046.toLocaleString(),
            accounts: addAccounts
          })
          this.numHouseholds++;
          console.log('race forEach');
        }
      })
      this._cache = result;
      console.log('this._cache', this._cache);
    }
  }

  getBalancePercentage() {
    let yearArray = [ this.houses2017, this.houses2018, this.houses2019, this.houses2020, this.houses2021, this.houses2022, this.houses2023, this.houses2024, this.houses2025, this.houses2026, this.houses2027, this.houses2028, this.houses2029, this.houses2030, this.houses2031, this.houses2032, this.houses2033, this.houses2034, this.houses2035, this.houses2036, this.houses2037, this.houses2038, this.houses2039, this.houses2040, this.houses2041, this.houses2042, this.houses2043, this.houses2044, this.houses2045, this.houses2046];
    let count = 0;
    for (let i = 0; i < yearArray.length; i++) {
      if (yearArray[i] !== 0) {
        count++
      }
    }
    let result = count / yearArray.length * 100;
    let roundedResult = result.toFixed(2);
    return roundedResult;
  }

  addAccountsData(accounts) {
    let result = [];
    this.houses2017 = 0;
    this.houses2018 = 0;
    this.houses2019 = 0;
    this.houses2020 = 0;
    this.houses2021 = 0;
    this.houses2022 = 0;
    this.houses2023 = 0;
    this.houses2024 = 0;
    this.houses2025 = 0;
    this.houses2026 = 0;
    this.houses2027 = 0;
    this.houses2028 = 0;
    this.houses2029 = 0;
    this.houses2030 = 0;
    this.houses2031 = 0;
    this.houses2032 = 0;
    this.houses2033 = 0;
    this.houses2034 = 0;
    this.houses2035 = 0;
    this.houses2036 = 0;
    this.houses2037 = 0;
    this.houses2038 = 0;
    this.houses2039 = 0;
    this.houses2040 = 0;
    this.houses2041 = 0;
    this.houses2042 = 0;
    this.houses2043 = 0;
    this.houses2044 = 0;
    this.houses2045 = 0;
    this.houses2046 = 0;
    accounts.forEach(a => {
      let addSecurities = this.addSecuritiesData(a.securities, a.account_number);
      this.houses2017 += this.accounts2017;
      this.houses2018 += this.accounts2018;
      this.houses2019 += this.accounts2019;
      this.houses2020 += this.accounts2020;
      this.houses2021 += this.accounts2021;
      this.houses2022 += this.accounts2022;
      this.houses2023 += this.accounts2023;
      this.houses2024 += this.accounts2024;
      this.houses2025 += this.accounts2025;
      this.houses2026 += this.accounts2026;
      this.houses2027 += this.accounts2027;
      this.houses2028 += this.accounts2028;
      this.houses2029 += this.accounts2029;
      this.houses2030 += this.accounts2030;
      this.houses2031 += this.accounts2031;
      this.houses2032 += this.accounts2032;
      this.houses2033 += this.accounts2033;
      this.houses2034 += this.accounts2034;
      this.houses2035 += this.accounts2035;
      this.houses2036 += this.accounts2036;
      this.houses2037 += this.accounts2037;
      this.houses2038 += this.accounts2038;
      this.houses2039 += this.accounts2039;
      this.houses2040 += this.accounts2040;
      this.houses2041 += this.accounts2041;
      this.houses2042 += this.accounts2042;
      this.houses2043 += this.accounts2043;
      this.houses2044 += this.accounts2044;
      this.houses2045 += this.accounts2045;
      this.houses2046 += this.accounts2046;
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
        2022: this.accounts2022,
        2023: this.accounts2023,
        2024: this.accounts2024,
        2025: this.accounts2025,
        2026: this.accounts2026,
        2027: this.accounts2027,
        2028: this.accounts2028,
        2029: this.accounts2029,
        2030: this.accounts2030,
        2031: this.accounts2031,
        2032: this.accounts2032,
        2033: this.accounts2033,
        2034: this.accounts2034,
        2035: this.accounts2035,
        2036: this.accounts2036,
        2037: this.accounts2037,
        2038: this.accounts2038,
        2039: this.accounts2039,
        2040: this.accounts2040,
        2041: this.accounts2041,
        2042: this.accounts2042,
        2043: this.accounts2043,
        2044: this.accounts2044,
        2045: this.accounts2045,
        2046: this.accounts2046,
        securities: addSecurities
      })
      this.numAccounts++;
    })
    console.log('this.latestYear', this.latestYear);
    return result;
  }

  addSecuritiesData(securities, accountNumber) {
    let result = [];
    let securitiesIndex = 1;
    this.accounts2017 = 0;
    this.accounts2018 = 0;
    this.accounts2019 = 0;
    this.accounts2020 = 0;
    this.accounts2021 = 0;
    this.accounts2022 = 0;
    this.accounts2023 = 0;
    this.accounts2024 = 0;
    this.accounts2025 = 0;
    this.accounts2026 = 0;
    this.accounts2027 = 0;
    this.accounts2028 = 0;
    this.accounts2029 = 0;
    this.accounts2030 = 0;
    this.accounts2031 = 0;
    this.accounts2032 = 0;
    this.accounts2033 = 0;
    this.accounts2034 = 0;
    this.accounts2035 = 0;
    this.accounts2036 = 0;
    this.accounts2037 = 0;
    this.accounts2038 = 0;
    this.accounts2039 = 0;
    this.accounts2040 = 0;
    this.accounts2041 = 0;
    this.accounts2042 = 0;
    this.accounts2043 = 0;
    this.accounts2044 = 0;
    this.accounts2045 = 0;
    this.accounts2046 = 0;

    securities.forEach(s => {
      let marketValue17 = 0;
      let marketValue18 = 0;
      let marketValue19 = 0;
      let marketValue20 = 0;
      let marketValue21 = 0;
      let marketValue22 = 0;
      let marketValue23 = 0;
      let marketValue24 = 0;
      let marketValue25 = 0;
      let marketValue26 = 0;
      let marketValue27 = 0;
      let marketValue28 = 0;
      let marketValue29 = 0;
      let marketValue30 = 0;
      let marketValue31 = 0;
      let marketValue32 = 0;
      let marketValue33 = 0;
      let marketValue34 = 0;
      let marketValue35 = 0;
      let marketValue36 = 0;
      let marketValue37 = 0;
      let marketValue38 = 0;
      let marketValue39 = 0;
      let marketValue40 = 0;
      let marketValue41 = 0;
      let marketValue42 = 0;
      let marketValue43 = 0;
      let marketValue44 = 0;
      let marketValue45 = 0;
      let marketValue46 = 0;
      let rawMaturityDate = s.maturity_date;
      let rawMaturityDate2 = s.maturity_date;
      let monthDay = rawMaturityDate.substring(0,6);
      let year = rawMaturityDate2.substring(6,10);
      if (year.indexOf("19") === 0) {
        let lastTwo = year.substring(1,3);
        year = '20' + lastTwo;
      }
      if (+year > this.latestYear) { this.latestYear = +year }
      let maturityDate = monthDay + year;
      let faceValue = parseFloat(s.face_value.replace(/\$|,/g, ''));
      // for (var i = 2017; i < this.latestYear; i++) {
      //
      // }
      switch (year) {
        case '2017':
          marketValue17 = s.price * faceValue / 100;
          this.accounts2017 += marketValue17;
          break;
        case '2018':
          marketValue18 = s.price * faceValue / 100;
          this.accounts2018 += marketValue18;
          break;
        case '2019':
          marketValue19 = s.price * faceValue / 100;
          this.accounts2019 += marketValue19;
          break;
        case '2020':
          marketValue20 = s.price * faceValue / 100;
          this.accounts2020 += marketValue20;
          break;
        case '2021':
          marketValue21 = s.price * faceValue / 100;
          this.accounts2021 += marketValue21;
          break;
        case '2022':
          marketValue22 = s.price * faceValue / 100;
          this.accounts2022 += marketValue22;
          break;
        case '2023':
          marketValue23 = s.price * faceValue / 100;
          this.accounts2023 += marketValue23;
          break;
        case '2024':
          marketValue24 = s.price * faceValue / 100;
          this.accounts2024 += marketValue24;
          break;
        case '2025':
          marketValue25 = s.price * faceValue / 100;
          this.accounts2025 += marketValue25;
          break;
        case '2026':
          marketValue26 = s.price * faceValue / 100;
          this.accounts2026 += marketValue26;
          break;
        case '2027':
          marketValue27 = s.price * faceValue / 100;
          this.accounts2027 += marketValue27;
          break;
        case '2028':
          marketValue28 = s.price * faceValue / 100;
          this.accounts2028 += marketValue28;
          break;
        case '2029':
          marketValue29 = s.price * faceValue / 100;
          this.accounts2029 += marketValue29;
          break;
        case '2030':
          marketValue30 = s.price * faceValue / 100;
          this.accounts2030 += marketValue30;
          break;
        case '2031':
          marketValue31 = s.price * faceValue / 100;
          this.accounts2031 += marketValue31;
          break;
        case '2032':
          marketValue32 = s.price * faceValue / 100;
          this.accounts2032 += marketValue32;
          break;
        case '2033':
          marketValue33 = s.price * faceValue / 100;
          this.accounts2033 += marketValue33;
          break;
        case '2034':
          marketValue34 = s.price * faceValue / 100;
          this.accounts2034 += marketValue34;
          break;
        case '2035':
          marketValue35 = s.price * faceValue / 100;
          this.accounts2035 += marketValue35;
          break;
        case '2036':
          marketValue36 = s.price * faceValue / 100;
          this.accounts2036 += marketValue36;
          break;
        case '2037':
          marketValue37 = s.price * faceValue / 100;
          this.accounts2037 += marketValue37;
          break;
        case '2038':
          marketValue38 = s.price * faceValue / 100;
          this.accounts2038 += marketValue38;
          break;
        case '2039':
          marketValue39 = s.price * faceValue / 100;
          this.accounts2039 += marketValue39;
          break;
        case '2040':
          marketValue40 = s.price * faceValue / 100;
          this.accounts2040 += marketValue40;
          break;
        case '2041':
          marketValue41 = s.price * faceValue / 100;
          this.accounts2041 += marketValue41;
          break;
        case '2042':
          marketValue42 = s.price * faceValue / 100;
          this.accounts2042 += marketValue42;
          break;
        case '2043':
          marketValue43 = s.price * faceValue / 100;
          this.accounts2043 += marketValue43;
          break;
        case '2044':
          marketValue44 = s.price * faceValue / 100;
          this.accounts2044 += marketValue44;
          break;
        case '2045':
          marketValue45 = s.price * faceValue / 100;
          this.accounts2045 += marketValue45;
          break;
        case '2046':
          marketValue46 = s.price * faceValue / 100;
          this.accounts2046 += marketValue46;
          break;
        default:
          console.log('year not found in switch');
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
        quantity: faceValue,
        balance: '-',
        maturityDate: maturityDate,
        2017: '$ ' + marketValue17.toLocaleString(),
        2018: '$ ' + marketValue18.toLocaleString(),
        2019: '$ ' + marketValue19.toLocaleString(),
        2020: '$ ' + marketValue20.toLocaleString(),
        2021: '$ ' + marketValue21.toLocaleString(),
        2022: '$ ' + marketValue22.toLocaleString(),
        2023: '$ ' + marketValue23.toLocaleString(),
        2024: '$ ' + marketValue24.toLocaleString(),
        2025: '$ ' + marketValue25.toLocaleString(),
        2026: '$ ' + marketValue26.toLocaleString(),
        2027: '$ ' + marketValue27.toLocaleString(),
        2028: '$ ' + marketValue28.toLocaleString(),
        2029: '$ ' + marketValue29.toLocaleString(),
        2030: '$ ' + marketValue30.toLocaleString(),
        2031: '$ ' + marketValue31.toLocaleString(),
        2032: '$ ' + marketValue32.toLocaleString(),
        2033: '$ ' + marketValue33.toLocaleString(),
        2034: '$ ' + marketValue34.toLocaleString(),
        2035: '$ ' + marketValue35.toLocaleString(),
        2036: '$ ' + marketValue36.toLocaleString(),
        2037: '$ ' + marketValue37.toLocaleString(),
        2038: '$ ' + marketValue38.toLocaleString(),
        2039: '$ ' + marketValue39.toLocaleString(),
        2040: '$ ' + marketValue40.toLocaleString(),
        2041: '$ ' + marketValue41.toLocaleString(),
        2042: '$ ' + marketValue42.toLocaleString(),
        2043: '$ ' + marketValue43.toLocaleString(),
        2044: '$ ' + marketValue44.toLocaleString(),
        2045: '$ ' + marketValue45.toLocaleString(),
        2046: '$ ' + marketValue46.toLocaleString(),
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
