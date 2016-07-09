import React from 'react';

const ArtifactGenerator = ({ active, toggleCreation, selectDirectory, filePath }) => (
    active === 0 ?
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><button
                type="button"
                className="close"
                aria-label="Create Artifact"
                onClick={() => toggleCreation(active)}
            >
                <span
                    className="glyphicon glyphicon-plus"
                    aria-hidden="true"
                ></span>
            </button></td>
        </tr> :
        <tr>
            <td style={{ verticalAlign: 'middle' }}>
                <button
                    type="button"
                    className="btn btn-success pull-left"
                    onClick={selectDirectory}
                >
                    <span
                        className="glyphicon glyphicon-import"
                    ></span>
                    <span> Import</span>
                </button>
            </td>
            <td style={{ verticalAlign: 'middle' }}>{filePath || '...'}</td>
            <td style={{ verticalAlign: 'middle' }}>
                <input type="text" placeholder="Semantic Type" />
            </td>
            <td style={{ verticalAlign: 'middle' }}>
                <button
                    type="button"
                    className="close"
                    aria-label="Create Artifact"
                    onClick={() => toggleCreation(active)}
                >
                    <span
                        className="glyphicon glyphicon-remove"
                        aria-hidden="true"
                    ></span>
                </button>
            </td>
        </tr>
);

ArtifactGenerator.propTypes = {
    active: React.PropTypes.number,
    toggleCreation: React.PropTypes.func,
    filePath: React.PropTypes.string,
    selectDirectory: React.PropTypes.func
};

export default ArtifactGenerator;
