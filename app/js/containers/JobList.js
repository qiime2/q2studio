import { connect } from 'react-redux';

import JobList from '../components/JobList.jsx';

const mapStateToProps = ({ jobs: { activeJobs } }) => ({
    activeJobs
});

export default connect(
    mapStateToProps
)(JobList);
