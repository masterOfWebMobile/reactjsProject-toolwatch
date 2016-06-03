import {LOCAL_STORAGE_TOKEN_KEY, ActionTypes} from '../../constants';
const {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT} = ActionTypes;

let cachedUser = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
if (cachedUser) {
	cachedUser = JSON.parse(cachedUser);
}
let initialState = {user: cachedUser, loading: false, error: null};

export default function auth(state = initialState, action) {

	switch(action.type) {
		case LOGIN_REQUESTED:
			return {
				...state,
				loading: true,
				user: null,
				error: null
			};
		case LOGIN_SUCCESS:
			if (action.result.statusCode == 200) {
				localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(action.result.body));	
			}
			return {
				...state,
				loading: false,
				[action.result.statusCode == 200 ? 'user' : 'error']: action.result.body
			};
		case LOGIN_FAILED:
			return {
				...state,
				loading: false,
				error: action.result
			};
		case LOGOUT:
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
			return {
				...state,
				user: null
			};
		default: 
			return state;
	}
	return state;
}
