let GET_HOUSEHOLDS = '';
const PATH_GET_CLIENTS = '/clients?uploadId=75';
process.env.NODE_ENV === 'production'
  ? GET_HOUSEHOLDS = process.env.REACT_APP_API_PROD + PATH_GET_CLIENTS
  : GET_HOUSEHOLDS = process.env.REACT_APP_API_DEV + PATH_GET_CLIENTS;

const initialState = {
  fetching: false,
  fetched: false,
  user: {
    name: "Bob",
    email: "bob@gmail.com",
  },
  households: [],
  error: null
}

export default function reducer(state=initialState, action) {
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
        fetched: true};
        households: action.payload
      break;
    }
    default:
      return state;
  }
  return state;
}


// store.dispatch({
//   type: "FETCH_HOUSEHOLDS",
//   payload: fetch(GET_HOUSEHOLDS, {mode: 'cors', credentials: 'include'}).then(res => res.json())
// })
