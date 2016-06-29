import React from 'react';

import Workflows from '../containers/Workflows';

import '!style-loader!css-loader!rc-collapse/assets/index.css';

import Collapse, { Panel } from 'rc-collapse';


const Plugins = ({ plugins }) => (
    <div>
        <h4>
            Available Plugins:
        </h4>
        { plugins.length ?
            <Collapse accordion key="collapse">
                plugins.forEach(plugin =>
                    <Panel header={ plugin.name } key={ `${plugin.name}-panel` }>
                        <h6>
                            Workflows:
                        </h6>
                        <Workflows
                            key={ `${plugin.name}-workflows` }
                            plugin={ plugin }
                        />
                    </Panel>
                )
            </Collapse> :
            <div>
                <h4>
                    No Plugins Found
                </h4>
            </div>
        }
    </div>
);


Plugins.propTypes = {
    plugins: React.PropTypes.array
};

export default Plugins;
