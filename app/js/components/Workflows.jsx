import React from 'react';
import Workflow from './Workflow';

const Workflows = ({ plugin }, { router }) => (
    <div>
        { plugin.workflows.map(workflow => (
            <Workflow
                key={workflow.name}
                flow={workflow}
                onClick = {() => router.push(`job/${plugin.name}/${workflow.name}`)}
            />
        ))}
    </div>
);


Workflows.propTypes = {
    plugin: React.PropTypes.object
};

Workflows.contextTypes = {
    router: React.PropTypes.object
};

export default Workflows;
