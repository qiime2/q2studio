import React from 'react';
import Plugins from '../containers/Plugins';
import Artifacts from '../containers/Artifacts';

const App = () => (
    <div className="container">
        <div className="page-header">
            <h1>analysis-dir</h1>
        </div>
        <Plugins />
        <Artifacts />
    </div>
);

export default App;
