import { connect } from 'react-redux';

import Loading from '../components/Loading';

const mapStateToProps = (state) => ({
    status: state.connection.message
});

export default connect(
    mapStateToProps
)(Loading);
