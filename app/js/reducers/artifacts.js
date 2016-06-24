const initialState = {
    artifacts: [],
    visualizations: []
};

const artifactsReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'NEW_ARTIFACT': {
        const { artifact } = action;
        if (state.artifacts.find(a => a.uuid === artifact.uuid) === undefined) {
            const newState = {
                ...state,
                artifacts: [
                    ...state.artifacts,
                    artifact
                ]
            };
            return newState;
        }
        return state;
    }
    case 'NEW_VISUALIZATION': {
        const { visualization } = action;
        if (state.visualizations.find(v => v.uuid === visualization.uuid) === undefined) {
            const newState = {
                ...state,
                visualizations: [
                    ...state.visualizations,
                    visualization
                ]
            };
            return newState;
        }
        return state;
    }
    case 'DELETE_ARTIFACT': {
        return {
            ...state,
            artifacts: [
                ...state.artifacts.filter(a => a.uuid !== action.uuid)
            ]
        };
    }
    case 'DELETE_VISUALIZATION': {
        return {
            ...state,
            visualizations: [
                ...state.visualizations.filter(v => v.uuid !== action.uuid)
            ]
        };
    }
    case 'CLEAR_ARTIFACTS': {
        return initialState;
    }
    default:
        return state;
    }
};

export default artifactsReducer;
