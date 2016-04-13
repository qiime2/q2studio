// NEW_ARTIFACT
// EXPECTING_ARTIFACT

export function deleteArtifact(id) {
    return {
        type: 'DELETE_ARTIFACT',
        id
    };
}

// REFRESH_ARTIFACTS
//
// LOAD_PLUGINS
// LOAD_WORKFLOWS
//
// CREATE_JOB
// START_JOB
