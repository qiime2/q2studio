import React from 'react';
import { ipcRenderer as ipc } from 'electron';

import JobHistoryData from './JobHistoryData';

class ArtifactDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { artifact: {}, ...props };
        this.order = ['UUID', 'Type', 'Path'];
    }

    componentWillMount() {
        ipc.on('pass-artifact-data', (event, data) => {
            this.setState({ artifact: data });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="page-header">
                    <h1>{this.state.artifact.name}</h1>
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
                                        value={this.state.artifact[key.toLowerCase()]}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArtifactDetail;
