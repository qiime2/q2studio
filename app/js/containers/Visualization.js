import { connect } from 'react-redux';
import { remote } from 'electron';

import Visualization from '../components/Visualization';

const mapStateToProps = ({ windowState }, { params: { uuid } }) => {
    const vis = (windowState[`window ${remote.getCurrentWindow().id}`] || { uuid: undefined });
    return ({
        vis: vis[uuid]
    });
};

export default connect(
    mapStateToProps
)(Visualization);
