export const newArtifact = (artifact) => ({
    type: 'NEW_ARTIFACT',
    artifact
});

export const expectingArtifact = () => ({
    type: 'EXPECTING_ARTIFACT'
});

const deleteArtifactHidden = (uuid) => ({
    type: 'DELETE_ARTIFACT',
    uuid
});

export const deleteArtifact = (uuid) => {
    return (dispatch) => {
        dispatch({type: 'DO_NOTHING'});
        setTimeout(() => {
            dispatch(deleteArtifactHidden(uuid))
        }, 5000);
    }
}

export const refreshArtifacts = () => ({
    type: 'REFRESH_ARTIFACTS'
});
