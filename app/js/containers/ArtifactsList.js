import { connect } from 'react-redux';

import Artifacts from '../components/Artifacts';
import actions from '../actions';

const mapStateToProps = ({ artifacts: { artifacts } }) => ({
    artifacts
});

const mapDispatchToProps = (dispatch) => ({
    dispatchDeleteArtifact: (id) => dispatch(actions.deleteArtifact(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Artifacts);
