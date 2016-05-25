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
            { flow.inputArtifacts.map(({ name }) =>
                <fieldset
                    className="form-group"
                    key={ `${name}-dropdown${counter++}` }
                >
                    <label htmlFor="in-{ name }">
                        Input Artifact: { name }
                    </label>
                    <select
                        className="form-control"
                        name="in-{ name }"
                    >
                          { Artifacts.filter(artifact => artifact.name ===
                              name).map(artifact =>
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

            { flow.inputParameters.map(({ name, type }) =>
                <fieldset
                    className="form-group"
                    key={ `${name}-text-input${counter++}` }
                >
                    <label htmlFor="param-{ name }">
                        Input Parameter: { name }
                    </label>
                    <input
                        type="text-field"
                        className="form-control"
                        name="param-{ name }"
                        placeholder={ type }
                    />
                </fieldset>
            )}
                <br />
                <br />
                <br />

            { flow.outputArtifacts.map(({ name, type }) =>
                <fieldset
                    className="form-group"
                    key={ `${name}-text-output${counter++}` }
                >
                    <label htmlFor="out-{ name }">
                        Output Name: { name }
                    </label>
                    <input
                        type="text-field"
                        className="form-control"
                        name="out-{ name }"
                        placeholder={ type }
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
