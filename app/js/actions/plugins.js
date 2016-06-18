import actions from './';


const foundPlugin = (plugin) => ({
    type: 'FOUND_PLUGIN',
    plugin
});

const foundWorkflow = (plugin, workflow) => ({
    type: 'FOUND_WORKFLOW',
    plugin,
    workflow
});

const validateArtifact = (plugin, workflow, input) => ({
    type: 'VALIDATE_ARTIFACT',
    plugin,
    workflow,
    input
});

const missingArtifact = (plugin, workflow, input) => ({
    type: 'MISSING_ARTIFACT',
    plugin,
    workflow,
    input
});

const validateWorkflow = (plugin, workflow) => {
    return (dispatch, getState) => {
        const { connection: { uri, availableApis }, currentDirectory } = getState();
        const path = encodeURIComponent(currentDirectory);
        workflow.inputArtifacts.map(input => (
            fetch(`http://${uri.split('/')[0]}${availableApis[0]}${input.uri}?path=${path}`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(({ input_artifacts }) => {
                if (input_artifacts.length === 0) {
                    dispatch(missingArtifact(plugin, workflow, input.type));
                } else {
                    dispatch(validateArtifact(plugin, workflow, input.type));
                }
            })
        ));
    };
};

export const refreshValidation = () => {
    return (dispatch, getState) => {
        const { plugins } = getState();
        plugins.map(p => (
            p.workflows.map(w => (
                dispatch(validateWorkflow(p, w))
            ))
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
                Object.keys(json.workflows).forEach(workflow => {
                    dispatch(foundWorkflow(plugin.name, json.workflows[workflow]));
                    dispatch(validateWorkflow(plugin, json.workflows[workflow]));
                });
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
        .then(() => dispatch(actions.refreshArtifacts()))
        .then(() => dispatch(actions.successfullyConnected(true)));
    };
};
