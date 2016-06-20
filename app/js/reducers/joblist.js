const initialState = { active: 'active' };

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'CHANGE_JOB_TAB':
        return {
            ...state,
            active: action.tab
        };
    default: return state;
    }
};

export default reducer;
