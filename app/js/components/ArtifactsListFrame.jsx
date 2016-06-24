import React from 'react';

import Artifacts from './Artifacts';

const ArtifactsListFrame = ({
    artifactTab,
    artifacts,
    visualizations,
    changeArtifactTab,
    refreshArtifacts,
    ...props
}) => {
    const tabMap = {
        artifacts,
        visualizations
    };
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <ul className="nav nav-pills">
                    <li
                        role="presentation"
                        className={artifactTab === 'artifacts' ? 'active' : null}
                    >
                        <a onClick={() => changeArtifactTab('artifacts')}>
                            Artifacts {artifacts.length > 0 ?
                                <span className="badge">{artifacts.length}</span> : null}
                        </a>
                    </li>
                    <li
                        role="presentation"
                        className={artifactTab === 'visualizations' ? 'active' : null}
                    >
                        <a onClick={() => changeArtifactTab('visualizations')}>
                            Visualizations {visualizations.length > 0 ?
                                <span className="badge">{visualizations.length}</span> : null}
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
                <Artifacts
                    data={tabMap[artifactTab]}
                    type={artifactTab.substring(0, artifactTab.length - 1)}
                    {...props}
                />
            </div>
        </div>
    );
};

ArtifactsListFrame.propTypes = {
    artifactTab: React.PropTypes.string,
    changeArtifactTab: React.PropTypes.func,
    refreshArtifacts: React.PropTypes.func,
    artifacts: React.PropTypes.array,
    visualizations: React.PropTypes.array
};


export default ArtifactsListFrame;
