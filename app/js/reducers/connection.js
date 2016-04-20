const initialState = {
    uri: undefined,
    secret_key: undefined
};

const connectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ESTABLISH_CONNECTION':
            newState = {
                ...state
                uri: action.uri,
                secret_key: action.secret_key
            }
            return newState;
        default:
            return state;
    }
}
