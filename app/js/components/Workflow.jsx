import React from 'react';

const Workflow = ({ flow, onClick }) => (
    <button type="button" disabled={flow.disabled} className="list-group-item"
        style={{ backgroundColor: flow.disabled ? '#f9f9f9' : '' }} onClick={ onClick }
    >
        <span className={flow.disabled ? 'col-md-3' : 'col-md-7'}>
            { flow.name }
        </span>
        { flow.disabled ?
            <span className="col-md-5">
                {`Requires: ${flow.requires}`}
            </span> : null
        }
        <span className={flow.disabled ? 'col-md-4' : 'col-md-5'}>
            { flow.info }
        </span>
    </button>
);

Workflow.propTypes = {
    flow: React.PropTypes.object,
    onClick: React.PropTypes.func
};

export default Workflow;
