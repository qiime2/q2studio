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
        <span className={disabled ? 'col-md-3 col-xs-4' : 'col-md-7 col-sm-6 col-xs-6'}>
            { flow.name }
        </span>
        {disabled ?
            <span className="col-md-5 col-sm-3 col-xs-3">
                <span className="visible-md-block">
                  {`Requires: ${flow.requires.join(', ')}`}
                </span>
                <span
                    className="glyphicon glyphicon-warning-sign pull-right
                               visible-sm-block visible-xs-block"
                    title={`Requires: ${flow.requires.join(', ')}`}
                    aria-hidden="true"
                ></span>
            </span> : null
        }
        <span className={disabled ? 'col-md-4 col-xs-5' : 'col-md-5 col-sm-6 col-xs-6'}>
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
