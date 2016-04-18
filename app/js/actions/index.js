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

export const loadPlugins = () => ({
    type: 'LOAD_PLUGINS'
});

export const loadWorkflows = (plugin) => ({
    type: 'LOAD_WORKFLOWS',
    plugin
});

export const createJob = (job) => ({
    type: 'CREATE_JOB',
    job
});

export const startJob = (job) => ({
    type: 'START_JOB',
    job
});
