import { remote } from 'electron';

import { refreshArtifacts } from './artifacts';


export const directoryChange = (directory) => {
    return (dispatch) => {
        dispatch({
            type: 'DIRECTORY_CHANGE',
            directory
        });
        dispatch(refreshArtifacts());
    };
};


export const directoryChangeDialog = (currPath) => {
    return (dispatch) => {
        remote.dialog.showOpenDialog({
            title: 'Choose Directory',
            defaultpath: currPath,
            buttonlabel: 'Set Directory',
            properties: ['openDirectory']
        }, (fps) => dispatch(directoryChange(fps[0])));
    };
};
