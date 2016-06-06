const initialState = {};

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'CLEAR_JOB_STATE': {
        return initialState;
    }
    default:
        return state;
    }
};

export default jobReducer;
