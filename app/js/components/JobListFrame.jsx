import React from 'react';

import JobList from './JobList';
import Tabs from './Tabs';

const JobListFrame = (props) => {
    const { activeJobs, completedJobs, failedJobs, currentIndex, changeJobTab } = props;
    const lookup = [activeJobs, completedJobs, failedJobs];
    const names = ['active', 'finished', 'failed'];
    return (<Tabs
        tabs={['Active Jobs', 'Finished Jobs', 'Failed Jobs']}
        getCount={(idx) => lookup[idx].length}
        contents={lookup.map((listing, idx) => (<JobList
            jobs={listing}
            jobTab={names[idx]}
        />))
        }
        currentIndex={currentIndex}
        changeTab={changeJobTab}
    />);
};

JobListFrame.propTypes = {
    activeJobs: React.PropTypes.array,
    completedJobs: React.PropTypes.array,
    failedJobs: React.PropTypes.array,
    jobTab: React.PropTypes.string,
    changeJobTab: React.PropTypes.func,
    currentIndex: React.PropTypes.number
};

export default JobListFrame;
