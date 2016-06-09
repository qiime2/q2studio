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
    onClickSubmit: (job) => dispatch(actions.startJob(job)),
    onClickCancel: () => { router.goBack(); dispatch(actions.clearJobState()); }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Job)
);
