import React from 'react';

import Workflow from './Workflow';

const Workflows = ({ plugin, openWorkflow }) => (
    <div>
        { plugin.workflows.map(workflow => (
            <Workflow
                key={workflow.name}
                flow={workflow}
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
