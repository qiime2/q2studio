import { connect } from 'react-redux';

import ArtifactsListFrame from '../components/ArtifactsListFrame';
import actions from '../actions';

const mapStateToProps = ({
    artifacts: { artifacts, visualizations },
    tabState: { artifactTab }
}) => ({
    artifacts,
    visualizations,
    artifactTab
});

const mapDispatchToProps = (dispatch) => ({
    dispatchDeleteArtifact: (id, type) => dispatch(actions.deleteArtifact(id, type)),
    refreshArtifacts: () => {
        dispatch(actions.refreshArtifacts());
        dispatch(actions.refreshVisualizations());
    },
    changeArtifactTab: (tab) => dispatch(actions.changeArtifactTab(tab))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtifactsListFrame);
