import React from 'react';

import Artifacts from './Artifacts';
import Visualizations from './Visualizations';

const ArtifactsListFrame = ({ artifactTab, changeArtifactTab, refreshArtifacts, ...props }) => {
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <ul className="nav nav-pills">
                    <li
                        role="presentation"
                        className={artifactTab === 'artifacts' ? 'active' : null}
                    >
                        <a
                            onClick={() => (
                                artifactTab === 'artifacts' ? null :
                                changeArtifactTab('artifacts'))
                            }
                        >
                            Artifacts
                        </a>
                    </li>
                    <li
                        role="presentation"
                        className={artifactTab === 'visualizations' ? 'active' : null}
                    >
                        <a
                            onClick={() => (
                                artifactTab === 'visualizations' ? null :
                                changeArtifactTab('visualizations'))
                            }
                        >
                            Visualizations
                        </a>
                    </li>
                    <li className="pull-right">
                        <button
                            type="button"
                            className="close"
                            aria-label="Refresh"
                            onClick={refreshArtifacts}
                        >
                            <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="panel-body">
            {artifactTab === 'artifacts' ?
                <Artifacts {...props} /> :
                <Visualizations {...props} />
            }
            </div>
        </div>
    );
};

ArtifactsListFrame.propTypes = {
    artifactTab: React.PropTypes.string,
    changeArtifactTab: React.PropTypes.func
};


export default ArtifactsListFrame;
