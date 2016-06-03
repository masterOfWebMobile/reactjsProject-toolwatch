import _ from 'lodash';

import {LOCAL_STORAGE_TOKEN_KEY, ActionTypes} from '../../constants';
const { SET_CURRENT_TAB, REMOVE_TAB } = ActionTypes;

let initialState = {openTabs: [], currentTab: ''};

export default function content(state = initialState, action) {
	const {type, result} = action;
	switch(type) {
		case SET_CURRENT_TAB:
			let curIndex = _.findIndex(state.openTabs, (t) => t.tabType == result.tabType);
			curIndex = !~curIndex ? state.openTabs.length : curIndex;
			return {
				...state,
				openTabs: [...state.openTabs.slice(0, curIndex), result, ...state.openTabs.slice(curIndex + 1)],
				currentTab: result
			};
		case REMOVE_TAB:
			const newTabs = _.without(state.openTabs, result);
			return {
				...state,
				openTabs: newTabs,
				currentTab: _.last(newTabs)
			};
		default: 
			return state;
	}
	return state;
}
