import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import actions from '../actions';
import Workflows from '../components/Workflows';

const mapStateToProps = (state) => ({
    plugins: state.plugins
});

const mapDispatchToProps = (dispatch, { router, type }) => {
    const openWorkflow = (plugin, action) => {
        dispatch(actions.setJob(action));
        router.push(`job/${plugin}/${type}/${action.id}`);
    };
    return ({
        openWorkflow
    });
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Workflows)
);
