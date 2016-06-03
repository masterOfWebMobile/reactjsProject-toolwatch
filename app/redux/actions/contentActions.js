import {ActionTypes} from '../../constants';

export function setTab(tab) {
  const {SET_CURRENT_TAB} = ActionTypes;
  return {
    type: SET_CURRENT_TAB,
    result: tab
  };
}

export function removeTab(tab) {
  const {REMOVE_TAB} = ActionTypes;
  return {
    type: REMOVE_TAB,
    result: tab
  };
}
