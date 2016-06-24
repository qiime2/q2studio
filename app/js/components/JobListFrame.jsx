import React from 'react';

import JobList from './JobList';

const JobListFrame = (props) => {
    const { jobTab, changeJobTab, activeJobs, completedJobs, failedJobs } = props;
    const tabMap = {
        active: activeJobs,
        completed: completedJobs,
        failed: failedJobs
    };
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <ul className="nav nav-pills">
                    <li role="presentation" className={jobTab === 'active' ? 'active' : null}>
                        <a onClick={() => changeJobTab('active')}>
                            Active Jobs {activeJobs.length > 0 ?
                                <span className="badge">{activeJobs.length}</span> : null}
                        </a>
                    </li>
                    <li role="presentation" className={jobTab === 'completed' ? 'active' : null}>
                        <a onClick={() => changeJobTab('completed')}>
                            Completed Jobs {completedJobs.length > 0 ?
                                <span className="badge">{completedJobs.length}</span> : null}
                        </a>
                    </li>
                    <li role="presentation" className={jobTab === 'failed' ? 'active' : null}>
                        <a onClick={() => changeJobTab('failed')}>
                            Failed Jobs {failedJobs.length > 0 ?
                                <span className="badge">{failedJobs.length}</span> : null}
                        </a>
                    </li>
                </ul>
            </div>
            <div className="panel-body">
                <JobList jobs={tabMap[jobTab]} {...props} />
            </div>
        </div>
    );
};

JobListFrame.propTypes = {
    activeJobs: React.PropTypes.array,
    completedJobs: React.PropTypes.array,
    failedJobs: React.PropTypes.array,
    jobTab: React.PropTypes.string,
    changeJobTab: React.PropTypes.func
};

export default JobListFrame;
