import HouseholdsGridStore from '../../components/HouseholdsGrid/HouseholdsGridStore';
import AccountsGridStore from '../../components/HouseholdsGrid/AccountsGridStore';

// import * as households from './householdsActions';
// import { fetchHouseholds } from './householdsActions';

let GET_ACCOUNTS = '';
const PATH_GET_CLIENTS = '/clients?uploadId=75';
process.env.NODE_ENV === 'production'
  ? GET_ACCOUNTS = process.env.REACT_APP_API_PROD + PATH_GET_CLIENTS
  : GET_ACCOUNTS = process.env.REACT_APP_API_DEV + PATH_GET_CLIENTS;

export function fetchAccounts() {
  return function(dispatch) {
    dispatch({type: "FETCH_ACCOUNTS_PENDING"})
    return fetch(GET_ACCOUNTS, {mode: 'cors', credentials: 'include'})
      .then(res => res.json())
      .then(res => {
        let households = new HouseholdsGridStore(res.records);
        return getAccountsStore(households.accountsData)
      })
      .then(accounts => {
        dispatch({type: "FETCH_ACCOUNTS_FULFILLED", payload: accounts})
        return accounts;
      })
      .catch(err => {
        dispatch({type: "FETCH_ACCOUNTS_REJECTED", payload: err})
        return err;
      })
  }
}

function getAccountsStore(houses) {
  let accounts = [];
  houses.map(h => {
    return h.map(a => {
      return accounts.push(a);
    })
  });
  let accountsStore = new AccountsGridStore(accounts);
  return accountsStore;
}
