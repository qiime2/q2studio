import { connect } from 'react-redux';

import actions from '../actions';
import JobListFrame from '../components/JobListFrame.jsx';

const mapStateToProps = ({
    jobs: { activeJobs, completedJobs, failedJobs },
    tabState: { jobs: { currentIndex } } }) => ({
        activeJobs,
        completedJobs,
        failedJobs,
        currentIndex
    });

const mapDispatchToProps = (dispatch) => ({
    changeJobTab: (idx) => dispatch(actions.changeTab('jobs', idx))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JobListFrame);
