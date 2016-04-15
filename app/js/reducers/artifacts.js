const artifacts = (state = [], action) => {
    switch (action.type) {
    case 'DELETE_ARTIFACT': {
        // TODO, make it actually do something
        const newState = state.filter((_, index) => index !== action.index);
        return newState;
    }
    default:
        break;
    }
    return state;
};

export default artifacts;
