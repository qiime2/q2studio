import React from 'react';
import { connect } from 'react-redux';
import Artifact from '../components/Artifact';
import { deleteArtifact } from '../actions';

const mapStateToProps = (state) => ({
    artifacts: state.artifacts
});

const mapDispatchToProps = (dispatch) => ({
    onArtifactClick: (id) => dispatch(deleteArtifact(id))
});

const ArtifactsContainer = ({ artifacts, onArtifactClick }) => {
    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    Artifacts:
                </div>
                <div className="panel-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>UUID</th>
                                <th>Type</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { Object.keys(artifacts).map(id =>
                                <Artifact
                                    key={id}
                                    data={artifacts[id]}
                                    onClick={() => onArtifactClick(id)}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

ArtifactsContainer.propTypes = {
    artifacts: React.PropTypes.object,
    onArtifactClick: React.PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtifactsContainer);
