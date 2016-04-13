import React from 'react';


const Error = ({ error }) => (
    <div className="page-header">
        <h1>{error}</h1>
    </div>
);

Error.propTypes = {
    error: React.PropTypes.string.isRequired
};

export default Error;
