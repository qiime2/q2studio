import update from 'react-addons-update';

const initialState = [];

const pluginsReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'FOUND_PLUGIN': {
        const newState = [
            ...state,
            {
                name: action.plugin,
                workflows: []
            }
        ];
        return newState;
    }
    case 'FOUND_WORKFLOW': {
        const workflow = {
            name: action.key,
            info: action.info
        };

        const index = state.findIndex(plugin => plugin.name === action.plugin);
        const newState = update(state, { [index]: { workflows: { $push: [workflow] } } });
        return newState;
    }
    default:
        return state;
    }
};

export default pluginsReducer;
