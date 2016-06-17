import React from 'react';

import Artifact from './Artifact';

const Artifacts = ({ artifacts, dispatchDeleteArtifact }) => (
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
                                No Available Artifacts
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
