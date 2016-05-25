const initialState = [];

const artifactsReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'NEW_ARTIFACT': {
        const newState = [
            ...state,
            action.artifact
        ];
        return newState;
    }
    case 'DELETE_ARTIFACT': {
        // TODO, make it actually do something
        const newState = state.filter(artifact => artifact.uuid !== action.uuid);
        return newState;
    }
    default:
        break;
    }
    return state;
};

export default artifactsReducer;
