import { connect } from 'react-redux';

import ArtifactsListFrame from '../components/ArtifactsListFrame';
import actions from '../actions';

const mapStateToProps = ({ artifacts, tabstate: { artifactTab } }) => ({
    artifacts,
    artifactTab
});

const mapDispatchToProps = (dispatch) => ({
    dispatchDeleteArtifact: (id) => dispatch(actions.deleteArtifact(id)),
    refreshArtifacts: () => dispatch(actions.refreshArtifacts()),
    changeArtifactTab: (tab) => dispatch(actions.changeArtifactTab(tab))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtifactsListFrame);
