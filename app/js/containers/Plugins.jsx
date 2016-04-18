import React from 'react';
import { connect } from 'react-redux';
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
                { plugins.map(plugin =>
                    <div key={ plugin.name }>
                        <h4>
                            { plugin.name }
                        </h4>
                        <Workflows
                            key={ `${plugin.name}-workflows` }
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
