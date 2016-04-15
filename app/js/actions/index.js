export const newArtifact = (artifact) => ({
    type: 'NEW_ARTIFACT',
    artifact
});

// EXPECTING_ARTIFACT

export const deleteArtifact = (index) => ({
    type: 'DELETE_ARTIFACT',
    index
});

export const refreshArtifacts = () => ({
    type: 'REFRESH_ARTIFACTS'
});

export const loadPlugins = () => ({
    type: 'LOAD_PLUGINS'
});

export const loadWorkflows = () => ({
    type: 'LOAD_WORKFLOWS'
});

export const createJob = (job) => ({
    type: 'CREATE_JOB',
    job
});


// START_JOB
