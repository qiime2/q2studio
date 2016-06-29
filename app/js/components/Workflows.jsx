import React from 'react';

import Workflow from './Workflow';

const Workflows = ({ plugin, openWorkflow }) => (
    <div>
        { [ ...plugin.workflows ].sort((a, b) => a.name > b.name).map(workflow => (
            <Workflow
                key={workflow.name}
                flow={workflow}
                disabled={workflow.requires.length !== 0}
                onClick = {() => openWorkflow(plugin, workflow)}
            />
        ))}
    </div>
);


Workflows.propTypes = {
    openWorkflow: React.PropTypes.func,
    plugin: React.PropTypes.object
};

export default Workflows;
