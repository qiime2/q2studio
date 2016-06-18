import React from 'react';

const Workflow = ({ flow, onClick, disabled }) => (
    <button type="button" disabled={disabled} className="list-group-item"
        style={{ backgroundColor: disabled ? '#f9f9f9' : '' }} onClick={ onClick }
    >
        <span className={disabled ? 'col-md-3' : 'col-md-7'}>
            { flow.name }
        </span>
        {disabled ?
            <span className="col-md-5">
                {`Requires: ${flow.requires.join(', ')}`}
            </span> : null
        }
        <span className={disabled ? 'col-md-4' : 'col-md-5'}>
            { flow.info }
        </span>
    </button>
);

Workflow.propTypes = {
    flow: React.PropTypes.object,
    onClick: React.PropTypes.func,
    disabled: React.PropTypes.bool
};

export default Workflow;
