import React from 'react';

const Artifact = ({ data, onClick, deleteThis }) => (
    <tr>
        <td>
            <a style={{ cursor: 'pointer' }} onClick={onClick}>
                {data.name}
            </a>
        </td>
        <td>
            {data.uuid}
        </td>
        <td>
            {data.type}
        </td>
        <td>
            <button
                type="button"
                className="btn btn-danger pull-right"
                onClick={deleteThis}
            >
                Delete
            </button>
        </td>
    </tr>
);

Artifact.propTypes = {
    data: React.PropTypes.object,
    onClick: React.PropTypes.func,
    deleteThis: React.PropTypes.func
};

export default Artifact;
