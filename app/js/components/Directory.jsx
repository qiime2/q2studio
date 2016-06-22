import React from 'react';

const Directory = ({ path, dispatchChangeDirectory }) => (
    <div>
        <h2>Analysis Directory:</h2>
        <h4>{path}</h4>
        <button
            type="button"
            className="btn btn-primary pull-left"
            onClick={() => dispatchChangeDirectory(path)}
        >
            <span>Change Directory </span>
            <span className="glyphicon glyphicon-folder-open"></span>
        </button>
        <br></br>
        <br></br>
    </div>
);

Directory.propTypes = {
    path: React.PropTypes.string,
    dispatchChangeDirectory: React.PropTypes.func
};

export default Directory;
