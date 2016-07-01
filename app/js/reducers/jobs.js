const initialState = {
    activeJobs: [],
    completedJobs: [],
    failedJobs: [],
};

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
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
        const job = state.activeJobs.find(a => a.uuid === action.job.uuid);
        const newState = {
            ...state,
            activeJobs: [
                ...state.activeJobs.filter(a => a.uuid !== action.job.uuid)
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
    default:
        return state;
    }
};

export default jobReducer;
