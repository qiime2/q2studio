import { connect } from 'react-redux';

import Job from '../components/pages/Job';

const mapStateToProps = (state, { params: { pluginId, flowId } }) => {
    const plugin = state.plugins.filter(p => p.name === pluginId)[0];
    const workflow = plugin.workflows.filter(w => w.name === flowId)[0];
    return ({
        plugin,
        workflow
    });
};

const mapDispatchToProps = (dispatch) => ({
    onClickSubmit: () => dispatch({ type: 'SUBMIT' }),
    onClickCancel: () => dispatch({ type: 'CANCEL' })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Job);
