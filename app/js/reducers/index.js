import { combineReducers } from 'redux';
import plugins from './plugins';
import artifacts from './artifacts';
import { routerReducer } from 'react-router-redux';
import connection from './connection';

const reducer = combineReducers({
    plugins,
    artifacts,
    routing: routerReducer
    connection
});

export default reducer;
