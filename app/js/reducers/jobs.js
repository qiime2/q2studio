const initialState = { inputArtifacts: {} };

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'LINK_INPUT_ARTIFACT': {
        const { input, artifacts } = action;
        const newState = {
            ...state,
            inputArtifacts: {
                ...state.inputArtifacts
            }
        };
        newState.inputArtifacts[input.name] = artifacts;
        return newState;
    }
    case 'CLEAR_JOB_STATE': {
        return initialState;
    }
    default:
        return state;
    }
};

export default jobReducer;
