const initialState = {
    activeJobs: [],
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
        const newState = {
            ...state,
            activeJobs: [
                ...state.activeJobs.filter(a => a.id !== action.job.id)
            ]
        };
        return newState;
    }
    default:
        return state;
    }
};

export default jobReducer;
