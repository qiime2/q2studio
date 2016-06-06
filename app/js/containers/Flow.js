import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import actions from '../actions';
import Flow from '../components/pages/Flow';

const mapStateToProps = (state, { params: { pluginId, flowId } }) => {
    const plugin = state.plugins.filter(p => p.name === pluginId)[0];
    const workflow = plugin.workflows.filter(w => w.name === flowId)[0];
    return ({
        plugin,
        workflow
    });
};

const mapDispatchToProps = (dispatch, { router }) => ({
    onClickSubmit: (job) => dispatch(actions.startJob(job)),
    onClickCancel: () => router.goBack()
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Flow)
);
