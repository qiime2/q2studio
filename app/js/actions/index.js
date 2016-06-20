import * as artifactActionCreators from './artifacts';
import * as jobsActionCreators from './jobs';
import * as pluginActionCreators from './plugins';
import * as connectionActionCreators from './connection';
import * as jobActionCreators from './jobs';
import * as currentDirectoryActionCreators from './currentdirectory';
import * as jobListActionCreators from './joblist';

const actions = {
    ...artifactActionCreators,
    ...jobsActionCreators,
    ...pluginActionCreators,
    ...connectionActionCreators,
    ...jobActionCreators,
    ...currentDirectoryActionCreators,
    ...jobListActionCreators
};

export default actions;
