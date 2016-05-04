import React from 'react';

const Flow = ({ routeParams: { pluginId, flowId } }, { store }) => {
    const Artifacts = store.getState().artifacts;
    const plugin = store.getState().plugins.filter(plug => plug.name === pluginId)[0];
    const flow = plugin.workflows.filter(workflow => workflow.name === flowId)[0];
    let counter = 1;
    return (
        <div className="container">
            <div className="page-header">
                <h1>{plugin.name}: {flow.description}</h1>
            </div>
            <form>
            { flow.input.filter(input => input.input_type ===
                'Dropdown').map(workflow =>
                    <fieldset
                        className="form-group"
                        key={ `${workflow.name}-dropdown${counter++}` }
                    >
                        <label htmlFor="in-{ workflow.sub_type }">
                            Input Artifact: { workflow.sub_type }
                        </label>
                        <select
                            className="form-control"
                            name="in-{ workflow.sub_type }"
                        >
                              { Artifacts.filter(artifact => artifact.name ===
                                  workflow.sub_type).map(artifact =>
                                      <option
                                          key={ `${artifact.uuid}-dropdown` }
                                          value="{{ artifact.uuid }}"
                                      >
                                          {artifact.name} - {artifact.uuid}
                                      </option>
                              )}
                        </select>
                    </fieldset>
            )}

            { flow.input.filter(input => input.input_type ===
                'Text').map(workflow =>
                    <fieldset
                        className="form-group"
                        key={ `${workflow.name}-text-input${counter++}` }
                    >
                        <label htmlFor="param-{ workflow.sub_type }">
                            Input Parameter: { workflow.sub_type }
                        </label>
                        <input
                            type="text-field"
                            className="form-control"
                            name="param-{ workflow.sub_type }"
                            placeholder={ workflow.input_hint }
                        />
                    </fieldset>
            )}
                <br />
                <br />
                <br />

            { flow.output.filter(input => input.input_type ===
                'Text').map(workflow =>
                    <fieldset
                        className="form-group"
                        key={ `${workflow.name}-text-output${counter++}` }
                    >
                        <label htmlFor="out-{ workflow.sub_type }">
                            Output Name: { workflow.sub_type }
                        </label>
                        <input
                            type="text-field"
                            className="form-control"
                            name="out-{ workflow.sub_type }"
                            placeholder={ workflow.input_hint }
                        />
                    </fieldset>
            )}


                <button type="submit" className="btn btn-primary">Go!</button>
            </form>
        </div>
  );};

Flow.propTypes = {
    routeParams: React.PropTypes.object
};

Flow.contextTypes = {
    store: React.PropTypes.object
};

export default Flow;
