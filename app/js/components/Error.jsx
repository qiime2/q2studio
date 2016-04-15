import React from 'react';

const Error = ({ children }) => (
    <div>
        { children }
    </div>
);

Error.propTypes = {
    children: React.PropTypes.element.isRequired
};

export default Error;
