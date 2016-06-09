const initialState = [];

const addWorkflow = (plugin, workflow) => {
    const updatedPlugin = {
        ...plugin,
        workflows: [
            ...plugin.workflows,
            workflow
        ]
    };
    return updatedPlugin;
};

const pluginsReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'FOUND_PLUGIN': {
        const newState = [
            ...state,
            {
                name: action.plugin.name,
                workflowsURI: action.plugin.workflow_uri,
                workflows: []
            }
        ];
        return newState;
    }
    case 'FOUND_WORKFLOW': {
        const workflow = {
            ...action.workflow
        };
        const originalPlugin = state.find(plugin => plugin.name === action.plugin);
        const filteredState = state.filter(plugin => plugin.name !== action.plugin);
        const newPlugin = addWorkflow(originalPlugin, workflow);
        const newState = [
            ...filteredState,
            newPlugin
        ];
        return newState;
    }
    default:
        return state;
    }
};

export default pluginsReducer;
