import keyMirror from 'keyMirror';

export const LOCAL_STORAGE_TOKEN_KEY = 'toolwatch.session.token';

export const ActionTypes = keyMirror({
	LOGIN_REQUESTED: null,
	LOGIN_SUCCESS: null,
	LOGIN_FAILED: null,
	LOGOUT: null,
	SET_CURRENT_TAB: null,
	REMOVE_TAB: null
});

export const API_CONFIG = {
	baseUrl: 'http://localhost:3001'
};