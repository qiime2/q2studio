import React from 'react';

import JobRow from './JobRow';

const JobList = ({ activeJobs, failedJobs, closeFailed }) => (
    activeJobs.length !== 0 || failedJobs.length !== 0 ?
        <div className="panel panel-default">
            <div className="panel-heading">
                Active Jobs:
            </div>
            <div className="panel-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Workflow</th>
                            <th>Launched</th>
                        </tr>
                    </thead>
                    <tbody>
                    { activeJobs.map(job =>
                        <JobRow data={job} key={job.id} />
                    )}
                    </tbody>
                </table>
                { failedJobs.map(job =>
                    <JobRow
                        data={job}
                        key={job.id}
                        failed={job.error}
                        closeFailed={() => closeFailed(job.id)}
                    />
                )}
            </div>
        </div> : null
);

JobList.propTypes = {
    activeJobs: React.PropTypes.array,
    failedJobs: React.PropTypes.array,
    closeFailed: React.PropTypes.func
};

export default JobList;
