import { combineReducers } from 'redux';

import households from './householdsReducer';
import user from './userReducer';

export default combineReducers({
  households,
  user
})
