const initialState = {
    connected: false,
    message: 'Open server generated URL'
};

const connectionReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'ESTABLISH_CONNECTION': {
        const newState = {
            ...state,
            uri: action.uri,
            secretKey: action.secretKey,
            message: 'Connecting to server...'
        };
        return newState;
    }
    case 'ESTABLISH_API_LIST': {
        const newState = {
            ...state,
            availableApis: action.availableApis,
            message: 'Fetching available APIs'
        };
        return newState;
    }
    case 'SUCCESFULLY_CONNECTED': {
        const newState = {
            ...state,
            connected: action.result,
            message: action.result ? '' : 'Connection failed'
        };
        return newState;
    }
    case 'UPDATE_STATUS': {
        const newState = {
            ...state,
            message: action.status
        };
        return newState;
    }
    default:
        return state;
    }
};

export default connectionReducer;
