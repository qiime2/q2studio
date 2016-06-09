import actions from '../actions';
import { makeB64Digest } from '../util/auth';

export const createJob = (job) => ({
    type: 'CREATE_JOB',
    job
});

export const startJob = (workflow, data) => {
    const jobData = {};
    for (const [key, value] of data.entries()) {
        jobData[key] = value;
    }

    return (dispatch, getState) => {
        const { connection: { uri, availableApis, secretKey } } = getState();
        const url = `http://${uri.split('/')[0]}${availableApis[0]}${workflow.jobUri}`;
        const method = 'POST';
        const requestTime = Date.now();
        const body = JSON.stringify({
            jobData
        });
        const digest = makeB64Digest(secretKey, method, url, requestTime, body);

        fetch(url, {
            method,
            headers: new Headers({
                Authorization: `HMAC-SHA256 ${digest}`,
                'Content-Type': 'application/json',
                'X-QIIME-Timestamp': requestTime
            }),
            body
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((json) => {
            if (json.success) {
                dispatch(actions.refreshArtifacts());
            }
        });
    };
};

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
            .then(response => response.json())
            .then(({ input_artifacts }) => dispatch(linkInputArtifact(input, input_artifacts)))
        ));
    };
};
