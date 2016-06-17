import { connect } from 'react-redux';

import Directory from '../components/Directory';
import actions from '../actions';

const mapStateToProps = (state) => ({
    path: state.currentDirectory
});

const mapDispatchToProps = (dispatch) => ({
    dispatchChangeDirectory: (path) => dispatch(actions.directoryChangeDialog(path))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Directory);
