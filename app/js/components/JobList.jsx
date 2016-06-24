import React from 'react';

import JobRow from './JobRow';

const JobList = ({ activeJobs, completedJobs, failedJobs, jobTab }) => {
    let view;
    switch (jobTab) {
    case 'active': {
        view = activeJobs && activeJobs.length !== 0 ?
            activeJobs.map(job => (
                <JobRow data={job} key={job.uuid} />)
            ) :
            <tr><td>No Active Jobs...</td></tr>;
        break;
    }
    case 'completed': {
        view = completedJobs && completedJobs.length !== 0 ?
            completedJobs.map(job => (
                <JobRow data={job} key={job.uuid} />)
            ) :
            <tr><td>No Completed Jobs...</td></tr>;
        break;
    }
    case 'failed': {
        view = failedJobs && failedJobs.length !== 0 ?
            failedJobs.map(job => (
                <JobRow data={job} key={job.uuid} />)
            ) :
            <tr><td>No Failed Jobs...</td></tr>;
        break;
    }
    default:
        view = '';
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="col-md-6">Workflow</th>
                    <th className="col-md-3">Started</th>
                    {jobTab !== 'active' ?
                        <th className="col-md-3">
                            Finished
                        </th> : null
                    }
                </tr>
            </thead>
            <tbody>
                {view}
            </tbody>
        </table>
    );
};

JobList.propTypes = {
    activeJobs: React.PropTypes.array,
    completedJobs: React.PropTypes.array,
    failedJobs: React.PropTypes.array,
    active: React.PropTypes.string
};

export default JobList;
