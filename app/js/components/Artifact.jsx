import React from 'react';

const Artifact = ({ data, onClick }) => (
    <tr>
        <td>
            { data.name }
        </td>
        <td>
            { data.uuid }
        </td>
        <td>
            { data.type }
        </td>
        <td>
            <button
                type="button"
                className="btn btn-danger pull-right"
                onClick={onClick}
            >
                Delete
            </button>
        </td>
    </tr>
);

Artifact.propTypes = {
    data: React.PropTypes.object,
    onClick: React.PropTypes.func
};

export default Artifact;
