import { remote } from 'electron';

import { refreshArtifacts, refreshVisualizations, refreshMetadata } from './artifacts';
import { fetchAPI } from '../util/auth';


export const directoryChange = (directory) => {
    return (dispatch, getState) => {
        const { connection: { uri, secretKey } } = getState();
        const url = `http://${uri}/api/workspace/`;
        const method = 'PUT';
        fetchAPI(secretKey, method, url, { workspace: directory })
            .then(() => dispatch({
                type: 'DIRECTORY_CHANGE',
                directory
            }))
            .then(() => dispatch(refreshArtifacts()))
            .then(() => dispatch(refreshVisualizations()))
            .then(() => dispatch(refreshMetadata()));
    };
};


export const directoryChangeDialog = (currPath) => {
    return (dispatch) => {
        remote.dialog.showOpenDialog({
            title: 'Choose Directory',
            defaultpath: currPath,
            buttonlabel: 'Set Directory',
            properties: ['openDirectory']
        }, (fps) => {
            if (fps) {
                dispatch(directoryChange(fps[0]));
            }
        });
    };
};
