import React from 'react';

import JobHistoryData from './JobHistoryData';
import Visualization from '../containers/Visualization';

class ArtifactDetail extends React.Component {
    constructor(props) {
        super(props);
        this.order = ['UUID', 'Type'];
    }
    componentDidMount() {
        if (this.props.artifact.type === 'Visualization') {
            this.props.getVisualization(this.props.artifact);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="page-header">
                    <h1>{this.props.artifact.name}</h1>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Detail View:
                    </div>
                    <div className="panel-body">
                        <table className="table">
                            <tbody>
                                {this.order.map(key =>
                                    <JobHistoryData
                                        key={key}
                                        name={key}
                                        value={this.props.artifact[key.toLowerCase()]}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                { this.props.artifact.type === 'Visualization' ?
                    <Visualization {...this.props} /> : null
                }
            </div>);
    }
}

ArtifactDetail.propTypes = {
    artifact: React.PropTypes.object,
    getVisualization: React.PropTypes.func
};

export default ArtifactDetail;
