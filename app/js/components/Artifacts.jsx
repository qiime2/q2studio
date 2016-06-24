import React from 'react';

import Artifact from './Artifact';

const Artifacts = ({ artifacts, dispatchDeleteArtifact, refreshArtifacts }) => (
    <div>
        <div className="panel panel-default">
            <div className="panel-heading">
                Artifacts:
                <button
                    type="button"
                    className="close pull-right"
                    aria-label="Refresh"
                    onClick={refreshArtifacts}
                >
                    <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                </button>
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
                        { artifacts.length ?
                            artifacts.map(artifact => (
                                <Artifact
                                    key={artifact.uuid}
                                    data={artifact}
                                    onClick={() => {
                                        if (confirm(
                                            'Are you sure you want to delete this Artifact?')) {
                                            dispatchDeleteArtifact(artifact.uuid);
                                        }
                                    }}
                                />
                            )) :
                            <tr>
                                <td>
                                    No Available Artifacts
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

Artifacts.propTypes = {
    artifacts: React.PropTypes.array,
    dispatchDeleteArtifact: React.PropTypes.func,
    refreshArtifacts: React.PropTypes.func
};

export default Artifacts;
