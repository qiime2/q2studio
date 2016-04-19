import React from 'react';
import { connect } from 'react-redux';
import Artifact from '../components/Artifact';
import * as actionCreators from '../actions/Artifacts';
import Error from '../components/Error';

const mapStateToProps = (state) => ({
    artifacts: state.artifacts
});

const mapDispatchToProps = (dispatch) => ({
    dispatchDeleteArtifact: (id) => dispatch(actionCreators.deleteArtifact(id))
});

const Artifacts = ({ artifacts, dispatchDeleteArtifact }) => {

    let data, table;
    if (!artifacts.length) {
        data = (
            <Error>
                <h4>
                    No Available Artifacts
                </h4>
            </Error>
        );
    } else {
        table = (
            artifacts.map(artifact => (
                <Artifact
                    key={artifact.uuid}
                    data={artifact}
                    onClick={() => dispatchDeleteArtifact(artifact.uuid)}
                />
            ))
        )
    }

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
                            { table }
                        </tbody>
                    </table>
                    { data }
                </div>
            </div>
        </div>
    );
};

Artifacts.contextTypes = {
    store: React.PropTypes.object.isRequired
}

Artifacts.propTypes = {
    artifacts: React.PropTypes.array,
    dispatchDeleteArtifact: React.PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Artifacts);
