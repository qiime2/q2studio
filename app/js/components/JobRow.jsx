import React from 'react';


const JobRow = ({ data, onClick }) => (
    <tr>
        <td>
            <a style={{ cursor: 'pointer' }} onClick={onClick}>
                {data.actionName}
            </a>
        </td>
        <td>
            {data.started}
        </td>
        {data.finished ?
            <td>
            {data.finished}
            </td> : null
        }
    </tr>
);

JobRow.propTypes = {
    data: React.PropTypes.object,
    onClick: React.PropTypes.func
};

export default JobRow;
