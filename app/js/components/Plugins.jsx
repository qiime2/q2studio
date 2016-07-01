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
            (<Collapse accordion key="collapse">
                {plugins.map(plugin =>
                    <Panel header={ plugin.name } key={ `${plugin.name}-panel` }>
                        <h6>
                            Methods:
                        </h6>
                        <Workflows
                            key={ `${plugin.name}-methods` }
                            plugin={ plugin.name }
                            listing={ plugin.methods }
                            type='methods'
                        />
                        <h6>
                            Visualizers:
                        </h6>
                        <Workflows
                            key={ `${plugin.name}-visualizers` }
                            plugin={ plugin.name }
                            listing={ plugin.visualizers }
                            type='visualizers'
                        />
                    </Panel>)}
            </Collapse>)
            :
            (<h5>
                No Plugins Found
            </h5>)
        }
    </div>
);


Plugins.propTypes = {
    plugins: React.PropTypes.array
};

export default Plugins;
