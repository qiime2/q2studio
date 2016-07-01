import { connect } from 'react-redux';

import ArtifactsListFrame from '../components/ArtifactsListFrame';
import actions from '../actions';

const mapStateToProps = ({
    artifacts: { artifacts, visualizations },
    tabState: { artifacts: { currentIndex } }
}) => ({
    artifacts,
    visualizations,
    currentIndex
});

const mapDispatchToProps = (dispatch) => ({
    dispatchDeleteArtifact: (id) => dispatch(actions.deleteArtifact(id)),
    dispatchDeleteVisualization: (id) => dispatch(actions.deleteVisualization(id)),
    refreshArtifacts: () => {
        dispatch(actions.refreshArtifacts());
        dispatch(actions.refreshVisualizations());
    },
    changeArtifactTab: (idx) => dispatch(actions.changeTab('artifacts', idx))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtifactsListFrame);
