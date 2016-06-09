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
        const newState = state.filter(a => a.uuid !== action.uuid);
        return newState;
    }
    default:
        return state;
    }
};

export default artifactsReducer;
