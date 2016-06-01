import React from 'react';

import Artifact from './Artifact';
import Error from './Error';

const Artifacts = ({ artifacts, dispatchDeleteArtifact }) => {
    let data;
    let table;
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
                    onClick={() => {
                        if (confirm('Are you sure you want to delete this Artifact?')) {
                            dispatchDeleteArtifact(artifact.uuid);
                        }
                    }}
                />
            ))
        );
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

Artifacts.propTypes = {
    artifacts: React.PropTypes.array,
    dispatchDeleteArtifact: React.PropTypes.func
};

export default Artifacts;
