class HouseholdsGridStore {
  constructor(records) {
    let dataRecords = records;
    if (!dataRecords.households.length) {
      this.size = 200;
      this._cache = [];
    } else {
      let householdsData = records.households;
      let accountsData = [];
      let result = [];
      this.size = householdsData.length;
      this.numHouseholds = 0;
      this.numAccounts = 0;
      this.numSecurities = 0;
      let householdName = '';
      let accounts2017 = 0;
      let accounts2018 = 0;
      let accounts2019 = 0;
      let accounts2020 = 0;
      let accounts2021 = 0;
      let accounts2022 = 0;
      let accounts2023 = 0;
      let accounts2024 = 0;
      let accounts2025 = 0;
      let accounts2026 = 0;
      let accounts2027 = 0;
      let accounts2028 = 0;
      let accounts2029 = 0;
      let accounts2030 = 0;
      let accounts2031 = 0;
      let accounts2032 = 0;
      let accounts2033 = 0;
      let accounts2034 = 0;
      let accounts2035 = 0;
      let accounts2036 = 0;
      let accounts2037 = 0;
      let accounts2038 = 0;
      let accounts2039 = 0;
      let accounts2040 = 0;
      let accounts2041 = 0;
      let accounts2042 = 0;
      let accounts2043 = 0;
      let accounts2044 = 0;
      let accounts2045 = 0;
      let accounts2046 = 0;

      this.latestYear = 2017;

      householdsData.forEach(h => {
        let houses2017 = 0;
        let houses2018 = 0;
        let houses2019 = 0;
        let houses2020 = 0;
        let houses2021 = 0;
        let houses2022 = 0;
        let houses2023 = 0;
        let houses2024 = 0;
        let houses2025 = 0;
        let houses2026 = 0;
        let houses2027 = 0;
        let houses2028 = 0;
        let houses2029 = 0;
        let houses2030 = 0;
        let houses2031 = 0;
        let houses2032 = 0;
        let houses2033 = 0;
        let houses2034 = 0;
        let houses2035 = 0;
        let houses2036 = 0;
        let houses2037 = 0;
        let houses2038 = 0;
        let houses2039 = 0;
        let houses2040 = 0;
        let houses2041 = 0;
        let houses2042 = 0;
        let houses2043 = 0;
        let houses2044 = 0;
        let houses2045 = 0;
        let houses2046 = 0;
        householdName = h.household.name;
        if (!h.accounts.length) {
          this.size--;
        } else {
          let addAccounts = this.addAccountsData(h.accounts);
          let getBalance = this.getBalancePercentage();
          accountsData.push(addAccounts);
          result.push({
            houseIndex: this.numHouseholds,
            type: "household",
            name: householdName,
            description: 'sector',
            model: 'model id',
            balance: getBalance + ' %',
            2017: '$ ' + houses2017.toLocaleString(),
            2018: '$ ' + houses2018.toLocaleString(),
            2019: '$ ' + houses2019.toLocaleString(),
            2020: '$ ' + houses2020.toLocaleString(),
            2021: '$ ' + houses2021.toLocaleString(),
            2022: '$ ' + houses2022.toLocaleString(),
            2023: '$ ' + houses2023.toLocaleString(),
            2024: '$ ' + houses2024.toLocaleString(),
            2025: '$ ' + houses2025.toLocaleString(),
            2026: '$ ' + houses2026.toLocaleString(),
            2027: '$ ' + houses2027.toLocaleString(),
            2028: '$ ' + houses2028.toLocaleString(),
            2029: '$ ' + houses2029.toLocaleString(),
            2030: '$ ' + houses2030.toLocaleString(),
            2031: '$ ' + houses2031.toLocaleString(),
            2032: '$ ' + houses2032.toLocaleString(),
            2033: '$ ' + houses2033.toLocaleString(),
            2034: '$ ' + houses2034.toLocaleString(),
            2035: '$ ' + houses2035.toLocaleString(),
            2036: '$ ' + houses2036.toLocaleString(),
            2037: '$ ' + houses2037.toLocaleString(),
            2038: '$ ' + houses2038.toLocaleString(),
            2039: '$ ' + houses2039.toLocaleString(),
            2040: '$ ' + houses2040.toLocaleString(),
            2041: '$ ' + houses2041.toLocaleString(),
            2042: '$ ' + houses2042.toLocaleString(),
            2043: '$ ' + houses2043.toLocaleString(),
            2044: '$ ' + houses2044.toLocaleString(),
            2045: '$ ' + houses2045.toLocaleString(),
            2046: '$ ' + houses2046.toLocaleString(),
            accounts: addAccounts
          })
          this.numHouseholds++;
        }
      })
      this._cache = result;
    }
  }

