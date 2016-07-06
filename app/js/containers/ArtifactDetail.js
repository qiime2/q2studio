import { connect } from 'react-redux';

import ArtifactDetail from '../components/ArtifactDetail';

const mapStateToProps = (state, { params: { uuid } }) => {
    const artifact = (state.artifacts.artifacts.find(a => a.uuid === uuid) ||
                     state.artifacts.visualizations.find(v => v.uuid === uuid));
    return { artifact };
};

export default connect(
    mapStateToProps
)(ArtifactDetail);
