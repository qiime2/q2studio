import React from 'react';
import Workflow from '../components/Workflow';

const Workflows = ({ workflows }) => {
    return (
        <div>
        { workflows.map((workflow, id) =>
            <Workflow
                key={ id }
                flow={workflow}
            />
        )}
        </div>
    );
};

Workflows.propTypes = {
    workflows: React.PropTypes.array
};

export default Workflows;
