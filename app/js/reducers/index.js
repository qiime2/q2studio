import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import plugins from './plugins';
import artifacts from './artifacts';
import connection from './connection';
import jobs from './jobs';
import currentDirectory from './currentdirectory';
import joblist from './joblist';

const reducer = combineReducers({
    plugins,
    artifacts,
    connection,
    jobs,
    currentDirectory,
    routing,
    joblist
});

export default reducer;
