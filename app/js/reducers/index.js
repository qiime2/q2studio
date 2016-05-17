import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import plugins from './plugins';
import artifacts from './artifacts';
import connection from './connection';

const reducer = combineReducers({
    plugins,
    artifacts,
    connection,
    routing: routerReducer
});

export default reducer;
