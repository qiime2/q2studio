import React from 'react';

import ArtifactsList from '../../containers/ArtifactsList';
import PluginsList from '../../containers/PluginsList';
import Directory from '../../containers/Directory';
import JobList from '../../containers/JobList';

const App = () => (
    <div>
        <div className="container">
            <div className="page-header">
                <Directory />
            </div>
            <PluginsList />
            <br />
            <JobList />
            <ArtifactsList />
        </div>
    </div>
);

export default App;
