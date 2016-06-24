import React from 'react';

import Artifact from './Artifact';

const Visualizations = ({ visualizations }) => (
    <table className="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>UUID</th>
                <th>Type</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    No Available Visualizations
                </td>
            </tr>
        </tbody>
    </table>
);

Visualizations.propTypes = {
    visualizations: React.PropTypes.array
};

export default Visualizations;
