import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import actions from '../actions';
import Job from '../components/pages/Job';

const mapStateToProps = (state, { params: { pluginId, flowId } }) => {
    const { jobs: { inputArtifacts } } = state;
    const plugin = state.plugins.filter(p => p.name === pluginId)[0];
    const workflow = plugin.workflows.filter(w => w.name === flowId)[0];
    return ({
        plugin,
        workflow,
        inputArtifacts
    });
};

const mapDispatchToProps = (dispatch, { router }) => ({
    onClickSubmit: (job) => dispatch(actions.startJob(job)),
    onClickCancel: () => { router.goBack(); dispatch(actions.clearJobState()); }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Job)
);
