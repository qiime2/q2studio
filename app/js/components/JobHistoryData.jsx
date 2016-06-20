import React from 'react';

const JobHistoryData = ({ name, value }) => (
    <tr>
        <td className="col-sm-3">{name}</td>
        <td className={name === 'stderr' && value.length > 0 ? 'alert alert-danger' : ''}
            style={{ whiteSpace: 'pre' }}
        >
            {value}
        </td>
    </tr>
);

JobHistoryData.propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.string
};

export default JobHistoryData;
