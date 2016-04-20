import { connect } from 'react-redux';
import Plugins from '../components/Plugins.jsx';

const mapStateToProps = (state) => {
    return {
        plugins: state.plugins
    };
};

export default connect(
    mapStateToProps
)(Plugins);
