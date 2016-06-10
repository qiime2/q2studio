import React from 'react';

import JobRow from './JobRow';

const JobList = ({ activeJobs }) => (
    activeJobs.length !== 0 ?
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
            </div>
        </div> : null
);

JobList.propTypes = {
    activeJobs: React.PropTypes.array
};

export default JobList;
