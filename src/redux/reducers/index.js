import { combineReducers } from 'redux';

import households from './householdsReducer';
import accounts from './accountsReducer';

export default combineReducers({
  households,
  accounts
})
