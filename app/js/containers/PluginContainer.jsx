import React from 'react';
import { connect } from 'react-redux';
import Plugin from '../components/Plugin';
import Error from '../components/Error';

const mapStateToProps = (state) => {
    return {
        plugins: state.plugins
    };
};

const PluginContainer = ({ plugins }) => {
    let data;
    if (!plugins.count()) {
        data = (
            <Error error="No Plugins Found" />
        );
    } else {
        data = (
            <div className="panel panel-default">
                <div className="panel-heading">
                    Available Workflows:
                </div>
                <div className="panel-body">
                    { plugins.map(plugin =>
                        <Plugin
                            key={plugin.get('name')}
                            plugin={ plugin }
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            { data }
        </div>
    );
};

PluginContainer.propTypes = {
    plugins: React.PropTypes.object
};

export default connect(
    mapStateToProps
)(PluginContainer);
