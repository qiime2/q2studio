import React from 'react';

const Plugin = ({ plugin }) => (
    <div>
        <h4>
            {plugin.name}
        </h4>
    </div>
);

Plugin.propTypes = {
    plugin: React.PropTypes.object
};

export default Plugin;
