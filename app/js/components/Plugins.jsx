import React from 'react';

import Error from './Error';
import Workflows from '../containers/Workflows';

const Plugins = ({ plugins }) => {
    let data;
    if (!plugins.length) {
        data = (
            <Error>
                <h4>
                    No Plugins Found
                </h4>
            </Error>
        );
    }

    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                Available Workflows:
            </div>
            <div className="panel-body">
                { data }
                { plugins.map(plugin =>
                    <div key={ plugin.name }>
                        <h4>
                            { plugin.name }
                        </h4>
                        <Workflows
                            key={ `${plugin.name}-workflows` }
                            plugin={ plugin }
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

Plugins.propTypes = {
    plugins: React.PropTypes.array
};

Plugins.contextTypes = {
    router: React.PropTypes.object
};

export default Plugins;
