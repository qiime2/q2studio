import { combineReducers } from 'redux';


const makeTabReducer = (name, defaultIndex = 0) => {
    const initialState = {
        currentIndex: defaultIndex
    };

    return (state = initialState, action) => {
        switch (action.type) {
        case 'CHANGE_TAB': {
            if (action.name !== name) { return state; }
            return {
                ...state,
                currentIndex: action.index
            };
        }
        default: return state;
        }
    };
};


const reducer = combineReducers({
    jobs: makeTabReducer('jobs'),
    artifacts: makeTabReducer('artifacts'),
    plugin: makeTabReducer('plugin'),
    createArtifact: makeTabReducer('createArtifact')
});

export default reducer;
