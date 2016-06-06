export const createJob = (job) => ({
    type: 'CREATE_JOB',
    job
});

export const startJob = (job) => ({
    type: 'START_JOB',
    job
});

export const clearJobState = () => ({
    type: 'CLEAR_JOB_STATE'
});

export const linkInputArtifact = (input, artifacts) => ({
    type: 'LINK_INPUT_ARTIFACT',
    input,
    artifacts
});

export const fetchInputArtifacts = (workflow) => {
    return (dispatch, getState) => {
        const { connection: { uri, availableApis } } = getState();
        workflow.inputArtifacts.map(input => (
            fetch(`http://${uri.split('/')[0]}${availableApis[0]}${input.uri}`, {
                method: 'GET'
            })
            .then((response) => (response.json()))
            .then(({ input_artifacts }) => dispatch(linkInputArtifact(input, input_artifacts)))
        ));
    };
};
