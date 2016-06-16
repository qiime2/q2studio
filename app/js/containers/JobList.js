import { connect } from 'react-redux';

import actions from '../actions';
import JobList from '../components/JobList.jsx';

const mapStateToProps = ({ jobs: { activeJobs, failedJobs } }) => ({
    activeJobs,
    failedJobs
});

const mapDispatchToProps = (dispatch) => ({
    closeFailed: (id) => dispatch(actions.dismissFailed(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JobList);
