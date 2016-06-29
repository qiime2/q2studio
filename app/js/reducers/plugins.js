const initialState = [];

const addWorkflow = (plugin, workflow) => {
    const updatedPlugin = {
        ...plugin,
        workflows: [
            ...plugin.workflows,
            {
                ...workflow
            }
        ]
    };
    return updatedPlugin;
};

const addRequirement = (plugin, workflow, input) => {
    const updatedPlugin = {
        ...plugin,
        workflows: [
            ...plugin.workflows.filter(w => w.name !== workflow.name),
            {
                ...workflow,
                requires: [
                    ...workflow.requires,
                    input
                ]
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
                workflowsURI: action.plugin.method_uri,
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
    case 'VALIDATE_ARTIFACT': {
        const originalPlugin = { ...state.find(p => p.name === action.plugin.name) };
        const workflow = { ...originalPlugin.workflows.find(w => w.name === action.workflow.name) };
        if (workflow.requires.indexOf(action.input) !== -1) {
            const filteredState = state.filter(p => p.name !== action.plugin.name);
            originalPlugin.workflows = originalPlugin.workflows.filter(w => (
                w.name !== action.workflow.name
            ));
            workflow.requires = workflow.requires.filter(r => action.input !== r);
            const newPlugin = addWorkflow(originalPlugin, workflow);
            const newState = [
                ...filteredState,
                newPlugin
            ];
            return newState;
        }
        return state;
    }
    case 'MISSING_ARTIFACT': {
        const originalPlugin = { ...state.find(p => p.name === action.plugin.name) };
        const filteredState = state.filter(p => p.name !== action.plugin.name);
        const workflow = { ...originalPlugin.workflows.find(w => w.name === action.workflow.name) };
        if (workflow.requires.indexOf(action.input) !== -1) { return state; }
        const newPlugin = addRequirement(originalPlugin, workflow, action.input);

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
