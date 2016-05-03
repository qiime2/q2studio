import React from 'react'

const Flow = ({ routeParams: { pluginId, flowId } }, {store}) => {

  var Artifacts = store.getState().artifacts;
  var plugin = store.getState().plugins.filter(plugin => plugin.name === pluginId)[0]
  var flow = plugin.workflows.filter(flow => flow.name === flowId)[0]
  var counter = 1

  return(
    <div className="container">
    <div className="page-header">
      <h1>{plugin.name}: {flow.description}</h1>
    </div>
    <form>
    { flow.input.filter(input => input.input_type === 'Dropdown').map(flow =>
      <fieldset className="form-group" key={ `${flow.name}-dropdown${counter++}` }>
        <label htmlFor="in-{ flow.sub_type }">Input Artifact: { flow.sub_type }</label>
        <select className="form-control" name="in-{ flow.sub_type }">
            { Artifacts.filter(artifact => artifact.name === flow.sub_type).map(artifact =>
                <option key={ `${artifact.uuid}-dropdown` } value="{{ artifact.uuid }}"> {artifact.name} - {artifact.uuid}</option>
            )}
        </select>
      </fieldset>
    )}

    { flow.input.filter(input => input.input_type === 'Text').map(flow =>
      <fieldset className="form-group" key={ `${flow.name}-text-input${counter++}` }>
        <label htmlFor="param-{ flow.sub_type }">Input Parameter: { flow.sub_type }</label>
        <input type="text-field" className="form-control" name="param-{ flow.sub_type }" placeholder={ flow.input_hint }/>
      </fieldset>
    )}
        <br/>
          <br/>
            <br/>

    { flow.output.filter(input => input.input_type === 'Text').map(flow =>
      <fieldset className="form-group" key={ `${flow.name}-text-output${counter++}` }>
        <label htmlFor="out-{ flow.sub_type }">Output Name: { flow.sub_type }</label>
        <input type="text-field" className="form-control" name="out-{ flow.sub_type }" placeholder={ flow.input_hint }/>
      </fieldset>
    )}


    <button type="submit" className="btn btn-primary">Go!</button>
    </form>
  </div>
)};

Flow.propTypes = {
  plugin: React.PropTypes.object,
  flow: React.PropTypes.object
}

Flow.contextTypes = {
  store: React.PropTypes.object
}

export default Flow;
