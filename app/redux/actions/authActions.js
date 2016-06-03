import {ActionTypes, API_CONFIG} from '../../constants';
import _ from 'lodash';

export function loginWithUsernamePassword(username, password) {
  const {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILED} = ActionTypes;
	return {
    types: [LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILED],
    promise: new Promise((resolve, reject) => { setTimeout(() => resolve({statusCode: 200, body: {username: username, token: 'toolwatch-token-12345'}}), 500); })
	};
}

export function logout() {
  const {LOGOUT} = ActionTypes;
  return {
    type: LOGOUT,
    result: {}
  };
}
