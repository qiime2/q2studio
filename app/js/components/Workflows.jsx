import React from 'react';

import Workflow from './Workflow';

const Workflows = ({ plugin, listing, openWorkflow }) => (
    <div>
        { [...listing].sort((a, b) => a.name > b.name).map(action => (
            <Workflow
                key={action.name}
                flow={action}
                disabled={action.requires.length !== 0}
                onClick = {() => openWorkflow(plugin, action)}
            />
        ))}
    </div>
);


Workflows.propTypes = {
    openWorkflow: React.PropTypes.func,
    plugin: React.PropTypes.string
};

export default Workflows;
