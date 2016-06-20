import React from 'react';

const JobRow = ({ data, failed, closeFailed }) => (
    !failed ?
        <tr>
            <td>
                { data.workflow }
            </td>
            <td>
                {data.started}
            </td>
            { data.timestamp ?
                <td>
                {data.timestamp}
                </td> : null
            }
        </tr> :
        <div
            className="alert alert-danger"
            role="alert"
            style={{ whiteSpace: 'pre' }}
        >
            <strong>{`Error! - ${data.workflow} (${data.started}):`}</strong>
            <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={closeFailed}
            >
                <span aria-hidden="true">&times;</span>
            </button><br />
            {data.message}
        </div>
);

JobRow.propTypes = {
    data: React.PropTypes.object,
    failed: React.PropTypes.bool,
    closeFailed: React.PropTypes.func
};

export default JobRow;
