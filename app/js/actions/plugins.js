import actions from './index';


const foundPlugin = (plugin) => ({
    type: 'FOUND_PLUGIN',
    plugin
});

const foundWorkflow = (plugin, workflow) => ({
    type: 'FOUND_WORKFLOW',
    plugin,
    workflow
});

const toggleWorkflow = (plugin, workflow, input, disabled) => ({
    type: 'TOGGLE_WORKFLOW',
    plugin,
    workflow,
    input,
    disabled
});

const validateWorkflow = (plugin, workflow) => {
    return (dispatch, getState) => {
        const { connection: { uri, availableApis } } = getState();
        workflow.inputArtifacts.map(input => (
            fetch(`http://${uri.split('/')[0]}${availableApis[0]}${input.uri}`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(({ input_artifacts }) => {
                if (input_artifacts.length === 0) {
                    dispatch(toggleWorkflow(plugin, workflow, input.type, true));
                }
            })
        ));
    };
};

export const loadWorkflows = () => {
    return (dispatch, getState) => {
        const { plugins, connection: { uri, availableApis } } = getState();
        plugins.map((plugin) => (
            fetch(`http://${uri.split('/')[0]}${availableApis[0]}${plugin.workflowsURI}`)
            .then((response) => (response.json()))
            .then((json) => {
                Object.keys(json.workflows).map(workflow =>
                    dispatch(foundWorkflow(plugin.name, json.workflows[workflow])) &&
                    dispatch(validateWorkflow(plugin, json.workflows[workflow]))
                );
            })
        ));
    };
};

export const loadPlugins = () => {
    return (dispatch, getState) => {
        dispatch(actions.updateConnectionStatus('Fetching Plugins'));
        const { connection: { uri, availableApis } } = getState();
        fetch(`http://${uri.split('/')[0]}${availableApis[0]}plugins`)
        .then((response) => (response.json()))
        .then((json) => {
            json.plugins.map(plugin => (
                dispatch(foundPlugin(plugin))
            ));
        })
        .then(() => dispatch(loadWorkflows()))
        .then(() => dispatch(actions.loadArtifacts()))
        .then(() => dispatch(actions.successfullyConnected(true)));
    };
};
