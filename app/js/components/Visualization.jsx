import React from 'react';

import style from '../../css/Visualization.css';

class Visualization extends React.Component {
    componentDidMount() {
    }
    render() {
        const vis = this.props.vis;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    Visualization:
                </div>
                <div className="panel-body">
                    {vis && vis.filePath ?
                        <webview
                            className={style.webview}
                            src={`file://${vis.filePath}`}
                            ref={(e) => {
                                const webview = e;
                                webview.addEventListener('dom-ready', () => {
                                    webview.executeJavaScript(
                                        'document.body.offsetHeight',
                                        false,
                                        (height) => {
                                            webview.style.height = `${height + 50}px`;
                                        });
                                });
                            }}
                        >
                        </webview>
                        :
                        'no filepath?'
                    }
                </div>
            </div>
        );
    }
}


Visualization.propTypes = {
    vis: React.PropTypes.object
};

export default Visualization;
