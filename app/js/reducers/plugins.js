import update from 'react-addons-update';

const initialState = [];

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
            name: action.workflow.name,
            info: action.workflow.info,
            description: action.workflow.description,
            inputArtifacts: action.workflow.input_artifacts,
            inputParameters: action.workflow.input_parameters,
            outputArtifacts: action.workflow.output_artifacts
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
