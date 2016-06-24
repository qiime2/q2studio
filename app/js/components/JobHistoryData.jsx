import React from 'react';

import style from './JobHistory.css';

const JobHistoryData = ({ name, value }) => (
    name !== undefined && value !== undefined ?
        <tr className={name === 'stderr' && value.length > 0 ? 'danger' : ''}>
            <td className="col-sm-3">{name}</td>
            <td className={style.td} style={{ whiteSpace: 'pre' }}>
                {`${value}`}
            </td>
        </tr> :
    null
);

JobHistoryData.propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.any
};

export default JobHistoryData;
