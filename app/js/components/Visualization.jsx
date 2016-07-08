import React from 'react';

import style from '../../css/Visualization.css';

const Visualization = ({ vis }) => (
    <div>
        { vis && vis.filePath ? <webview className={style.webview} src={`file://${vis.filePath}`}></webview> : 'no filepath?' }
    </div>
);

Visualization.propTypes = {
    vis: React.PropTypes.object
};

export default Visualization;
