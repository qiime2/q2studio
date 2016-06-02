const initialState = [];

const artifactsReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'NEW_ARTIFACT': {
        const newArtifact = action.artifact;
        newArtifact.links = [];
        const newState = [
            ...state,
            newArtifact
        ];
        return newState;
    }
    case 'DELETE_ARTIFACT': {
        const newState = state.filter(artifact => artifact.uuid !== action.uuid);
        return newState;
    }
    case 'LINK_INPUT_ARTIFACT': {
        const newState = [
            ...state
        ];
        return newState;
    }
    default:
        break;
    }
    return state;
};

export default artifactsReducer;
