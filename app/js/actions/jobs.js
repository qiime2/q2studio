import actions from '../actions';
import { fetchAPI } from '../util/auth';

// global variable to set and clear intervals for scanning for jobs.
let jobInterval;

export const newActiveJob = (job) => ({
    type: 'NEW_ACTIVE_JOB',
    job
});

export const jobCompleted = (job) => ({
    type: 'JOB_COMPLETED',
    job
});

const pollJobStatus = (dispatch, getState) => {
    const { connection: { uri, secretKey }, jobs: { activeJobs } } = getState();
    activeJobs.forEach(job => {
        fetchAPI(secretKey, 'GET', `http://${uri}/api/jobs/${job.uuid}`)
        .then((json) => {
            if (json.completed) {
                dispatch(jobCompleted(json));
                dispatch(actions.refreshArtifacts());
                dispatch(actions.refreshVisualizations());
            }
        });
    });
};

export const startJob = (data) => {
    return (dispatch, getState) => {
        const { connection: { uri, secretKey } } = getState();
        const url = `http://${uri}/api/jobs/`;
        fetchAPI(secretKey, 'POST', url, data)
        .then(({ job }) => fetchAPI(secretKey, 'GET', `http://${uri}${job}`))
        .then((json) => {
            dispatch(actions.newActiveJob(json));
            if (jobInterval === undefined) {
                jobInterval = setInterval(() => pollJobStatus(dispatch, getState), 1000);
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

export const setJob = (action) => {
    return (dispatch, getState) => {
        const {
            artifacts: { artifacts },
            superTypes: { yes }
        } = getState();
        action.inputs.forEach(({ type, name }) => {
            const subtypes = yes[type];
            dispatch(linkInputArtifact(name, artifacts.filter(
                ({ type: atype }) => subtypes.has(atype))));
        });
    };
};
