import React from 'react';
import PluginsList from '../../containers/PluginsList';
import ArtifactsList from '../../containers/ArtifactsList';

const App = () => (
    <div className="container">
        <div className="page-header">
            <h1>analysis-dir</h1>
        </div>
        <PluginsList />
        <ArtifactsList />
    </div>
);

export default App;
