import HouseholdsGridStore from '../../components/HouseholdsGrid/HouseholdsGridStore';

let GET_HOUSEHOLDS = '';
const PATH_GET_CLIENTS = '/clients?uploadId=75';
process.env.NODE_ENV === 'production'
  ? GET_HOUSEHOLDS = process.env.REACT_APP_API_PROD + PATH_GET_CLIENTS
  : GET_HOUSEHOLDS = process.env.REACT_APP_API_DEV + PATH_GET_CLIENTS;

export function fetchHouseholds() {
  return function(dispatch) {
    dispatch({type: "FETCH_HOUSEHOLDS_PENDING"})
    return fetch(GET_HOUSEHOLDS, {mode: 'cors', credentials: 'include'})
      .then(res => res.json())
      .then(res => {
        let households = new HouseholdsGridStore(res.records);
        dispatch({type: "FETCH_HOUSEHOLDS_FULFILLED", payload: households})
        return households;
      })
      .catch(err => {
        dispatch({type: "FETCH_HOUSEHOLDS_REJECTED", payload: err})
        return err;
      })
  }
}
