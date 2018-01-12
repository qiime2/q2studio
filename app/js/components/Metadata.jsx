// ----------------------------------------------------------------------------
// Copyright (c) 2016-2018, QIIME 2 development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

import React from 'react';
import { shell } from 'electron';

import MetadataFile from './MetadataFile';

const Metadata = ({ metadata, dispatchDeleteMetadata }) => (
    <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Filename</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {metadata.length ?
                    metadata.map(data => (
                        <MetadataFile
                            data={data}
                            deleteThis={() => {
                                if (confirm(
                                    'Are you sure you want to delete this metadata?')) {
                                    dispatchDeleteMetadata(data.filepath);
                                }
                            }}
                        />
                    )) : <tr><td>No available metadata...</td></tr>
                }
            </tbody>
        </table>
        <span>
            Metadata files must be valid QIIME 1 mapping files (see
            <a
                onClick={(e) => {
                    e.preventDefault();
                    shell.openExternal('http://keemei.qiime.org/');
                }}
            > keemei.qiime.org</a>).
        </span>
    </div>
);

Metadata.propTypes = {
    metadata: React.PropTypes.array,
    dispatchDeleteMetadata: React.PropTypes.func
};

export default Metadata;
