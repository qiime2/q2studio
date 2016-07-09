import { connect } from 'react-redux';

import actions from '../actions';
import ArtifactGenerator from '../components/ArtifactGenerator';

const mapStateToProps = ({ tabState: { createArtifact: { currentIndex } }, ...state }) => ({
    filePath: state.artifacts.artifactDirectory,
    active: currentIndex
});

const mapDispatchToProps = (dispatch) => ({
    toggleCreation: (idx) => dispatch(actions.changeTab('createArtifact', (idx + 1) % 2)),
    selectDirectory: () => dispatch(actions.selectArtifactDirectory())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtifactGenerator);
