const initialState = {
    activeJobs: [],
    completedJobs: [],
    failedJobs: [],
    inputArtifacts: {}
};

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'LINK_INPUT_ARTIFACT': {
        const { input, artifacts } = action;
        const newState = {
            ...state,
            inputArtifacts: {
                ...state.inputArtifacts
            }
        };
        newState.inputArtifacts[input.name] = artifacts;
        return newState;
    }
    case 'CLEAR_JOB_STATE': {
        const newState = {
            ...state,
            inputArtifacts: {
                ...initialState.inputArtifacts
            }
        };
        return newState;
    }
    case 'NEW_ACTIVE_JOB': {
        const newState = {
            ...state,
            activeJobs: [
                ...state.activeJobs,
                action.job
            ]
        };
        return newState;
    }
    case 'JOB_COMPLETED': {
        const job = state.activeJobs.find(a => a.id === action.job.id);
        const newState = {
            ...state,
            activeJobs: [
                ...state.activeJobs.filter(a => a.id !== action.job.id)
            ]
        };

        if (action.job.job.error) {
            newState.failedJobs = [
                ...state.failedJobs,
                {
                    ...job,
                    ...action.job.job
                }
            ];
        } else {
            newState.completedJobs = [
                ...state.completedJobs,
                {
                    ...job,
                    ...action.job.job
                }
            ];
        }

        return newState;
    }
    case 'DISMISS_FAILED_NOTIFICATION': {
        const newState = {
            ...state,
            failedJobs: [
                ...state.failedJobs.filter(f => f.id !== action.id)
            ]
        };
        return newState;
    }
    default:
        return state;
    }
};

export default jobReducer;
