export default function reducer(state={
  households: {},
  fetching: false,
  fetched: false,
  error: null
  }, action) {
  switch (action.type) {
    case 'FETCH_HOUSEHOLDS_PENDING': {
      return {...state, fetching: true};
      break;
    }
    case 'FETCH_HOUSEHOLDS_REJECTED': {
      return {...state, fetching: false, error: action.payload}
      break;
    }
    case 'FETCH_HOUSEHOLDS_FULFILLED': {
      return {...state,
        fetching: false,
        fetched: true,
        households: action.payload
      }
      break;
    }
    default:
      return state;
  }
  return state;
}
