const initialState = { jobTab: 'active', artifactTab: 'artifacts' };

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'CHANGE_JOB_TAB': {
        if (action.tab === state.jobTab) { return state; }
        return {
            ...state,
            jobTab: action.tab
        };
    }
    case 'CHANGE_ARTIFACT_TAB': {
        if (action.tab === state.artifactTab) { return state; }
        return {
            ...state,
            artifactTab: action.tab
        };
    }
    default: return state;
    }
};

export default reducer;
