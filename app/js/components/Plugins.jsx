import React from 'react';

import Workflows from '../containers/Workflows';

const Plugins = ({ plugins }) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            Available Workflows:
        </div>
        <div className="panel-body">
            { plugins.length ?
                plugins.map(plugin =>
                    <div key={ plugin.name }>
                        <h4>
                            { plugin.name }
                        </h4>
                        <Workflows
                            key={ `${plugin.name}-workflows` }
                            plugin={ plugin }
                        />
                    </div>
                ) :
                <div>
                    <h4>
                        No Plugins Found
                    </h4>
                </div>
            }
        </div>
    </div>
);


Plugins.propTypes = {
    plugins: React.PropTypes.array
};

export default Plugins;
