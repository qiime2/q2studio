import { connect } from 'react-redux';

import actions from '../actions';
import ArtifactGenerator from '../components/ArtifactGenerator';

const mapStateToProps = ({ tabState: { createArtifact: { currentIndex } }, ...state }) => ({
    dirPath: state.artifacts.artifactDirectory,
    active: currentIndex
});

const mapDispatchToProps = (dispatch) => ({
    toggleCreation: (idx) => dispatch(actions.changeTab('createArtifact', (idx + 1) % 2)),
    selectDirectory: () => dispatch(actions.selectArtifactDirectory()),
    createArtifact: (e, dirPath) => {
        e.preventDefault();
        if (dirPath === undefined) {
            alert('Please choose a valid directory to convert to Artifact');
            return false;
        }
        const fd = new FormData(e.target);
        dispatch(actions.createArtifact(dirPath, fd));
        return true;
    }
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtifactGenerator);
