import {createStore} from 'redux';
import {connect} from 'react-redux';

const RESET_ACCOUNTS = 'RESET_ACCOUNTS';
const ADD_ONE_ACCOUNT = 'ADD_ONE_ACCOUNT';

const initialState = {accounts: []};

function rootReducer(state=initialState, action) {
	switch (action.type) {
		case RESET_ACCOUNTS:
			return resetAccountsReducer(state, action);
		case ADD_ONE_ACCOUNT:
			return addOneAccountReducer(state, action);
		default:
			return state;
	}
}

function resetAccountsReducer(state, action) {
	return {accounts: action.accounts};
}

function addOneAccountReducer(state, action) {
	const newState = {accounts: JSON.parse(JSON.stringify(state.accounts))};
	newState.accounts.push(action.account);
	return newState;
}

const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function mapStateToProps(state) {
	return {
		accounts: state.accounts
	};
}

function mapDispatchToProps(dispatch) {
	return {
		resetAccounts: accounts => dispatch({type: RESET_ACCOUNTS, accounts}),
		addOneAccount: account => dispatch({type: ADD_ONE_ACCOUNT, account})
	};
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export {
	connector,
	store,
	rootReducer
};
