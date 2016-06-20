import React from 'react';

import JobList from './JobList';

const JobListFrame = (props) => {
    const { active, changeJobTab, activeJobs, completedJobs, failedJobs } = props;
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <ul className="nav nav-pills">
                    <li role="presentation" className={active === 'active' ? 'active' : null}>
                        <a onClick={() => (
                            active === 'active' ? null :
                            changeJobTab('active'))}
                        >
                            Active Jobs {activeJobs.length > 0 ?
                                <span className="badge">{activeJobs.length}</span> : null}
                        </a>
                    </li>
                    <li role="presentation" className={active === 'completed' ? 'active' : null}>
                        <a onClick={() => (
                            active === 'completed' ? null :
                            changeJobTab('completed'))}
                        >
                            Completed Jobs {completedJobs.length > 0 ?
                                <span className="badge">{completedJobs.length}</span> : null}
                        </a>
                    </li>
                    <li role="presentation" className={active === 'failed' ? 'active' : null}>
                        <a onClick={() => (
                            active === 'failed' ? null :
                            changeJobTab('failed'))}
                        >
                            Failed Jobs {failedJobs.length > 0 ?
                                <span className="badge">{failedJobs.length}</span> : null}
                        </a>
                    </li>
                </ul>
            </div>
            <div className="panel-body">
                <JobList
                    {...props}
                />
            </div>
        </div>
    );
};

JobListFrame.propTypes = {
    activeJobs: React.PropTypes.array,
    completedJobs: React.PropTypes.array,
    failedJobs: React.PropTypes.array,
    closeFailed: React.PropTypes.func,
    active: React.PropTypes.string,
    changeJobTab: React.PropTypes.func
};

export default JobListFrame;
