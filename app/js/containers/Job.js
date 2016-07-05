import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import actions from '../actions';
import Job from '../components/pages/Job';

const mapStateToProps = (state, { params: { pluginId, jobId, actionType } }) => {
    const { currentJob } = state;
    const plugin = state.plugins.find(p => p.name === pluginId);
    const action = plugin[actionType].find(w => w.id === jobId);
    return ({
        plugin,
        action,
        inputs: currentJob
    });
};

const mapDispatchToProps = (dispatch, { router, params: { pluginId, jobId, actionType } }) => ({
    submitJob: (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const job = {
            inputs: {},
            parameters: {},
            outputs: {},
            action: jobId,
            plugin: pluginId,
            actionType
        };
        for (const [key, value] of formData.entries()) {
            if (value.trim().length === 0) {
                alert(`${key} must not be blank.`);
                return;
            }
            const [type, name] = key.split('-');
            switch (type) {
            case 'in':
                job.inputs[name] = value;
                break;
            case 'param':
                job.parameters[name] = value;
                break;
            case 'out':
                job.outputs[name] = value;
                break;
            default:
                continue;
            }
        }
        dispatch(actions.startJob(job));
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
