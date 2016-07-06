const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'REGISTER_PATH': {
        const newState = { ...state };
        newState[action.source] = (newState[action.source] || {});
        newState[action.source][action.visualization.uuid] = action.visualization;
        return newState;
    }
    default: return state;
    }
};

export default reducer;
