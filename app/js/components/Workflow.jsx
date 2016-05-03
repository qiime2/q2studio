import React from 'react';

const Workflow = ({ flow, onClick }) => (
    <button type="button" className="list-group-item" onClick={ onClick }>
        <span className="col-md-7">
            { flow.name }
        </span>
        <span className="col-md-5">
            { flow.info }
        </span>
    </button>
);

Workflow.propTypes = {
    flow: React.PropTypes.object,
    onClick: React.PropTypes.func
};

export default Workflow;
