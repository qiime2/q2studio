import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import actions from '../actions';
import Workflows from '../components/Workflows';

const mapStateToProps = (state) => ({
    plugins: state.plugins
});

const mapDispatchToProps = (dispatch, { router }) => {
    const openWorkflow = (plugin, workflow) => {
        dispatch(actions.fetchInputArtifacts(workflow));
        router.push(`job/${plugin.name}/${workflow.name}`);
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
