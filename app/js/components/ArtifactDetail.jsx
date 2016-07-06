import React from 'react';

import JobHistoryData from './JobHistoryData';

const ArtifactDetail = ({ artifact }) => {
    const order = ['UUID', 'Type'];
    return (
        <div className="container">
            <div className="page-header">
                <h1>{artifact.name}</h1>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    Detail View:
                </div>
                <div className="panel-body">
                    <table className="table">
                        <tbody>
                            {order.map(key =>
                                <JobHistoryData
                                    key={key}
                                    name={key}
                                    value={artifact[key.toLowerCase()]}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

ArtifactDetail.propTypes = {
    artifact: React.PropTypes.object
};

export default ArtifactDetail;
