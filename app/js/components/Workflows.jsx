import React from 'react';
import Workflow from './Workflow';

const Workflows = ({ workflows }) => (
    <div>
        { workflows.map(workflow => (
            <Workflow
                key={workflow.name}
                flow={workflow}
            />
        ))}
    </div>
);


Workflows.propTypes = {
    workflows: React.PropTypes.array
};

export default Workflows;
