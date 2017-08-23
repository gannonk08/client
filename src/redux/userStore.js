import {createStore} from 'redux';
import {connect} from 'react-redux';

const RECORD_USER_EMAIL = 'RECORD_USER_EMAIL';

const initialState = {emails: ["bondladderpro@gmail.com"]};

function rootReducer(state=initialState, action) {
	switch (action.type) {
		case RECORD_USER_EMAIL:
			return addUserEmailReducer(state, action);
		default:
			return state;
	}
}

function addUserEmailReducer(state, action) {
	const newState = {emails: JSON.parse(JSON.stringify(state.emails))};
	newState.emails.push(action.email);
	return newState;
}

const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function mapStateToProps(state) {
	return {
		emails: state.emails
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addUserEmail: email => dispatch({type: RECORD_USER_EMAIL, email})
	};
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export {
	connector,
	store,
	rootReducer
};
