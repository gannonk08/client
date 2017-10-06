export default function reducer(state={
  accounts: {},
  fetching: false,
  fetched: false,
  error: null
  }, action) {
    switch (action.type) {
      case 'FETCH_ACCOUNTS_PENDING': {
        return {...state, fetching: true};
        break;
      }
      case 'FETCH_ACCOUNTS_REJECTED': {
        return {...state, fetching: false, error: action.payload}
        break;
      }
      case 'FETCH_ACCOUNTS_FULFILLED': {
        return {...state,
          fetching: false,
          fetched: true};
          accounts: action.payload
        break;
      }
      default:
        return state;
    }
    return state;
  }
