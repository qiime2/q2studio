import { connect } from 'react-redux';

import ArtifactDetail from '../components/ArtifactDetail';
import actions from '../actions';


const mapStateToProps = (state, { params: { uuid } }) => {
    const artifact = (state.artifacts.artifacts.find(a => a.uuid === uuid) ||
                     state.artifacts.visualizations.find(v => v.uuid === uuid));
    return { artifact };
};

const mapDispatchToProps = (dispatch) => ({
    getVisualization: (vis) => dispatch(actions.getVisualization(vis))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtifactDetail);
