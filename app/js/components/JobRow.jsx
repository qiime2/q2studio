import React from 'react';
import Timer from './Timer';
const moment = require('moment');

const JobRow = ({ data, onClick }) => (
    <tr>
        <td>
            <a style={{ cursor: 'pointer' }} onClick={onClick}>
                { data.actionName }
            </a>
        </td>
        <td>
            { moment.utc(data.started).format('M-D-Y hh:mm:ss') }
        </td>
        {data.finished ?
            <td>
            { moment.utc(data.finished).format('M-D-Y hh:mm:ss') }
            </td>
            :
            <td>
                <Timer start={ data.started } />
            </td>
    }
    </tr>
);

JobRow.propTypes = {
    data: React.PropTypes.object,
    onClick: React.PropTypes.func
};

export default JobRow;
