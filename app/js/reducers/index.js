import { combineReducers } from 'redux';
import plugins from './plugins';
import artifacts from './artifacts';

const reducer = combineReducers({
    plugins,
    artifacts
});

export default reducer;
