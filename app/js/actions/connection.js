import actions from './';


const establishConnectionHidden = (uri, secretKey) => ({
    type: 'ESTABLISH_CONNECTION',
    uri,
    secretKey
});


export const establishConnection = (uri, secretKey) => {
    return (dispatch, getState) => {
        dispatch(establishConnectionHidden(uri, secretKey));
        dispatch(actions.loadPlugins());
    };
};
