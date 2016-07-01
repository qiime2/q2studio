import { fetchAPI } from '../util/auth';
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

export const loadWorkflows = () => {
    return (dispatch, getState) => {
        const { plugins, connection: { uri, secretKey } } = getState();
        plugins.forEach(plugin => {
            const url = `http://${uri}${plugin.workflowsURI}`;
            fetchAPI(secretKey, 'GET', url)
            .then((json) => {
                Object.keys(json.methods).forEach(method => {
                    dispatch(foundWorkflow(plugin.name, json.methods[method]));
                    dispatch(actions.foundTypes(
                        json.methods[method].inputs.map(input => input.type)
                    ));
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
        fetchAPI(secretKey, method, url)
        .then((json) => {
            json.plugins.map(plugin => (
                dispatch(foundPlugin(plugin))
            ));
        })
        .then(() => dispatch(loadWorkflows()));
    };
};
