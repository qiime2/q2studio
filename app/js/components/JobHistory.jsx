import React from 'react';
import { highlightBlock } from 'highlight.js';
import { ipcRenderer as ipc } from 'electron';

import JobHistoryData from './JobHistoryData';
import style from '../../css/JobHistory.css';


class JobHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { job: {}, ...props };
        this.order = ['UUID', 'Completed', 'Error', 'Started', 'Finished', 'stdout', 'stderr'];
    }

    componentWillMount() {
        ipc.on('pass-job-data', (event, data) => {
            this.setState({ job: data });
        });
    }

    componentDidUpdate() {
        highlightBlock(document.querySelector('pre code'));
    }

    render() {
        return (
            <div className="container">
                <div className="page-header">
                    <h1>{this.state.job.workflow}</h1>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Job Info:
                    </div>
                    <div className="panel-body">
                        <table className={`table ${style.table}`}>
                            <tbody>
                                {this.order.map(key =>
                                    <JobHistoryData
                                        key={key}
                                        name={key}
                                        value={this.state.job[key.toLowerCase()]}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Job Code:
                    </div>
                    <div className="panel-body">
                        <pre className={style.pre}><code className={`python ${style.code}`}>
                            {this.state.job.code}
                        </code></pre>
                    </div>
                </div>
            </div>
        );
    }
}

JobHistory.propTypes = {
    location: React.PropTypes.object
};

export default JobHistory;
