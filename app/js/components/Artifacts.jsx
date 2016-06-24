import React from 'react';
import { ipcRenderer as ipc } from 'electron';

import Artifact from './Artifact';

const Artifacts = ({ data, type, dispatchDeleteArtifact }) => (
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
            {data.length ?
                data.map(item => (
                    <Artifact
                        key={item.uuid}
                        data={item}
                        onClick={() => ipc.send('open-artifact-page', item)}
                        deleteThis={() => {
                            if (confirm(
                                'Are you sure you want to delete this Artifact?')) {
                                dispatchDeleteArtifact(item.uuid, type);
                            }
                        }}
                    />
                )) : <tr><td>{`No available ${type}s...`}</td></tr>
            }
        </tbody>
    </table>
);

Artifacts.propTypes = {
    data: React.PropTypes.array,
    type: React.PropTypes.string,
    dispatchDeleteArtifact: React.PropTypes.func
};

export default Artifacts;
