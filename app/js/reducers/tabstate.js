const initialState = { jobTab: 'active', artifactTab: 'artifacts' };

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'CHANGE_JOB_TAB':
        return {
            ...state,
            jobTab: action.tab
        };
    case 'CHANGE_ARTIFACT_TAB':
        return {
            ...state,
            artifactTab: action.tab
        };
    default: return state;
    }
};

export default reducer;
