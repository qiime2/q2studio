import React from 'react';
import { ipcRenderer as ipc } from 'electron';

import JobRow from './JobRow';

const JobList = ({ jobs, jobTab }) => (
    <table className="table">
        <thead>
            <tr>
                <th className="col-md-6">Action</th>
                <th className="col-md-3">Started</th>
                <th className="col-md-3">
                    {jobTab !== 'active' ? 'Finished':'Elapsed'}
                </th>
            </tr>
        </thead>
        <tbody>
            {jobs.length ?
                jobs.map(job =>
                    <JobRow
                        data={job}
                        key={job.uuid}
                        onClick={() => ipc.send('open-new-page', {
                            url: `job/${job.uuid}`
                        })}
                    />
                ) : <tr><td>{`No ${jobTab} jobs...`}</td></tr>
            }
        </tbody>
    </table>
);

JobList.propTypes = {
    jobs: React.PropTypes.array,
    jobTab: React.PropTypes.string
};

export default JobList;
