export const newArtifact = (artifact) => ({
    type: 'NEW_ARTIFACT',
    artifact
});

export const expectingArtifact = () => ({
    type: 'EXPECTING_ARTIFACT'
});

export const deleteArtifact = (uuid) => ({
    type: 'DELETE_ARTIFACT',
    uuid
});

export const loadArtifacts = () => {
    return (dispatch, getState) => {
        const { connection: { uri, availableApis } } = getState();
        fetch(`http://${uri.split('/')[0]}${availableApis[0]}artifacts`, {
            method: 'GET'
        })
        .then((response) => (response.json()))
        .then((json) => {
            json.artifacts.map(artifact => (
                dispatch(newArtifact(artifact))
            ));
        });
    };
};

export const refreshArtifacts = () => ({
    type: 'REFRESH_ARTIFACTS'
});
