import React from 'react';
import { ipcRenderer as ipc } from 'electron';


const JobRow = ({ data }) => (
    <tr>
        <td>
            <a style={{ cursor: 'pointer' }} onClick={() => ipc.send('open-job-page', data)}>
                {data.workflow}
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
    data: React.PropTypes.object
};

export default JobRow;
