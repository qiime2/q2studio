import React from 'react';

const MetadataFile = ({ data }) => (
    <tr key={data.filepath}>
        <td>
            {data.name}
        </td>
        <td>
        </td>
    </tr>
);

MetadataFile.propTypes = {
    data: React.PropTypes.object,
    deleteThis: React.PropTypes.func
};

export default MetadataFile;
