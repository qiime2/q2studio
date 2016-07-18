// ----------------------------------------------------------------------------
// Copyright (c) 2016--, QIIME development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

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
            Produces: { flow.outputs.map(({ type }) => type).join(', ') }
        </span>
    </button>
);

Workflow.propTypes = {
    flow: React.PropTypes.object,
    onClick: React.PropTypes.func,
    disabled: React.PropTypes.bool
};

export default Workflow;
