import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import actions from '../actions';
import Job from '../components/pages/Job';

const mapStateToProps = (state, { params: { pluginId, jobId } }) => {
    const { jobs: { inputArtifacts } } = state;
    const plugin = state.plugins.find(p => p.name === pluginId);
    const workflow = plugin.workflows.find(w => w.name === jobId);
    return ({
        plugin,
        workflow,
        inputArtifacts
    });
};

const mapDispatchToProps = (dispatch, { router }) => ({
    submitJob: (workflow, formData) => {
        dispatch(actions.startJob(workflow, formData));
        router.push('/');
    },
    cancelJob: () => { router.goBack(); dispatch(actions.clearJobState()); }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Job)
);
