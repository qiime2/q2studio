const initialState = [];

const artifactsReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'NEW_ARTIFACT': {
        const { artifact } = action;
        if (state.find(a => a.uuid === artifact.uuid) === undefined) {
            const newState = [
                ...state,
                artifact
            ];
            return newState;
        }
        return state;
    }
    case 'DELETE_ARTIFACT': {
        const newState = state.filter(a => a.uuid !== action.uuid);
        return newState;
    }
    case 'CLEAR_ARTIFACTS': {
        return initialState;
    }
    default:
        return state;
    }
};

export default artifactsReducer;
