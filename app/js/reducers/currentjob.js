const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'LINK_INPUT_ARTIFACT': {
        const { input, artifacts } = action;
        const newState = {
            ...state
        };
        newState[input] = artifacts;
        return newState;
    }
    case 'CLEAR_JOB_STATE': {
        return initialState;
    }
    default: return state;
    }
};

export default reducer;
