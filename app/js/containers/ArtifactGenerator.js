// ----------------------------------------------------------------------------
// Copyright (c) 2016-2021, QIIME 2 development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

import { connect } from 'react-redux';

import actions from '../actions';
import ArtifactGenerator from '../components/ArtifactGenerator';

const mapStateToProps = ({ tabState: { createArtifact: { currentIndex } }, ...state }) => ({
    sysPath: state.artifacts.sysCreationPath,
    importableTypes: state.superTypes.importableTypes,
    importableFormats: state.superTypes.importableFormats,
    active: currentIndex
});

const mapDispatchToProps = dispatch => ({
    toggleCreation: idx => dispatch(actions.changeTab('createArtifact', (idx + 1) % 2)),
    selectDirectory: () => dispatch(actions.selectArtifactDirectory()),
    createArtifact: (e, idx) => {
        e.preventDefault();
        const fd = new FormData(e.target);

        const path = fd.get('path');
        const name = fd.get('name');
        const sourceFormat = fd.get('source_format');
        const type = fd.get('type');

        const isEmpty = (key, val) => {
            if (val === '' || val === undefined || val === null) {
                alert(`${key} must not be blank!`);
                return true;
            }
            return false;
        };

        if (isEmpty('Data directory path', path) ||
            isEmpty('Output name', name) ||
            isEmpty('Semantic Type', type)) {
            return false;
        }

        const data = { path, name, source_format: sourceFormat, type };

        dispatch(actions.createArtifact(data));
        dispatch(actions.changeTab('createArtifact', (idx + 1) % 2));
        return true;
    }
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtifactGenerator);
