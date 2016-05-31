import fetch from 'isomorphic-fetch';
import es6Promise from 'es6-promise';

import actions from './index';

es6Promise.polyfill();


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
        const { plugins, connection: { uri, availableApis } } = getState();
        plugins.map((plugin) => (
            fetch(`http://${uri.split('/')[0]}${availableApis[0]}${plugin.workflowsURI}`)
            .then((response) => (response.json()))
            .then((json) => {
                Object.keys(json.workflows).map(workflow =>
                    dispatch(foundWorkflow(plugin.name, json.workflows[workflow]))
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
