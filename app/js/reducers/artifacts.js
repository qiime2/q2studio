const initialState = [];

const artifactsReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'NEW_ARTIFACT': {
        const { artifact } = action;
        const newState = [
            ...state,
            artifact
        ];
        return newState;
    }
    case 'DELETE_ARTIFACT': {
        const filteredState = state.filter(a => a.uuid !== action.uuid);
        const newState = [
            ...filteredState
        ];
        return newState;
    }
    default:
        return state;
    }
};

export default artifactsReducer;
