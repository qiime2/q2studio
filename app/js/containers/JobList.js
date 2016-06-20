import { connect } from 'react-redux';

import actions from '../actions';
import JobListFrame from '../components/JobListFrame.jsx';

const mapStateToProps = ({
    jobs: { activeJobs, completedJobs, failedJobs },
    joblist: { active } }) => ({
        activeJobs,
        completedJobs,
        failedJobs,
        active
    });

const mapDispatchToProps = (dispatch) => ({
    changeJobTab: (tab) => dispatch(actions.changeJobTab(tab))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JobListFrame);
