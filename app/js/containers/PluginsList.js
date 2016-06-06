import { connect } from 'react-redux';

import Plugins from '../components/Plugins.jsx';

const mapStateToProps = (state) => {
    return {
        plugins: state.plugins.filter(plugin => plugin.workflows.length !== 0)
    };
};

export default connect(
    mapStateToProps
)(Plugins);
