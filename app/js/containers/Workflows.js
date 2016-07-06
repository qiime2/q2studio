import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ipcRenderer as ipc } from 'electron';

import actions from '../actions';
import Workflows from '../components/Workflows';

const mapStateToProps = ({ plugins }) => ({
    plugins
});

const mapDispatchToProps = (dispatch, { router, type }) => {
    const openWorkflow = (plugin, action) => {
        dispatch(actions.setJob(action));
        if (type === 'methods') {
            router.push(`job/${plugin}/${type}/${action.id}`);
        } else {
            ipc.send('open-new-page', {
                url: `job/${plugin}/${type}/${action.id}`,
                settings: {
                    width: 1024,
                    height: 800
                }
            });
        }
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
