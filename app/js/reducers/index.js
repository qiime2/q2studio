import { combineReducers } from 'redux';
import plugins from './plugins';
import artifacts from './artifacts';
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
    plugins,
    artifacts,
    routing: routerReducer
});

export default reducer;
