import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import plugins from './plugins';
import artifacts from './artifacts';
import connection from './connection';
import jobs from './jobs';
import currentDirectory from './currentdirectory';
import tabState from './tabstate';
import currentJob from './currentjob';
import superTypes from './supertypes';
import windowState from './windowState';


const reducer = combineReducers({
    plugins,
    artifacts,
    connection,
    jobs,
    currentDirectory,
    routing,
    tabState,
    currentJob,
    superTypes,
    windowState
});

export default reducer;
