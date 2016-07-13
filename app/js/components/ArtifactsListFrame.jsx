import React from 'react';

import Artifacts from './Artifacts';
import Tabs from './Tabs';

const ArtifactsListFrame = ({
    artifacts,
    visualizations,
    changeArtifactTab,
    refreshArtifacts,
    currentIndex,
    ...props
}) => {
    const lookup = [artifacts, visualizations];
    const names = ['artifact', 'visualization'];
    return (<Tabs
        tabs={['Artifacts', 'Visualizations']}
        getCount={(idx) => lookup[idx].length}
        contents={lookup.map((listing, idx) => (
            <Artifacts data={listing} type={names[idx]} {...props} />))}
        currentIndex={currentIndex}
        changeTab={changeArtifactTab}
        refresh={refreshArtifacts}
    />);
};

ArtifactsListFrame.propTypes = {
    artifactTab: React.PropTypes.string,
    changeArtifactTab: React.PropTypes.func,
    refreshArtifacts: React.PropTypes.func,
    artifacts: React.PropTypes.array,
    visualizations: React.PropTypes.array,
    currentIndex: React.PropTypes.number
};


export default ArtifactsListFrame;
