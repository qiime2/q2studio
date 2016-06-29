const initialState = {};

const connectionReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'ESTABLISH_CONNECTION': {
        const newState = {
            ...state,
            uri: action.uri,
            secretKey: action.secretKey
        };
        return newState;
    }
    default:
        return state;
    }
};

export default connectionReducer;
