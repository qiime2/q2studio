import { remote } from 'electron';

import actions from './';


const establishConnectionHidden = (uri, secretKey) => ({
    type: 'ESTABLISH_CONNECTION',
    uri,
    secretKey
});


export const establishConnection = (uri, secretKey) => {
    return (dispatch) => {
        dispatch(establishConnectionHidden(uri, secretKey));
        dispatch(actions.loadPlugins());
        dispatch(actions.directoryChange(remote.app.getPath('home')));
    };
};
