export const loadPlugins = () => ({
    type: 'LOAD_PLUGINS'
});

export const loadWorkflows = (plugin) => ({
    type: 'LOAD_WORKFLOWS',
    plugin
});
