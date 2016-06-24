import * as artifactActionCreators from './artifacts';
import * as jobsActionCreators from './jobs';
import * as pluginActionCreators from './plugins';
import * as connectionActionCreators from './connection';
import * as currentDirectoryActionCreators from './currentdirectory';
import * as tabActionCreators from './tabstate';

const actions = {
    ...artifactActionCreators,
    ...jobsActionCreators,
    ...pluginActionCreators,
    ...connectionActionCreators,
    ...currentDirectoryActionCreators,
    ...tabActionCreators
};

export default actions;
