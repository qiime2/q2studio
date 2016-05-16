import React from 'react';

import ArtifactsList from '../../containers/ArtifactsList';
import PluginsList from '../../containers/PluginsList';
import Loading from '../Loading';

const App = ({ connected }) => (
    <div>
        <Loading loaded={connected} />
        <div className="container">
            <div className="page-header">
                <h1>analysis-dir</h1>
            </div>
            <PluginsList />
            <ArtifactsList />
        </div>
    </div>
);

App.propTypes = {
    connected: React.PropTypes.bool.isRequired
};

export default App;
