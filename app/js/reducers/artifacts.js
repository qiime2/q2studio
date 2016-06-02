const initialState = {
    artifacts: [],
    inputArtifacts: {}
};

const artifactsReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'NEW_ARTIFACT': {
        const { artifact } = action;
        const newState = {
            ...state,
            artifacts: [
                ...state.artifacts,
                artifact
            ]
        };
        return newState;
    }
    case 'DELETE_ARTIFACT': {
        const filteredArtifacts = state.artifacts.filter(a => a.uuid !== action.uuid);
        const newState = {
            ...state,
            artifacts: filteredArtifacts
        };
        return newState;
    }
    case 'LINK_INPUT_ARTIFACT': {
        const { input: { name }, artifacts } = action;
        const newState = {
            ...state
        };
        newState.inputArtifacts[name] = artifacts;
        return newState;
    }
    default:
        return state;
    }
};

export default artifactsReducer;
