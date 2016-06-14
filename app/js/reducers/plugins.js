const initialState = [];

const addWorkflow = (plugin, workflow) => {
    const updatedPlugin = {
        ...plugin,
        workflows: [
            ...plugin.workflows,
            {
                ...workflow,
                disabled: false,
                requires: []
            }
        ]
    };
    return updatedPlugin;
};

const toggleWorkflow = (plugin, workflow, input, disabled) => {
    const updatedPlugin = {
        ...plugin,
        workflows: [
            ...plugin.workflows.filter(w => w.name !== workflow.name),
            {
                ...workflow,
                requires: [
                    ...workflow.requires,
                    input
                ],
                disabled
            }
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
        const originalPlugin = state.find(plugin => plugin.name === action.plugin);
        const filteredState = state.filter(plugin => plugin.name !== action.plugin);
        const newPlugin = addWorkflow(originalPlugin, action.workflow);
        const newState = [
            ...filteredState,
            newPlugin
        ];
        return newState;
    }
    case 'TOGGLE_WORKFLOW': {
        const originalPlugin = state.find(p => p.name === action.plugin.name);
        const filteredState = state.filter(p => p.name !== action.plugin.name);
        const workflow = originalPlugin.workflows.find(w => w.name === action.workflow.name);

        const newPlugin = toggleWorkflow(originalPlugin, workflow, action.input, action.disabled);
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
