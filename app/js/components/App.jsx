import React from 'react';
import PluginContainer from '../containers/PluginContainer';
import ArtifactsContainer from '../containers/ArtifactsContainer';

const App = () => (
    <div className="container">
        <div className="page-header">
            <h1>analysis-dir</h1>
        </div>
        <PluginContainer />
        <ArtifactsContainer />
    </div>
);

export default App;
