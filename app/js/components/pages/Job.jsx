import React from 'react';

const Job = ({ plugin, action, inputs, submitJob, cancelJob, children }) => {
    let counter = 1;
    return (
        <div className="container">
            <div className="page-header">
                <h1>{plugin.name}: {action.description}</h1>
            </div>
            <form onSubmit={submitJob}>
            { action.inputs.map(({ name }) =>
                <fieldset
                    className="form-group"
                    key={ `${name}-dropdown${counter++}` }
                >
                    <label htmlFor={`in-${name}`}>
                        Input Artifact: { name }
                    </label>
                    <select
                        className="form-control"
                        name={`in-${name}`}
                    >
                        { inputs[name] !== undefined ?
                            inputs[name].map(artifact =>
                                <option
                                    key={artifact.uuid}
                                    value={artifact.uuid}
                                >
                                    {artifact.name} - {`(${artifact.uuid})`}
                                </option>
                            ) : null
                        }
                    </select>
                </fieldset>
            )}

            { action.parameters.map(({ name, type }) =>
                <fieldset
                    className="form-group"
                    key={ `${name}-text-input${counter++}` }
                >
                    <label htmlFor={`param-${name}`}>
                        Input Parameter: { name }
                    </label>
                    <input
                        type="text-field"
                        className="form-control"
                        name={`param-${name}`}
                        placeholder={ type }
                    />
                </fieldset>
            )}
                <br />
                <br />
                <br />

            { action.outputs.map(({ name, type }) =>
                <fieldset
                    className="form-group"
                    key={ `${name}-text-output${counter++}` }
                >
                    <label htmlFor={`out-${name}`}>
                        Output Name: { name }
                    </label>
                    <input
                        type="text-field"
                        className="form-control"
                        name={`out-${name}`}
                        placeholder={ type }
                    />
                </fieldset>
            )}
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={cancelJob}
                >
                    Cancel
                </button>
                <button
                    disabled={children && children.type.name === 'JobRunning'}
                    className="btn btn-primary pull-right"
                    type="submit"
                >
                    Go!
                </button>
            </form>
            { children }
        </div>
  );
};

Job.propTypes = {
    inputs: React.PropTypes.object,
    plugin: React.PropTypes.object,
    action: React.PropTypes.object,
    actionType: React.PropTypes.string,
    children: React.PropTypes.element,
    submitJob: React.PropTypes.func,
    cancelJob: React.PropTypes.func
};

export default Job;
