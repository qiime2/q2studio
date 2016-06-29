import actions from './';
import { fetchAPI } from '../util/auth';
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
        const { plugins, connection: { uri, secretKey } } = getState();
        plugins.forEach(plugin => {
            const url = `http://${uri}${plugin.workflowsURI}`;
            const method = 'GET';
            const timestamp = Date.now();
            fetchAPI(secretKey, method, url, timestamp, undefined)
            .then((json) => {
                Object.keys(json.methods).forEach(method => {
                    dispatch(foundWorkflow(plugin.name, json.methods[method]));
                    // dispatch(validateWorkflow(plugin, json.methods[method]));
                });
            });
        });
    };
};

export const loadPlugins = () => {
    return (dispatch, getState) => {
        const { connection: { uri, secretKey } } = getState();
        const url = `http://${uri}/api/plugins/`;
        const method = 'GET';
        const timestamp = Date.now();
        fetchAPI(secretKey, method, url, timestamp, undefined)
        .then((json) => {
            json.plugins.map(plugin => (
                dispatch(foundPlugin(plugin))
            ));
        })
        .then(() => dispatch(loadWorkflows()));
    };
};
