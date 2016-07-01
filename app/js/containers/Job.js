import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import actions from '../actions';
import Job from '../components/pages/Job';

const mapStateToProps = (state, { params: { pluginId, jobId, actionType } }) => {
    const { currentJob } = state;
    const plugin = state.plugins.find(p => p.name === pluginId);
    const action = plugin[actionType].find(w => w.name === jobId);
    return ({
        plugin,
        action,
        inputs: currentJob
    });
};

const mapDispatchToProps = (dispatch, { router }) => ({
    submitJob: (e, action, actionType) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        for (const [key, value] of formData.entries()) {
            if (value.trim().length === 0) {
                alert(`${key} must not be blank.`);
                return;
            }
        }
        // TODO: change formData
        dispatch(actions.startJob(action, formData));
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
