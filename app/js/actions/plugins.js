import fetch from 'isomorphic-fetch';
import es6Promise from 'es6-promise';

import actions from './index';

es6Promise.polyfill();


const foundPlugin = (plugin) => ({
    type: 'FOUND_PLUGIN',
    plugin
});

const foundWorkflow = (plugin, key, info) => ({
    type: 'FOUND_WORKFLOW',
    plugin,
    key,
    info
});

export const loadWorkflows = (plugin) => {
    return (dispatch, getState) => {
        const { connection: { uri, availableApis } } = getState();
        fetch(`http://${uri.split('/')[0]}${availableApis[0]}${plugin}/workflows`)
        .then((response) => (response.json()))
        .then((json) => {
            Object.keys(json.workflows).map(key =>
                dispatch(foundWorkflow(plugin, key, json.workflows[key]))
            );
        });
    };
};

export const loadPlugins = () => {
    return (dispatch, getState) => {
        const { connection: { uri, availableApis } } = getState();
        fetch(`http://${uri.split('/')[0]}${availableApis[0]}plugins`)
        .then((response) => (response.json()))
        .then((json) => {
            json.names.map(plugin => (
                dispatch(foundPlugin(plugin))
            ));
            return json.names;
        })
        .then((names) => (names.map(plugin => dispatch(loadWorkflows(plugin)))))
        .then(() => (dispatch(actions.successfullyConnected(true))));
    };
};
