import React from 'react';
import { connect } from 'react-redux';
import Plugin from '../components/Plugin';
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
                No Plugins Found
            </Error>
        );
    } else {
        data = (
            plugins.map(plugin =>
                <Plugin
                    key={ plugin.name }
                    plugin={ plugin }
                />
            )
        );
    }

    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                Available Workflows:
            </div>
            <div className="panel-body">
                { data }
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
