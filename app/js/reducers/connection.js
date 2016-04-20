const connectionReducer = (state = {}, action) => {
    switch (action.type) {
    case 'ESTABLISH_CONNECTION': {
        const newState = {
            ...state,
            uri: action.uri,
            secretKey: action.secretKey
        };
        return newState;
    }
    case 'ESTABLISH_API_LIST': {
        const newState = {
            ...state,
            availableApis: action.availableApis
        };
        return newState;
    }
    default:
        return state;
    }
};

export default connectionReducer;
