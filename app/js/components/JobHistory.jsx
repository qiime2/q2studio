import React from 'react';
import { highlightBlock } from 'highlight.js';

import JobHistoryData from './JobHistoryData';
import style from '../../css/JobHistory.css';


class JobHistory extends React.Component {
    constructor(props) {
        super(props);
        this.order = ['UUID', 'Completed', 'Error', 'Inputs', 'Params',
                      'Outputs', 'Started', 'Finished', 'stdout', 'stderr'];
    }

    componentDidMount() {
        highlightBlock(document.querySelector('pre code'));
    }

    render() {
        return (
            <div className="container">
                <div className="page-header">
                    <h1>{this.props.job.actionName}</h1>
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
                                        value={this.props.job[key.toLowerCase()]}
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
                            { this.props.job.code }
                        </code></pre>
                    </div>
                </div>
            </div>
        );
    }
}

JobHistory.propTypes = {
    job: React.PropTypes.object
};

export default JobHistory;
