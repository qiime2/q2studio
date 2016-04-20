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

export const refreshArtifacts = () => ({
    type: 'REFRESH_ARTIFACTS'
});