  getBalancePercentage() {
    let yearArray = [ houses2017, houses2018, houses2019, houses2020, houses2021, houses2022, houses2023, houses2024, houses2025, houses2026, houses2027, houses2028, houses2029, houses2030, houses2031, houses2032, houses2033, houses2034, houses2035, houses2036, houses2037, houses2038, houses2039, houses2040, houses2041, houses2042, houses2043, houses2044, houses2045, houses2046];
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
    houses2017 = 0;
    houses2018 = 0;
    houses2019 = 0;
    houses2020 = 0;
    houses2021 = 0;
    houses2022 = 0;
    houses2023 = 0;
    houses2024 = 0;
    houses2025 = 0;
    houses2026 = 0;
    houses2027 = 0;
    houses2028 = 0;
    houses2029 = 0;
    houses2030 = 0;
    houses2031 = 0;
    houses2032 = 0;
    houses2033 = 0;
    houses2034 = 0;
    houses2035 = 0;
    houses2036 = 0;
    houses2037 = 0;
    houses2038 = 0;
    houses2039 = 0;
    houses2040 = 0;
    houses2041 = 0;
    houses2042 = 0;
    houses2043 = 0;
    houses2044 = 0;
    houses2045 = 0;
    houses2046 = 0;
    accounts.forEach(a => {
      let addSecurities = this.addSecuritiesData(a.securities, a.account_number);
      houses2017 += accounts2017;
      houses2018 += accounts2018;
      houses2019 += accounts2019;
      houses2020 += accounts2020;
      houses2021 += accounts2021;
      houses2022 += accounts2022;
      houses2023 += accounts2023;
      houses2024 += accounts2024;
      houses2025 += accounts2025;
      houses2026 += accounts2026;
      houses2027 += accounts2027;
      houses2028 += accounts2028;
      houses2029 += accounts2029;
      houses2030 += accounts2030;
      houses2031 += accounts2031;
      houses2032 += accounts2032;
      houses2033 += accounts2033;
      houses2034 += accounts2034;
      houses2035 += accounts2035;
      houses2036 += accounts2036;
      houses2037 += accounts2037;
      houses2038 += accounts2038;
      houses2039 += accounts2039;
      houses2040 += accounts2040;
      houses2041 += accounts2041;
      houses2042 += accounts2042;
      houses2043 += accounts2043;
      houses2044 += accounts2044;
      houses2045 += accounts2045;
      houses2046 += accounts2046;
      result.push({
        type: "account",
        name: householdName,
        id: this.numAccounts + 1,
        houseIndex: this.numHouseholds,
        accountNumLabel: 'Acct #',
        accountNumber: a.account_number,
        balance: 0,
        2017: accounts2017,
        2018: accounts2018,
        2019: accounts2019,
        2020: accounts2020,
        2021: accounts2021,
        2022: accounts2022,
        2023: accounts2023,
        2024: accounts2024,
        2025: accounts2025,
        2026: accounts2026,
        2027: accounts2027,
        2028: accounts2028,
        2029: accounts2029,
        2030: accounts2030,
        2031: accounts2031,
        2032: accounts2032,
        2033: accounts2033,
        2034: accounts2034,
        2035: accounts2035,
        2036: accounts2036,
        2037: accounts2037,
        2038: accounts2038,
        2039: accounts2039,
        2040: accounts2040,
        2041: accounts2041,
        2042: accounts2042,
        2043: accounts2043,
        2044: accounts2044,
        2045: accounts2045,
        2046: accounts2046,
        securities: addSecurities
      })
      this.numAccounts++;
    })
    return result;
  }

