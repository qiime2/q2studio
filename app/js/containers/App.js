import { connect } from 'react-redux';

import App from '../components/pages/App';

const mapStateToProps = (state) => ({
    connected: state.connection.connected
});

export default connect(
    mapStateToProps
)(App);
