import React from 'react';

const Error = ({ type, children }) => {
    switch (type) {
    case 'table-row': {
        return (
            <tr>
                { children }
            </tr>
        );
    }
    default: {
        return (
            <div>
                <h4>
                    { children }
                </h4>
            </div>
        );
    }
    }
};

Error.propTypes = {
    type: React.PropTypes.string,
    children: React.PropTypes.element.isRequired
};

export default Error;
