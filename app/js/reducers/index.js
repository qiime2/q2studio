import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import plugins from './plugins';
import artifacts from './artifacts';
import connection from './connection';
import jobs from './jobs';

const reducer = combineReducers({
    plugins,
    artifacts,
    connection,
    jobs,
    routing: routerReducer
});

export default reducer;
