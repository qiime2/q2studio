import React from 'react';

const Error = ({ children }) => (
    <div className="page-header">
        <h1>{ children }</h1>
    </div>
);

Error.propTypes = {
    children: React.PropTypes.element.isRequired
};

export default Error;
