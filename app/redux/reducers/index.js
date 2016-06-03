import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import sidemenu from './sidemenu';
import content from './content';

export default combineReducers({
    routing: routerReducer,
    auth,
    sidemenu,
    content
});
