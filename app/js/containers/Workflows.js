import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Workflows from '../components/Workflows';

const mapStateToProps = (state) => ({
    plugins: state.plugins
});

export default withRouter(
    connect(
        mapStateToProps
    )(Workflows)
);
