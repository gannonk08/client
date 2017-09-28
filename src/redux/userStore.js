import {createStore} from 'redux';
import {connect} from 'react-redux';

const RECORD_ACCOUNTS = 'RECORD_ACCOUNTS';

const initialState = {accounts: []};

function rootReducer(state=initialState, action) {
	switch (action.type) {
		case RECORD_ACCOUNTS:
			return addAccountsReducer(state, action);
		default:
			return state;
	}
}

function addAccountsReducer(state, action) {
	const newState = {accounts: JSON.parse(JSON.stringify(state.accounts))};
	newState.accounts.unshift(action.account);
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
		addAccounts: account => dispatch({type: RECORD_ACCOUNTS, account})
	};
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export {
	connector,
	store,
	rootReducer
};
