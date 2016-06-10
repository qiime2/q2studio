import React from 'react';

const JobRow = ({ data }) => (
    <tr>
        <td>
            { data.workflow }
        </td>
        <td>
            { data.started }
        </td>
    </tr>
);

JobRow.propTypes = {
    data: React.PropTypes.object
};

export default JobRow;
