import React from 'react';


const Job = ({ plugin, workflow, inputArtifacts, submitJob, cancelJob }) => {
    let counter = 1;
    return (
        <div className="container">
            <div className="page-header">
                <h1>{plugin.name}: {workflow.description}</h1>
            </div>
            <form>
            { workflow.inputArtifacts.map(({ name }) =>
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
                        { inputArtifacts[name] !== undefined ?
                            inputArtifacts[name].map(artifact =>
                                <option
                                    key={artifact.uuid}
                                    value={artifact.path}
                                >
                                    {artifact.name} - {`(${artifact.uuid})`}
                                </option>
                            ) : null
                        }
                    </select>
                </fieldset>
            )}

            { workflow.inputParameters.map(({ name, type }) =>
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

            { workflow.outputArtifacts.map(({ name, type }) =>
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
            </form>
            <button
                className="btn btn-danger"
                onClick={cancelJob}
            >
                Cancel
            </button>
            <button
                className="btn btn-primary pull-right"
                onClick={() => {
                    const formData = new FormData(document.querySelector('form'));
                    for (const [key, value] of formData.entries()) {
                        if (value === '') {
                            alert(`${key} must not be blank.`);
                            return;
                        }
                    }
                    submitJob(workflow, formData);
                }}
            >
                Go!
            </button>
        </div>
  );};

Job.propTypes = {
    inputArtifacts: React.PropTypes.object,
    plugin: React.PropTypes.object,
    workflow: React.PropTypes.object,
    submitJob: React.PropTypes.func,
    cancelJob: React.PropTypes.func
};

export default Job;
