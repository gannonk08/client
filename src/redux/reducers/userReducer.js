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
    case 'CHANGE_NAME': {
      state = {...state, name: action.payload};
      break;
    }
    case 'CHANGE_EMAIL': {
      state = {...state, email: action.payload};
      break;
    }
    case 'ERROR': {
      console.log("ERROR: ", action.payload);
      break;
    }
    default:
      return state;
  }
  return state;
}
