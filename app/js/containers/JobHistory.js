import { connect } from 'react-redux';

import JobHistory from '../components/JobHistory';

const mapStateToProps = ({ jobs }, { params: { uuid } }) => {
    const job = (jobs.activeJobs.find(j => j.uuid === uuid) ||
                 jobs.completedJobs.find(j => j.uuid === uuid) ||
                 jobs.failedJobs.find(j => j.uuid === uuid));
    return { job };
};


export default connect(
    mapStateToProps
)(JobHistory);
