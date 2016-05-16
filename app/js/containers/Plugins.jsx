import React from 'react';
import { connect } from 'react-redux';

import Plugin from '../components/Plugin';
import Workflows from './Workflows';
import Error from '../components/Error';

const mapStateToProps = (state) => {
    return {
        plugins: state.plugins
    };
};

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
                { plugins.map((plugin, id) =>
                    <div key={ id }>
                        <Plugin
                            key={ id }
                            plugin={ plugin }
                        />
                        <Workflows
                            key={ plugin.name + id }
                            workflows={ plugin.workflows }
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

export default connect(
    mapStateToProps
)(Plugins);
