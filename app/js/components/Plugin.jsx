import React from 'react';
import Workflow from './Workflow';

const Plugin = ({ plugin }) => (
    <div>
        <h4>
            { plugin.get('name') }
        </h4>
        <ul className="list-group">
            { plugin.get('workflows').map((workflow, id) =>
                <Workflow
                    key={id}
                    flow={workflow}
                />
            )}
        </ul>
    </div>
);

Plugin.propTypes = {
    plugin: React.PropTypes.object
};

export default Plugin;