  addSecuritiesData(securities, accountNumber) {
    let result = [];
    let securitiesIndex = 1;
    accounts2017 = 0;
    accounts2018 = 0;
    accounts2019 = 0;
    accounts2020 = 0;
    accounts2021 = 0;
    accounts2022 = 0;
    accounts2023 = 0;
    accounts2024 = 0;
    accounts2025 = 0;
    accounts2026 = 0;
    accounts2027 = 0;
    accounts2028 = 0;
    accounts2029 = 0;
    accounts2030 = 0;
    accounts2031 = 0;
    accounts2032 = 0;
    accounts2033 = 0;
    accounts2034 = 0;
    accounts2035 = 0;
    accounts2036 = 0;
    accounts2037 = 0;
    accounts2038 = 0;
    accounts2039 = 0;
    accounts2040 = 0;
    accounts2041 = 0;
    accounts2042 = 0;
    accounts2043 = 0;
    accounts2044 = 0;
    accounts2045 = 0;
    accounts2046 = 0;

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
      switch (year) {
        case '2017':
          if (s.price === 0 || faceValue === 0) {
            marketValue17 = '-';
          } else {
            marketValue17 = s.price * faceValue / 100;
            accounts2017 += marketValue17;
          }
          break;
        case '2018':
          if (s.price === 0 || faceValue === 0) {
            marketValue18 = '-';
          } else {
            marketValue18 = s.price * faceValue / 100;
            accounts2018 += marketValue18;
          }
          break;
        case '2019':
          if (s.price === 0 || faceValue === 0) {
            marketValue19 = '-';
          } else {
            marketValue19 = s.price * faceValue / 100;
            accounts2019 += marketValue19;
          }
          break;
        case '2020':
          if (s.price === 0 || faceValue === 0) {
            marketValue20 = '-';
          } else {
            marketValue20 = s.price * faceValue / 100;
            accounts2020 += marketValue20;
          }
          break;
        case '2021':
          if (s.price === 0 || faceValue === 0) {
            marketValue21 = '-';
          } else {
            marketValue21 = s.price * faceValue / 100;
            accounts2021 += marketValue21;
          }
          break;
        case '2022':
          if (s.price === 0 || faceValue === 0) {
            marketValue22 = '-';
          } else {
            marketValue22 = s.price * faceValue / 100;
            accounts2022 += marketValue22;
          }
          break;
        case '2023':
          if (s.price === 0 || faceValue === 0) {
            marketValue23 = '-';
          } else {
            marketValue23 = s.price * faceValue / 100;
            accounts2023 += marketValue23;
          }
          break;
        case '2024':
          if (s.price === 0 || faceValue === 0) {
            marketValue24 = '-';
          } else {
            marketValue24 = s.price * faceValue / 100;
            accounts2024 += marketValue24;
          }
          break;
        case '2025':
          if (s.price === 0 || faceValue === 0) {
            marketValue25 = '-';
          } else {
            marketValue25 = s.price * faceValue / 100;
            accounts2025 += marketValue25;
          }
          break;
        case '2026':
          if (s.price === 0 || faceValue === 0) {
            marketValue26 = '-';
          } else {
            marketValue26 = s.price * faceValue / 100;
            accounts2026 += marketValue26;
          }
          break;
        case '2027':
          if (s.price === 0 || faceValue === 0) {
            marketValue27 = '-';
          } else {
            marketValue27 = s.price * faceValue / 100;
            accounts2027 += marketValue27;
          }
          break;
        case '2028':
          if (s.price === 0 || faceValue === 0) {
            marketValue28 = '-';
          } else {
            marketValue28 = s.price * faceValue / 100;
            accounts2028 += marketValue28;
          }
          break;
        case '2029':
          if (s.price === 0 || faceValue === 0) {
            marketValue29 = '-';
          } else {
            marketValue29 = s.price * faceValue / 100;
            accounts2029 += marketValue29;
          }
          break;
        case '2030':
          if (s.price === 0 || faceValue === 0) {
            marketValue30 = '-';
          } else {
            marketValue30 = s.price * faceValue / 100;
            accounts2030 += marketValue30;
          }
          break;
        case '2031':
          if (s.price === 0 || faceValue === 0) {
            marketValue31 = '-';
          } else {
            marketValue31 = s.price * faceValue / 100;
            accounts2031 += marketValue31;
          }
          break;
        case '2032':
          if (s.price === 0 || faceValue === 0) {
            marketValue32 = '-';
          } else {
            marketValue32 = s.price * faceValue / 100;
            accounts2032 += marketValue32;
          }
          break;
        case '2033':
          if (s.price === 0 || faceValue === 0) {
            marketValue33 = '-';
          } else {
            marketValue33 = s.price * faceValue / 100;
            accounts2033 += marketValue33;
          }
          break;
        case '2034':
          if (s.price === 0 || faceValue === 0) {
            marketValue34 = '-';
          } else {
            marketValue34 = s.price * faceValue / 100;
            accounts2034 += marketValue34;
          }
          break;
        case '2035':
          if (s.price === 0 || faceValue === 0) {
            marketValue35 = '-';
          } else {
            marketValue35 = s.price * faceValue / 100;
            accounts2035 += marketValue35;
          }
          break;
        case '2036':
          if (s.price === 0 || faceValue === 0) {
            marketValue36 = '-';
          } else {
            marketValue36 = s.price * faceValue / 100;
            accounts2036 += marketValue36;
          }
          break;
        case '2037':
          if (s.price === 0 || faceValue === 0) {
            marketValue37 = '-';
          } else {
            marketValue37 = s.price * faceValue / 100;
            accounts2037 += marketValue37;
          }
          break;
        case '2038':
          if (s.price === 0 || faceValue === 0) {
            marketValue38 = '-';
          } else {
            marketValue38 = s.price * faceValue / 100;
            accounts2038 += marketValue38;
          }
          break;
        case '2039':
          if (s.price === 0 || faceValue === 0) {
            marketValue39 = '-';
          } else {
            marketValue39 = s.price * faceValue / 100;
            accounts2039 += marketValue39;
          }
          break;
        case '2040':
          if (s.price === 0 || faceValue === 0) {
            marketValue40 = '-';
          } else {
            marketValue40 = s.price * faceValue / 100;
            accounts2040 += marketValue40;
          }
          break;
        case '2041':
          if (s.price === 0 || faceValue === 0) {
            marketValue41 = '-';
          } else {
            marketValue41 = s.price * faceValue / 100;
            accounts2041 += marketValue41;
          }
          break;
        case '2042':
          if (s.price === 0 || faceValue === 0) {
            marketValue42 = '-';
          } else {
            marketValue42 = s.price * faceValue / 100;
            accounts2042 += marketValue42;
          }
          break;
        case '2043':
          if (s.price === 0 || faceValue === 0) {
            marketValue43 = '-';
          } else {
            marketValue43 = s.price * faceValue / 100;
            accounts2043 += marketValue43;
          }
          break;
        case '2044':
          if (s.price === 0 || faceValue === 0) {
            marketValue44 = '-';
          } else {
            marketValue44 = s.price * faceValue / 100;
            accounts2044 += marketValue44;
          }
          break;
        case '2045':
          if (s.price === 0 || faceValue === 0) {
            marketValue45 = '-';
          } else {
            marketValue45 = s.price * faceValue / 100;
            accounts2045 += marketValue45;
          }
          break;
        case '2046':
          if (s.price === 0 || faceValue === 0) {
            marketValue46 = '-';
          } else {
            marketValue46 = s.price * faceValue / 100;
            accounts2046 += marketValue46;
          }
          break;
        default:
          console.log('year not found in switch');
      }
      result.push({
        type: "security",
        accountNumber: accountNumber,
        name: householdName,
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
