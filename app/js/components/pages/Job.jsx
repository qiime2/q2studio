import React from 'react';

import _ from 'lodash';


const Job = ({ plugin, action, inputs, metadata, submitJob, cancelJob, children }) => {
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

            { action.parameters.map(({ name, type, ast }) =>
                <fieldset
                    className="form-group"
                    key={ `${name}-text-input${counter++}` }
                >
                    <label htmlFor={`param-${name}`}>
                        Input Parameter: { name }
                    </label>
                    { ast.predicate.name && ast.predicate.name === 'Choices' ?
                        (
                        <select
                            className="form-control"
                            name={`param-${name}`}
                        >
                            {
                                _.sortBy(ast.predicate.choices).map(choice =>
                                    <option
                                        key={choice}
                                        value={choice}
                                    >
                                        {choice}
                                    </option>
                                )
                            }
                        </select>
                        )
                        : type === 'Metadata' ?
                        (
                            <select
                                className="form-control"
                                name={`metadata-${name}`}
                            >
                                { metadata ?
                                    metadata.map(entry =>
                                        <option
                                            key={entry.name}
                                            value={entry.filepath}
                                        >
                                            {entry.name}
                                        </option>
                                    ) : null
                                }
                            </select>
                        )
                        : type === 'MetadataCategory' ?
                        (
                            <fieldset>
                                <select
                                    className="form-control"
                                    name={`metadatacat1-${name}`}
                                >
                                    { metadata ?
                                        metadata.map(entry =>
                                            <option
                                                key={entry.name}
                                                value={entry.filepath}
                                            >
                                                {entry.name}
                                            </option>
                                        ) : null
                                    }
                                </select>
                                <input
                                    type="text-field"
                                    className="form-control"
                                    name={`metadatacat2-${name}`}
                                    placeholder={ type }
                                />
                            </fieldset>
                        )
                        :
                        (
                            <input
                                type="text-field"
                                className="form-control"
                                name={`param-${name}`}
                                placeholder={ type }
                            />
                        )
                    }

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
                    disabled={children && children.type.displayName === 'JobRunning'}
                    className="btn btn-primary pull-right"
                    type="submit"
                >
                    Go!
                </button>
            </form>
            <br />
            <br />
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
    metadata: React.PropTypes.array,
    submitJob: React.PropTypes.func,
    cancelJob: React.PropTypes.func
};

export default Job;
