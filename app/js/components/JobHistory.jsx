import React from 'react';
import { initHighlightingOnLoad } from 'highlight.js';

import JobHistoryData from './JobHistoryData';
import style from './JobHistory.css';


class JobHistory extends React.Component {
    constructor(props) {
        super(props);
        this.order = ['UUID', 'Completed', 'Error', 'Started', 'Finished', 'stdout', 'stderr'];
    }

    componentDidMount() {
        initHighlightingOnLoad();
    }

    render() {
        return (
            <div className={`container ${style}`}>
                <div className="page-header">
                    <h1>{this.props.location.query.workflow}</h1>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Job Info:
                    </div>
                    <div className="panel-body">
                        <table className="table">
                            <tbody>
                                {this.order.map(key =>
                                    <JobHistoryData
                                        key={key}
                                        name={key}
                                        value={this.props.location.query[key.toLowerCase()]}
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
                        <pre><code className="python">
                            { this.props.location.query.code }
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
