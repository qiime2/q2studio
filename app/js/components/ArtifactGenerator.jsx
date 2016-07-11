import React from 'react';

const style = { verticalAlign: 'middle' };

const ArtifactGenerator = ({
    active,
    toggleCreation,
    createArtifact,
    selectDirectory,
    dirPath
}) => (
    <table className="table">
        <thead>
            <tr>
                <th className="col-xs-6"></th>
                <th className="col-xs-4"></th>
                <th className="col-xs-1"></th>
            </tr>
        </thead>
        <tbody>
    { active === 0 ?
        <tr>
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
            <td style={style}>
                <div className="input-group">
                    <span className="input-group-btn">
                        <button
                            type="button"
                            className="btn btn-primary pull-left"
                            onClick={selectDirectory}
                        >
                            <span
                                className="glyphicon glyphicon-import"
                            ></span>
                            <span> Import</span>
                        </button>
                    </span>
                    <input
                        type="text"
                        disabled="true"
                        className="form-control"
                        style={{ width: '100%' }}
                        placeholder="Data Directory Path"
                        value={dirPath || ''}
                    />
                </div>
            </td>
            <td style={style}>
                <form onSubmit={(e) => createArtifact(e, dirPath)}>
                    <div className="input-group">
                        <input
                            name="type"
                            className="form-control"
                            type="text"
                            placeholder="Semantic Type"
                        />
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-success pull-right">
                                Go!
                            </button>
                        </span>
                    </div>
                </form>
            </td>
            <td style={style}>
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
    }
        </tbody>
    </table>
);

ArtifactGenerator.propTypes = {
    active: React.PropTypes.number,
    toggleCreation: React.PropTypes.func,
    dirPath: React.PropTypes.string,
    selectDirectory: React.PropTypes.func,
    createArtifact: React.PropTypes.func
};

export default ArtifactGenerator;
