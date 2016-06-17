import React from 'react';

const Directory = ({ path, dispatchChangeDirectory }) => (
    <div>
        <h2>Analysis Directory:</h2>
        <h4>{path}</h4>
        <button
            type="button"
            className="btn pull-left"
            onClick={() => dispatchChangeDirectory(path)}
        >
			Change Directory
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
