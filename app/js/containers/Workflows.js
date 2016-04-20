import { connect } from 'react-redux';
import Workflows from '../components/Workflows';

const mapStateToProps = (state) => ({
    plugins: state.plugins
});

export default connect(
    mapStateToProps
)(Workflows);
