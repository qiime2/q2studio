import * as artifactActionCreators from './artifacts';
import * as jobsActionCreators from './jobs';
import * as pluginActionCreators from './plugins';
import * as connectionActionCreators from './connection';

const actions = {
    ...artifactActionCreators,
    ...jobsActionCreators,
    ...pluginActionCreators,
    ...connectionActionCreators
};

export default actions;
