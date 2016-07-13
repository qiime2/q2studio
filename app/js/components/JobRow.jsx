import React from 'react';
import Timer from './Timer';
import moment from 'moment';

const JobRow = ({ data, onClick }) => (
    <tr>
        <td>
            <a style={{ cursor: 'pointer' }} onClick={onClick}>
                { data.actionName }
            </a>
        </td>
        <td>
            { moment(data.started).format('YY-MM-DD hh:mm:ss') }
        </td>
        {data.finished ?
            <td>
            { moment(data.finished).format('YY-MM-DD hh:mm:ss') }
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
