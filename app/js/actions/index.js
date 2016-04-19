import * as artifactActionCreators from './Artifacts';
import * as jobsActionCreators from './Jobs';
import * as pluginActionCreators from './Plugins';

const actions = {
    ...artifactActionCreators,
    ...jobsActionCreators,
    ...pluginActionCreators
};

export default actions;
